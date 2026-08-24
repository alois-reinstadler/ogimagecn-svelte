import { execFileSync, spawn } from "node:child_process";
import { createServer } from "node:http";
import { mkdtemp, readFile, rm, stat, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { extname, join, resolve } from "node:path";
import { components } from "./registry-metadata.mjs";

const root = resolve(import.meta.dirname, "..");
const temporary = await mkdtemp(join(tmpdir(), "ogimagecn-svelte-registry-"));
const consumer = join(temporary, "consumer");
await mkdir(join(consumer, "src", "lib"), { recursive: true });

const exportName = (name) => name.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join("");

const contentTypes = { ".json": "application/json", ".ttf": "font/ttf", ".otf": "font/otf" };
const runAsync = (command, args, options) => new Promise((resolve, reject) => {
  const child = spawn(command, args, { ...options, stdio: "inherit" });
  child.once("error", reject);
  child.once("exit", (code, signal) => code === 0
    ? resolve()
    : reject(new Error(`${command} exited with ${code ?? signal}`)));
});
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const file = join(root, "docs", "static", pathname);
    if (!resolve(file).startsWith(resolve(join(root, "docs", "static")))) throw new Error("Invalid path");
    const info = await stat(file);
    if (!info.isFile()) throw new Error("Not a file");
    response.writeHead(200, { "content-type": contentTypes[extname(file)] || "application/octet-stream" });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404).end("Not found");
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const localOrigin = `http://127.0.0.1:${port}`;

try {
  execFileSync("node", ["scripts/build-registry.mjs"], { cwd: root, stdio: "inherit", env: { ...process.env, REGISTRY_ORIGIN: localOrigin } });
  await writeFile(join(consumer, "package.json"), '{"private":true,"type":"module","dependencies":{"svelte":"5.56.10","tailwindcss":"4.1.12"},"devDependencies":{"@types/node":"24.3.0","@types/react":"19.1.12","svelte-check":"4.3.1","typescript":"5.9.2"}}\n');
  await writeFile(join(consumer, "components.json"), `${JSON.stringify({
    $schema: "https://shadcn-svelte.com/schema.json",
    style: "nova",
    tailwind: { css: "src/app.css", baseColor: "neutral" },
    aliases: { lib: "$lib", utils: "$lib/utils", components: "$lib/components", ui: "$lib/components/ui", hooks: "$lib/hooks" },
    typescript: true,
    registry: "https://shadcn-svelte.com/registry"
  }, null, 2)}\n`);
  await writeFile(join(consumer, "tsconfig.json"), `${JSON.stringify({
    compilerOptions: {
      allowJs: true,
      module: "ESNext",
      moduleResolution: "Bundler",
      target: "ES2022",
      paths: { "$lib": ["./src/lib"], "$lib/*": ["./src/lib/*"] }
    }
  }, null, 2)}\n`);
  await writeFile(join(consumer, "svelte.config.js"), "export default {};\n");
  await writeFile(join(consumer, "src", "app.css"), "@import 'tailwindcss';\n");
  const componentImports = components.map(({ name }) => {
    const exported = exportName(name);
    return `import ${exported} from "$lib/ogimagecn/components/${exported}.svelte";`;
  }).join("\n");
  const componentNames = components.map(({ name }) => exportName(name)).join(", ");
  await writeFile(join(consumer, "src", "verify.svelte"), `<script lang="ts">\n${componentImports}\nconst installed = [${componentNames}];\n</script>\n{#each installed as Component}<Component />{/each}\n`);
  execFileSync("pnpm", ["install", "--ignore-workspace", "--no-frozen-lockfile"], { cwd: consumer, stdio: "inherit", env: { ...process.env, CI: "1" } });
  const itemUrls = components.map(({ name }) => `${localOrigin}/r/${name}.json`);
  await runAsync("pnpm", ["dlx", "shadcn-svelte@1.5.0", "add", ...itemUrls, "--cwd", consumer, "--yes", "--overwrite", "--no-deps-install"], { cwd: root, env: { ...process.env, CI: "1" } });
  execFileSync("pnpm", ["install", "--ignore-workspace", "--no-frozen-lockfile"], { cwd: consumer, stdio: "inherit", env: { ...process.env, CI: "1" } });
  execFileSync("pnpm", ["exec", "svelte-check", "--workspace", ".", "--tsconfig", "./tsconfig.json"], { cwd: consumer, stdio: "inherit", env: { ...process.env, CI: "1" } });
  const installedTargets = components.map(({ name }) => `src/lib/ogimagecn/components/${exportName(name)}.svelte`);
  for (const path of [...installedTargets, "src/lib/ogimagecn/components/OgNode.svelte", "src/lib/ogimagecn/render.ts", "src/lib/ogimagecn/fonts.ts"]) {
    await stat(join(consumer, path));
  }
  const config = JSON.parse(await readFile(join(consumer, "components.json"), "utf8"));
  if (config.registry !== "https://shadcn-svelte.com/registry") throw new Error("Core shadcn-svelte registry was replaced");
  console.log(`Installed and Svelte-checked all ${components.length} complete remote items with the real shadcn-svelte CLI`);
} finally {
  await new Promise((resolve) => server.close(resolve));
  await rm(temporary, { recursive: true, force: true });
  execFileSync("node", ["scripts/build-registry.mjs"], { cwd: root, stdio: "inherit", env: { ...process.env, REGISTRY_ORIGIN: "https://alois-reinstadler.github.io/ogimagecn-svelte" } });
}
