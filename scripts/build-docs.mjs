import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { createServer } from "vite";
import { components, defaultOrigin } from "./registry-metadata.mjs";
import { generateSite } from "./docs-site.mjs";

await import("./build-registry.mjs");

const root = resolve(import.meta.dirname, "..");
const output = join(root, "docs", "build");
const origin = (process.env.DOCS_ORIGIN || defaultOrigin).replace(/\/$/, "");
const basePath = `/${(process.env.DOCS_BASE_PATH || "ogimagecn-svelte").replace(/^\/+|\/+$/g, "")}`;

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(join(root, "docs", "static"), output, { recursive: true });
await cp(join(root, "src", "lib", "fonts"), join(output, "fonts"), { recursive: true });
await cp(join(root, "UPSTREAM.md"), join(output, "UPSTREAM.md")).catch(() => {});

const vite = await createServer({ root, server: { middlewareMode: true }, appType: "custom" });
try {
  const library = await vite.ssrLoadModule("/src/lib/index.ts");
  await generateSite({ output, origin, basePath, library, components });
} finally {
  await vite.close();
}

await writeFile(join(output, ".nojekyll"), "");
console.log(`Built docs site at ${basePath}/`);
