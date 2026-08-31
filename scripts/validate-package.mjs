import { execFileSync } from "node:child_process";
import { cp, mkdtemp, readFile, rm, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { components } from "../src/lib/registry-metadata.mjs";

const root = resolve(import.meta.dirname, "..");
const temporary = await mkdtemp(join(tmpdir(), "ogimagecn-svelte-consumer-"));
const packed = join(temporary, "packed");
const consumer = join(temporary, "consumer");
await mkdir(packed);
await mkdir(join(consumer, "src"), { recursive: true });

function run(command, args, cwd, options = {}) {
  return execFileSync(command, args, { cwd, stdio: "inherit", ...options });
}

function exportName(name) {
  return name.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join("");
}

try {
  run("pnpm", ["pack", "--pack-destination", packed], root);
  const archives = (await import("node:fs/promises")).readdir(packed);
  const tarball = join(packed, (await archives).find((name) => name.endsWith(".tgz")));
  const rootPackage = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
  await writeFile(join(consumer, "package.json"), `${JSON.stringify({
    private: true,
    type: "module",
    scripts: { build: "vite build --ssr src/main.ts" },
    dependencies: {
      "ogimagecn-svelte": `file:${tarball}`,
      "@resvg/resvg-js": rootPackage.dependencies["@resvg/resvg-js"],
      svelte: rootPackage.devDependencies.svelte,
      vite: rootPackage.devDependencies.vite,
      "@sveltejs/vite-plugin-svelte": rootPackage.devDependencies["@sveltejs/vite-plugin-svelte"]
    }
  }, null, 2)}\n`);
  await writeFile(join(consumer, "pnpm-workspace.yaml"), "packages:\n  - .\nallowBuilds:\n  esbuild: true\n");
  await writeFile(join(consumer, "index.html"), '<div id="app"></div><script type="module" src="/src/main.ts"></script>\n');
  await writeFile(join(consumer, "vite.config.js"), 'import { defineConfig } from "vite"; import { svelte } from "@sveltejs/vite-plugin-svelte"; export default defineConfig({plugins:[svelte()],ssr:{noExternal:["ogimagecn-svelte"],external:["@resvg/resvg-js"]}});\n');
  const imports = components.map(({ name }) => `import ${exportName(name)}Direct from "ogimagecn-svelte/components/${exportName(name)}";`).join("\n");
  const names = components.map(({ name }) => `${exportName(name)}Direct`).join(", ");
  await writeFile(join(consumer, "src", "main.ts"), `import * as publicApi from "ogimagecn-svelte";
import { renderSvg, renderPng } from "ogimagecn-svelte/render";
import { loadFixtureFonts } from "ogimagecn-svelte/fonts";
${imports}
const publicEntries = { publicApi, renderSvg, renderPng, loadFixtureFonts, ${names} };
if (Object.values(publicEntries).some((entry) => !entry)) throw new Error("A public entry point was not resolved");
const fonts = await loadFixtureFonts();
const rendered = await renderSvg(SimpleDirect, {}, { fonts });
const png = await renderPng(SimpleDirect, {}, { fonts });
if (rendered.width !== 1200 || rendered.height !== 630 || !rendered.svg.startsWith('<svg width="1200" height="630"')) throw new Error("Packed SVG render is invalid");
if (png[0] !== 0x89 || png[1] !== 0x50 || png[2] !== 0x4e || png[3] !== 0x47) throw new Error("Packed PNG render is invalid");
console.log(\`Packed renderer produced \${rendered.width}x\${rendered.height} SVG and \${png.length}-byte PNG\`);
`);
  run("pnpm", ["install", "--no-frozen-lockfile"], consumer, { env: { ...process.env, CI: "1" } });
  run("pnpm", ["build"], consumer);
  await cp(join(consumer, "node_modules", "ogimagecn-svelte", "dist", "fonts"), join(consumer, "dist", "fonts"), { recursive: true });
  run("node", ["dist/main.js"], consumer);
  const manifest = JSON.parse(await readFile(join(consumer, "node_modules", "ogimagecn-svelte", "package.json"), "utf8"));
  for (const key of [".", "./render", "./fonts", "./components/*", "./package.json"]) {
    if (!manifest.exports[key]) throw new Error(`Packed manifest is missing export ${key}`);
  }
  console.log(`Installed ${basename(tarball)} and validated all public entry points in a fresh Svelte consumer`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
