import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}

function exportName(name) {
  return name.split("-").map((p) => p[0].toUpperCase() + p.slice(1)).join("");
}

const LOGO_SVG = `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="currentColor"/><rect x="6" y="9" width="20" height="14" rx="1.5" stroke="#fcfbf9" stroke-width="1.8" fill="none"/><path d="m6.8 10 9.2 6.6L25.2 10" stroke="#fcfbf9" stroke-width="1.8" stroke-linecap="round" fill="none"/><circle cx="24" cy="9" r="3.4" fill="#c3362b"/></svg>`;

export async function generateSite({ output, origin, basePath, library, components }) {
  const A = (p) => `${basePath}/${String(p).replace(/^\/+/, "")}`;
  const siteUrl = `${origin}${basePath}`;

  const header = (active) => `
    <div class="site-header">
      <div class="container-page">
        <a class="brand" href="${A("")}">
          <span class="logo-icon">${LOGO_SVG}</span>
          <span>ogimagecn-svelte</span>
        </a>
        <nav class="nav">
          <a href="${A("")}" class="${active === "home" ? "active" : ""}">Home</a>
          <a href="${A("components/")}" class="${active === "components" ? "active" : ""}">Components</a>
          <a href="${A("docs/")}" class="${active === "docs" ? "active" : ""}">Docs</a>
          <button class="theme-toggle" onclick="document.documentElement.classList.toggle('dark'); localStorage.setItem('ogimagecn-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light'); document.documentElement.style.colorScheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';" aria-label="Toggle dark mode">
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          </button>
          <a class="ghost-btn" href="${origin}/r/registry.json">shadcn registry</a>
        </nav>
      </div>
    </div>`;

  const footer = () => `
    <footer class="site-footer">
      <div class="container-page">
        <p>Typed Svelte 5 Open Graph image components rendered by Satori. MIT licensed; bundled Noto fonts under the SIL Open Font License.</p>
        <p>Upstream parity is pinned and documented in the <a href="${A("docs/satori.html")}">UPSTREAM</a> notes. Registry catalog: <a href="${origin}/r/registry.json">r/registry.json</a>.</p>
      </div>
    </footer>`;

  const codeBlock = (source, label) => `
    <div class="code-block">
      ${label ? `<button class="code-copy" data-copy="${esc(source)}">copy</button>` : ""}
      <pre><code>${esc(source)}</code></pre>
    </div>`;

  const layout = ({ title, description, path, body, ogImage = A("og.png") }) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(title)} · ogimagecn-svelte</title>
  <meta name="description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${ogImage}">
  <link rel="canonical" href="${siteUrl}${path}">
  <link rel="stylesheet" href="${A("site.css")}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Public+Sans:ital,wght@0,300..800;1,400&display=swap" rel="stylesheet">
  <script>
    try {
      const stored = localStorage.getItem('ogimagecn-theme');
      const dark = stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', dark);
      document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    } catch {}
  </script>
</head>
<body>
${header(path === "/" ? "home" : path.startsWith("/components") ? "components" : path.startsWith("/docs") ? "docs" : "")}
<main class="container-page">${body}</main>
${footer()}
<script>
  document.querySelectorAll('.code-copy').forEach((el) => {
    el.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(el.getAttribute('data-copy'));
        el.textContent = 'copied';
        setTimeout(() => (el.textContent = 'copy'), 1500);
      } catch {}
    });
  });
</script>
</body>
</html>`;

  const renderPage = async (relPath, html) => {
    const full = join(output, relPath);
    await mkdir(join(full, ".."), { recursive: true });
    await writeFile(full, html);
  };

  // ---- render all component previews ----
  const previewDir = join(output, "previews");
  await mkdir(previewDir, { recursive: true });
  const cards = [];
  for (const meta of components) {
    const name = exportName(meta.name);
    const component = library[name];
    if (!component) throw new Error(`The public package does not export ${name}`);
    const deterministicProps =
      meta.name === "owner" ? { images: [], logo: "" } : meta.name === "shiori" ? { logo: "" } : {};
    const rendered = await library.renderImage(component, deterministicProps);
    await writeFile(join(previewDir, `${meta.name}.svg`), rendered.svg);
    await writeFile(join(previewDir, `${meta.name}.png`), rendered.png);
    cards.push({ ...meta, install: `pnpm dlx shadcn-svelte@latest add ${origin}/r/${meta.name}.json` });
  }

  // ---- the site's own Open Graph image ----
  const og = await library.renderImage(library.Simple, {
    label: "Svelte 5 · Satori",
    title: "ogimagecn-svelte",
    description: "Typed Open Graph image components rendered by Satori.",
    brand: "ogimagecn"
  });
  await writeFile(join(output, "og.png"), og.png);
  await writeFile(join(output, "og.svg"), og.svg);

  // ---- HOME / marketing ----
  const home = layout({
    title: "Open Graph images, without React",
    description: "Typed, composable Svelte 5 components that render through Satori to deterministic SVG and PNG.",
    path: "/",
    body: `
    <section class="hero">
      <span class="eyebrow">Svelte 5 · Satori · SVG + PNG</span>
      <h1 class="display">Open Graph images, without React.</h1>
      <p class="lead">Typed, composable Svelte components that render through Satori. Every preview on this site is generated by the package's own production pipeline &mdash; no browser screenshots.</p>
      <div class="cta-row">
        <a class="btn btn-primary" href="${A("docs/")}">Get started</a>
        <a class="btn btn-outline" href="${A("components/")}">Browse components</a>
      </div>
      ${codeBlock("pnpm add ogimagecn-svelte")}
    </section>
    <section class="section">
      <h2>Why ogimagecn-svelte</h2>
      <p class="sub">A faithful Svelte 5 port of ogimagecn, built on the same Satori pipeline next/og uses.</p>
      <div class="feature-grid">
        <div class="feature-card"><h3>Server-rendered, deterministic</h3><p>SVG and PNG output is byte-stable for the same inputs &mdash; ideal for build-time and edge rendering.</p></div>
        <div class="feature-card"><h3>Svelte 5 runes &amp; snippets</h3><p>Props are typed and use runes. Compose with an <code>overlay</code> snippet; never author React-shaped objects.</p></div>
        <div class="feature-card"><h3>shadcn-svelte install</h3><p>Own the source via the shadcn-svelte CLI, or import the typed components straight from the package.</p></div>
        <div class="feature-card"><h3>Satori constraints enforced</h3><p>Strict mode turns renderer warnings into errors so broken layouts fail loudly, not silently.</p></div>
        <div class="feature-card"><h3>Bundled fonts</h3><p>Licensed Noto Sans + CJK fixtures ship with the package, with helpers to load any other font.</p></div>
        <div class="feature-card"><h3>${cards.length} ready components</h3><p>From minimal cards to product, profile, and registry showcases &mdash; all inside Satori's CSS subset.</p></div>
      </div>
    </section>
    <section class="section">
      <h2>Gallery preview</h2>
      <p class="sub">Six of ${cards.length} components, rendered by the library at build time.</p>
      <div class="gallery">
        ${cards.slice(0, 6).map((c) => `<a class="gallery-card" href="${A(`components/${c.name}.html`)}">
          <img src="${A(`previews/${c.name}.png`)}" width="600" height="315" loading="lazy" alt="${esc(c.title)} Open Graph image">
          <div class="card-body">
            <h3>${esc(c.title)}</h3>
            <p>${esc(c.description)}</p>
          </div>
        </a>`).join("\n")}
      </div>
      <p style="margin-top:1.5rem"><a class="btn btn-outline" href="${A("components/")}">View all ${cards.length} components &rarr;</a></p>
    </section>`
  });
  await renderPage("index.html", home);

  // ---- COMPONENTS gallery ----
  const gallery = layout({
    title: "Components",
    description: "Every ogimagecn-svelte component, rendered by the package's own pipeline.",
    path: "/components/",
    body: `
    <section class="section">
      <h1 class="display">Components</h1>
      <p class="sub">${cards.length} components. Each links to a page with its props, a copy-paste install command, and a usage snippet.</p>
      <div class="gallery">
        ${cards.map((c) => `<a class="gallery-card" href="${A(`components/${c.name}.html`)}">
          <img src="${A(`previews/${c.name}.png`)}" width="600" height="315" loading="lazy" alt="${esc(c.title)} Open Graph image">
          <div class="card-body">
            <h3>${esc(c.title)}</h3>
            <p>${esc(c.description)}</p>
          </div>
        </a>`).join("\n")}
      </div>
    </section>`
  });
  await renderPage("components/index.html", gallery);

  // ---- per-component pages ----
  const byName = Object.fromEntries(library.registry.map((e) => [e.name, e]));
  for (const c of cards) {
    const entry = byName[c.name];
    const props = Object.entries(entry.defaults).filter(([k]) => k !== "overlay");
    const propRows = props.map(([k, v]) => {
      const val = Array.isArray(v)
        ? v.length ? `[${v.map((x) => (typeof x === "string" ? `"${esc(x)}"` : esc(String(x)))).join(", ")}]` : "<em>(empty)</em>"
        : typeof v === "string" ? (v === "" ? "<em>(empty)</em>" : `"${esc(v)}"`) : esc(String(v));
      return `<tr><td><code>${esc(k)}</code></td><td>${val}</td></tr>`;
    }).join("\n");
    const usage = `import { ${exportName(c.name)} } from 'ogimagecn-svelte';\n\nconst { svg, png } = await renderImage(${exportName(c.name)}, {\n  // all props optional; component defaults are applied\n});`;
    const page = layout({
      title: c.title,
      description: c.description,
      path: `/components/${c.name}.html`,
      body: `
      <a class="back-link" href="${A("components/")}">&larr; All components</a>
      <h1 class="display">${esc(c.title)}</h1>
      <p class="sub">${esc(c.description)}</p>
      <div class="component-preview">
        <img src="${A(`previews/${c.name}.png`)}" width="1200" height="630" alt="${esc(c.title)} Open Graph image">
      </div>
      <h3>Install</h3>
      ${codeBlock(c.install, true)}
      <h3>Usage</h3>
      ${codeBlock(usage, false)}
      <h3>Props</h3>
      <p class="sub">Every component also accepts an optional <code>overlay</code> Svelte 5 snippet, rendered above the default layout.</p>
      <table class="props-table"><thead><tr><th>Prop</th><th>Default</th></tr></thead><tbody>${propRows}</tbody></table>
      <h3>shadcn-svelte</h3>
      <p>Add the source directly to your project:</p>
      ${codeBlock(c.install, true)}
      `
    });
    await renderPage(`components/${c.name}.html`, page);
  }

  // ---- DOCS ----
  const docsNav = (active) => `
    <div class="docs-layout">
      <nav class="docs-nav">
        <a href="${A("docs/")}" class="${active === "index" ? "active" : ""}">Overview</a>
        <a href="${A("docs/getting-started.html")}" class="${active === "getting-started" ? "active" : ""}">Getting started</a>
        <a href="${A("docs/api.html")}" class="${active === "api" ? "active" : ""}">API reference</a>
        <a href="${A("docs/composition.html")}" class="${active === "composition" ? "active" : ""}">Composition</a>
        <a href="${A("docs/fonts.html")}" class="${active === "fonts" ? "active" : ""}">Fonts &amp; emoji</a>
        <a href="${A("docs/satori.html")}" class="${active === "satori" ? "active" : ""}">Satori constraints</a>
      </nav>
      <div class="docs-content">`;

  const docsFooter = `
      </div>
    </div>`;

  const docsPage = ({ title, description, key, body }) => layout({
    title, description, path: `/docs/${key === "index" ? "" : key + ".html"}`,
    body: `${docsNav(key)}${body}${docsFooter}`
  });

  await renderPage("docs/index.html", docsPage({
    title: "Documentation", description: "Guides for ogimagecn-svelte: install, render, compose, and load fonts.", key: "index",
    body: `
      <h1>Documentation</h1>
      <p>ogimagecn-svelte renders Svelte 5 components to Satori virtual nodes, lays them out, and rasterizes SVG to PNG. The renderer is <strong>server-only</strong>.</p>
      <div class="feature-grid" style="margin-top:1.5rem">
        <a class="feature-card" href="${A("docs/getting-started.html")}"><h3>Getting started</h3><p>Install and render your first image in a SvelteKit endpoint.</p></a>
        <a class="feature-card" href="${A("docs/api.html")}"><h3>API reference</h3><p><code>renderSvg</code>, <code>renderImage</code>, <code>renderPng</code>, <code>loadFont</code> and every option.</p></a>
        <a class="feature-card" href="${A("docs/composition.html")}"><h3>Composition</h3><p>Use the <code>overlay</code> snippet to compose Satori-compatible layouts.</p></a>
        <a class="feature-card" href="${A("docs/fonts.html")}"><h3>Fonts &amp; emoji</h3><p>Load custom fonts and handle missing glyphs deterministically.</p></a>
        <a class="feature-card" href="${A("docs/satori.html")}"><h3>Satori constraints</h3><p>What the CSS subset allows, and why strict mode matters.</p></a>
        <a class="feature-card" href="${A("components/")}"><h3>Components</h3><p>Browse all ${cards.length} components with props and snippets.</p></a>
      </div>`
  }));

  await renderPage("docs/getting-started.html", docsPage({
    title: "Getting started", description: "Install ogimagecn-svelte and render your first Open Graph image.", key: "getting-started",
    body: `
      <h1>Getting started</h1>
      <h2>Install</h2>
      ${codeBlock("pnpm add ogimagecn-svelte")}
      <p>Or own the source with the shadcn-svelte CLI (complete item URLs include the GitHub Pages base path):</p>
      ${codeBlock("pnpm dlx shadcn-svelte@latest add \\\n  https://alois-reinstadler.github.io/ogimagecn-svelte/r/simple.json")}
      <h2>Render SVG and PNG</h2>
      ${codeBlock(`import { Simple, renderImage, renderSvg } from 'ogimagecn-svelte';

const props = {
  title: 'Svelte components, Satori output',
  description: 'A deterministic 1200 × 630 Open Graph image.'
};

const { svg, width, height } = await renderSvg(Simple, props);
const { png } = await renderImage(Simple, props);`, false)}
      <h2>SvelteKit endpoint</h2>
      <p>Keep rendering in server code &mdash; routes, build scripts, or hooks. Never import the renderer into browser code.</p>
      ${codeBlock(`// src/routes/og/[slug]/+server.ts
import { Simple, renderImage } from 'ogimagecn-svelte';
import { error } from '@sveltejs/kit';

export async function GET() {
  const { png } = await renderImage(Simple, {
    title: 'Hello from SvelteKit'
  });
  return new Response(png, {
    headers: { 'content-type': 'image/png', 'cache-control': 'public, max-age=3600' }
  });
}`, 'sveltekit-endpoint')}
      <p class="notice">The renderer uses Svelte's server renderer, Node font loading, and the native <code>@resvg/resvg-js</code> package. It is not a browser-screenshot renderer.</p>`
  }));

  await renderPage("docs/api.html", docsPage({
    title: "API reference", description: "renderSvg, renderImage, renderPng, loadFont and their options.", key: "api",
    body: `
      <h1>API reference</h1>
      <h2>renderSvg(component, props, options?)</h2>
      <p>Returns <code>{ svg, width, height, warnings, nodes }</code>. The final SVG plus dimensions, captured warnings, and optional layout nodes.</p>
      <h2>renderPng(component, props, options?)</h2>
      <p>Returns a PNG <code>Uint8Array</code>.</p>
      <h2>renderImage(component, props, options?)</h2>
      <p>Returns <code>RenderedImage &amp; { png }</code> &mdash; both the SVG metadata and the PNG bytes.</p>
      <h2>loadFont(source, options)</h2>
      <p>Loads a font from a <code>file:</code> URL, an <code>https:</code> URL, a bare filesystem path, or raw <code>ArrayBuffer</code>/<code>Uint8Array</code>. Returns a Satori font object.</p>
      <h2>RenderOptions</h2>
      <table class="props-table"><thead><tr><th>Option</th><th>Type</th><th>Default</th></tr></thead><tbody>
        <tr><td><code>width</code> / <code>height</code></td><td><code>number</code></td><td><code>1200</code> / <code>630</code></td></tr>
        <tr><td><code>fonts</code></td><td><code>OgFont[]</code></td><td>bundled Noto fixtures</td></tr>
        <tr><td><code>strict</code></td><td><code>boolean</code></td><td><code>true</code> &mdash; warnings become errors</td></tr>
        <tr><td><code>embedFont</code></td><td><code>boolean</code></td><td><code>true</code></td></tr>
        <tr><td><code>debug</code></td><td><code>boolean</code></td><td><code>false</code></td></tr>
        <tr><td><code>graphemeImages</code></td><td><code>Record&lt;string,string&gt;</code></td><td>&mdash;</td></tr>
        <tr><td><code>loadAdditionalAsset</code></td><td><code>(lang, segment) =&gt; Promise&lt;string | OgFont[]&gt;</code></td><td>&mdash;</td></tr>
        <tr><td><code>collectNodes</code> / <code>onNodeDetected</code></td><td>snapshot / callback of laid-out boxes</td><td>&mdash;</td></tr>
      </tbody></table>
      <p class="notice">Stable subpaths are also exported: <code>ogimagecn-svelte/render</code>, <code>ogimagecn-svelte/fonts</code>, and <code>ogimagecn-svelte/components/&lt;Name&gt;</code>.</p>`
  }));

  await renderPage("docs/composition.html", docsPage({
    title: "Composition", description: "Compose Satori-compatible layouts with the overlay snippet.", key: "composition",
    body: `
      <h1>Composition</h1>
      <p>Every component accepts an <code>overlay</code> snippet rendered last (above the default layout). Consumers never author React or React-shaped objects.</p>
      ${codeBlock(`<script lang="ts">
  import { Simple } from 'ogimagecn-svelte';
</script>

{#snippet badge()}
  <div style="display:flex;position:absolute;right:48px;top:48px;padding:12px 18px;background:#fff;color:#111;border-radius:999px">
    Svelte 5
  </div>
{/snippet}

<Simple title="Composed in Svelte" overlay={badge} />`, true)}
      <h2>Server rendering of a composition</h2>
      <p>Put the composition in a <code>.svelte</code> wrapper and pass the wrapper component to <code>renderSvg</code> or <code>renderImage</code>.</p>
      <p class="notice warn">Snippet content must itself use Satori's CSS subset: flexbox layout, inline styles, and absolute units. Pseudo-elements, runtime stylesheets, and browser JavaScript are unavailable.</p>`
  }));

  await renderPage("docs/fonts.html", docsPage({
    title: "Fonts & emoji", description: "Bundled fixtures, loading custom fonts, and handling missing glyphs.", key: "fonts",
    body: `
      <h1>Fonts &amp; emoji</h1>
      <p>Licensed static Noto Sans and Noto Sans CJK SC fixture fonts are bundled. The default loader covers normal weights 400&ndash;800, regular/bold italics, and Latin, Greek, Cyrillic, Vietnamese, and Simplified Chinese.</p>
      <h2>Load a custom font</h2>
      ${codeBlock(`import { loadFont, renderSvg } from 'ogimagecn-svelte';

const devanagari = await loadFont('file:///srv/fonts/NotoSansDevanagari-Regular.ttf', {
  name: 'Noto Sans Devanagari', weight: 400, style: 'normal'
});

await renderSvg(Simple, { title: 'नमस्ते' }, { fonts: [devanagari] });`, true)}
      <p>A bare filesystem path also works: <code>loadFont('/srv/fonts/x.ttf', { name, weight, style })</code>.</p>
      <h2>Emoji &amp; missing glyphs</h2>
      <p>Emoji and missing glyphs are explicit Satori concerns. Supply <code>graphemeImages</code> for deterministic emoji data URIs, or <code>loadAdditionalAsset(languageCode, segment)</code> to return an image data URI or extra fonts. In strict mode (the default) Satori warnings become errors.</p>`
  }));

  await renderPage("docs/satori.html", docsPage({
    title: "Satori constraints", description: "The CSS subset these components stay inside, and why strict mode matters.", key: "satori",
    body: `
      <h1>Satori constraints</h1>
      <p>These components intentionally stay inside Satori's CSS subset:</p>
      <ul>
        <li>Flexbox is the primary layout model; CSS Grid and browser-only behavior are not assumed.</li>
        <li>Every element with multiple children uses an explicit <code>display: flex</code> or <code>display: none</code>.</li>
        <li>Styles are inline and use supported absolute units. Complex selectors, runtime stylesheets, pseudo-elements, and browser JavaScript are unavailable.</li>
        <li>Text wrapping, overflow, line-clamp, gradients, borders, transforms, and shadows follow Satori/resvg behavior and may differ from a browser.</li>
        <li>Image URLs must be fetchable by the server. There is no browser cookie jar, DOM, canvas, or screenshot fallback.</li>
        <li>Snippet content must itself use the same Satori-compatible subset.</li>
      </ul>
      <h2>Strict mode</h2>
      <p>Renderer warnings are captured and fail by default. Set <code>strict: false</code> only after you have inspected and accepted the final SVG and PNG output.</p>
      <p class="notice">The exact upstream pin, inventory, and parity decisions are documented in <a href="${A("UPSTREAM.md")}">UPSTREAM.md</a>.</p>`
  }));

  // ---- sitemap, robots, 404 ----
  const urls = [
    "", "components/", "docs/",
    "docs/getting-started.html", "docs/api.html", "docs/composition.html",
    "docs/fonts.html", "docs/satori.html",
    ...cards.map((c) => `components/${c.name}.html`)
  ].map((p) => `${siteUrl}/${p}`);
  await writeFile(join(output, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${
      urls.map((u) => `  <url><loc>${esc(u)}</loc></url>`).join("\n")
    }\n</urlset>\n`);
  await writeFile(join(output, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
  await renderPage("404.html", layout({
    title: "Not found", description: "Page not found.", path: "/404.html",
    body: `<section class="hero"><h1 class="display">404</h1><p class="lead">That page does not exist. <a href="${A("")}">Go home &rarr;</a></p></section>`
  }));

  console.log(`Built ${cards.length} component pages + 6 docs pages at ${basePath}/`);
}