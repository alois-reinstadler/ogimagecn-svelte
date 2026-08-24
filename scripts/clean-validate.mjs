import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdir, readFile, rm } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const generated = [
  join(root, "dist"),
  join(root, "docs", "build"),
  join(root, "static", "r"),
  join(root, "docs", "static", "r"),
  join(root, "tests", "artifacts")
];

function run(label, command, args) {
  console.log(`\n[clean validation] ${label}`);
  execFileSync(command, args, { cwd: root, stdio: "inherit", env: { ...process.env, CI: "1" } });
}

async function hashTree(directory) {
  const hash = createHash("sha256");
  async function visit(path) {
    for (const entry of (await readdir(path, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      const child = join(path, entry.name);
      if (entry.isDirectory()) await visit(child);
      else {
        hash.update(relative(directory, child));
        hash.update("\0");
        hash.update(await readFile(child));
        hash.update("\0");
      }
    }
  }
  await visit(directory);
  return hash.digest("hex");
}

for (const path of generated) await rm(path, { recursive: true, force: true });
run("type and Svelte diagnostics", "pnpm", ["check"]);
run("final SVG/PNG and visual regression tests", "pnpm", ["test"]);
run("typed package build and publint", "pnpm", ["build"]);
run("registry build", "pnpm", ["registry:build"]);
const firstRegistry = await hashTree(join(root, "static", "r"));
run("repeat registry build", "pnpm", ["registry:build"]);
const secondRegistry = await hashTree(join(root, "static", "r"));
if (firstRegistry !== secondRegistry) throw new Error("Registry output changed across identical builds");
run("packed fresh-consumer build", "pnpm", ["validate:package"]);
run("real shadcn-svelte CLI installation", "node", ["scripts/validate-registry.mjs"]);
run("base-path-safe docs and final-image gallery", "pnpm", ["docs:build"]);
console.log(`\nClean validation succeeded. Deterministic registry SHA-256: ${firstRegistry}`);
