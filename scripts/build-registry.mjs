import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join, relative, resolve, sep } from "node:path";
import { components, defaultOrigin } from "../src/lib/registry-metadata.mjs";

const root = resolve(import.meta.dirname, "..");
const sourceRoot = join(root, "src", "lib");
const outputRoots = [join(root, "static", "r"), join(root, "docs", "static", "r")];
const origin = (process.env.REGISTRY_ORIGIN || defaultOrigin).replace(/\/$/, "");
const schema = "https://shadcn-svelte.com/schema/registry-item.json";
const catalogSchema = "https://shadcn-svelte.com/schema/registry.json";

async function filesUnder(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) result.push(...(await filesUnder(path)));
    else result.push(path);
  }
  return result.sort();
}

function kebab(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Za-z])([0-9])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();
}

function targetFor(path) {
  return ["ogimagecn", relative(sourceRoot, path)].join("/").split(sep).join("/");
}

async function registryFile(path) {
  let content = await readFile(path, "utf8");
  if (path === join(sourceRoot, "fonts.ts")) {
    content = content
      .replace(
        "const fontUrl = (name: string) => new URL(`./fonts/${name}`, import.meta.url);",
        `const fontUrl = (name: string) => new URL(\`${origin}/fonts/\${name}\`);\n\nasync function loadRegistryFont(name: string): Promise<ArrayBuffer> {\n  const response = await fetch(fontUrl(name));\n  if (!response.ok) throw new Error(\`Unable to load fixture font \${name}: \${response.status} \${response.statusText}\`);\n  return response.arrayBuffer();\n}`
      )
      .replace("data: await readFile(fontUrl(file)),", "data: await loadRegistryFont(file),");
  }
  return {
    path: relative(root, path).split(sep).join("/"),
    // Use the lib alias for every file so the copied relative-import graph stays intact.
    // The enclosing item remains registry:component for catalog semantics.
    type: "registry:lib",
    target: targetFor(path),
    content
  };
}

function externalDependencies(source, packageJson) {
  const specifiers = [...source.matchAll(/(?:from\s*|import\s*)["']([^"']+)["']/g)].map((match) => match[1]);
  const packages = new Set();
  for (const specifier of specifiers) {
    if (specifier.startsWith(".") || specifier.startsWith("$") || specifier.startsWith("node:")) continue;
    const name = specifier.startsWith("@") ? specifier.split("/").slice(0, 2).join("/") : specifier.split("/")[0];
    const version = packageJson.dependencies?.[name] || packageJson.peerDependencies?.[name];
    if (version) packages.add(`${name}@${version}`);
  }
  return [...packages].sort();
}

const packageJson = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
const allFiles = await filesUnder(sourceRoot);
const componentFiles = allFiles.filter((file) => file.includes(`${sep}components${sep}`) && extname(file) === ".svelte");
const publicComponentNames = new Set(components.map(({ name }) => name));
const isPublicComponent = (file) =>
  file.includes(`${sep}components${sep}`) && publicComponentNames.has(kebab(basename(file, ".svelte")));
const isSiteOnlyFile = (file) =>
  file.includes(`${sep}site${sep}`) || file.includes(`${sep}components${sep}site${sep}`);
const runtimeFiles = allFiles.filter((file) =>
  !isPublicComponent(file) &&
  !isSiteOnlyFile(file) &&
  !file.includes(`${sep}registry-metadata.`) &&
  !file.includes(`${sep}fonts${sep}`) &&
  !file.endsWith(`${sep}catalog.ts`) &&
  !file.endsWith("index.ts")
);
const runtimeRegistryFiles = await Promise.all(runtimeFiles.map((file) =>
  registryFile(file)
));
const runtimeSources = runtimeRegistryFiles.map((file) => file.content);
const runtime = {
  $schema: schema,
  name: "runtime",
  title: "ogimagecn Svelte renderer runtime",
  description: "Svelte-to-Satori VDOM, font, rendering, and shared type utilities.",
  type: "registry:lib",
  dependencies: externalDependencies(runtimeSources.join("\n"), packageJson),
  files: runtimeRegistryFiles
};

const items = [runtime];
for (const metadata of components) {
  const sourcePath = componentFiles.find((file) => kebab(basename(file, ".svelte")) === metadata.name);
  if (!sourcePath) throw new Error(`No Svelte source found for registry item ${metadata.name}`);
  const source = await readFile(sourcePath, "utf8");
  items.push({
    $schema: schema,
    ...metadata,
    type: "registry:component",
    registryDependencies: [`${origin}/r/runtime.json`],
    dependencies: externalDependencies(source, packageJson),
    files: [await registryFile(sourcePath)]
  });
}

const catalog = {
  $schema: catalogSchema,
  name: "ogimagecn-svelte",
  homepage: origin,
  items: items.map(({ $schema: _, ...item }) => item)
};

await writeFile(join(root, "registry.json"), `${JSON.stringify(catalog, null, 2)}\n`);
for (const outputRoot of outputRoots) {
  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(outputRoot, { recursive: true });
  for (const item of items) {
    await writeFile(join(outputRoot, `${item.name}.json`), `${JSON.stringify(item, null, 2)}\n`);
  }
  await writeFile(join(outputRoot, "registry.json"), `${JSON.stringify(catalog, null, 2)}\n`);
}

console.log(`Built ${items.length} deterministic registry items for ${origin}`);
