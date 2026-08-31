# ogimagecn-svelte

A typed Svelte 5 port of [ogimagecn](https://github.com/shadcn-labs/ogimagecn) for turning structured data into deterministic branded images. Components are rendered to Svelte SSR, converted at a deliberately small boundary to Satori's virtual tree, and laid out by Satori. PNG output is rasterized from that SVG with resvg; this is not a browser-screenshot renderer.

The renderer is **server-only**. It uses Svelte's server renderer, Node font loading, and the native `@resvg/resvg-js` package. Keep calls in server routes, build scripts, hooks, or other Node runtimes, and do not import the renderer into browser code.

## Where it fits

The library works best when the content changes frequently but the visual system should remain controlled:

- commerce images generated from product, price, currency, and availability data;
- release cards produced by CI from versions and changelog highlights;
- localized event previews with explicit fonts, dates, and time zones;
- account milestones, certificates, and yearly summaries rendered in batches;
- article, podcast, property, and other catalog-driven social previews.

Satori is deliberately not a browser screenshot engine. Use a browser-based renderer when the output must reproduce arbitrary HTML/CSS, canvas charts, client-side widgets, or animation. Changing `width` and `height` changes the canvas; it does not automatically make a 1200 × 630 component responsive to square or story formats.

## Install

```sh
pnpm add ogimagecn-svelte
```

Or own the installed source with the shadcn-svelte CLI. Complete item URLs include the GitHub Pages repository base path:

```sh
pnpm dlx shadcn-svelte@latest add \
  https://alois-reinstadler.github.io/ogimagecn-svelte/r/simple.json
```

The repository's [`components.json`](./components.json) deliberately retains the core `https://shadcn-svelte.com/registry`; custom items are installed by their complete URL and do not replace it.

## Render SVG and PNG

```ts
import { Simple, renderImage, renderSvg } from 'ogimagecn-svelte';

const props = {
  title: 'Svelte components, Satori output',
  description: 'A deterministic 1200 × 630 Open Graph image.'
};

const { svg, width, height } = await renderSvg(Simple, props);
const { png } = await renderImage(Simple, props);

// SvelteKit endpoint example:
return new Response(png, {
  headers: { 'content-type': 'image/png', 'cache-control': 'public, max-age=3600' }
});
```

`renderSvg` returns the final SVG plus dimensions, captured warnings, and optional layout nodes. `renderPng` returns a PNG `Uint8Array`; `renderImage` returns both. The default size is 1200 × 630 and can be overridden with render options.

## Commerce endpoint

Format application data before handing it to the visual component. This keeps locale, validation, caching, and access policy in your application:

```ts
import { error } from '@sveltejs/kit';
import { Product, renderImage } from 'ogimagecn-svelte';
import { catalog } from '$lib/server/catalog';

export async function GET({ params }) {
  const product = await catalog.getProduct(params.slug);
  if (!product) error(404, 'Produkt nicht gefunden');

  const price = new Intl.NumberFormat('de-AT', {
    style: 'currency',
    currency: product.currency
  }).format(product.price);

  const { png } = await renderImage(Product, {
    brand: 'Nordgrat',
    title: product.name,
    description: product.shortDescription,
    price,
    image: product.imageUrl
  });

  return new Response(png, {
    headers: {
      'content-type': 'image/png',
      'cache-control': 'public, max-age=3600'
    }
  });
}
```

Remote assets make the render dependent on another host. Validate and cache them, or embed trusted assets as data URIs, before using this pattern in a production endpoint.

Public server helpers also have stable subpaths:

```ts
import { renderSvg } from 'ogimagecn-svelte/render';
import { loadFont } from 'ogimagecn-svelte/fonts';
import Simple from 'ogimagecn-svelte/components/Simple';
```

## Svelte 5 composition

Component props are typed and use Svelte 5 runes. Each component accepts an `overlay` Snippet for Satori-compatible composition. Consumers never author React or React-shaped objects.

```svelte
<script lang="ts">
  import { Simple } from 'ogimagecn-svelte';
</script>

{#snippet badge()}
  <div style="display:flex;position:absolute;right:48px;top:48px;padding:12px 18px;background:#fff;color:#111;border-radius:999px">
    Svelte 5
  </div>
{/snippet}

<Simple title="Composed in Svelte" overlay={badge} />
```

To render a composed card on the server, put that composition in a `.svelte` wrapper and pass the wrapper component to `renderSvg` or `renderImage`.

## Fonts, scripts, and emoji

Licensed static Noto Sans and Noto Sans CJK SC fixture fonts are bundled with the package. Their OFL license texts, checksums, and provenance are in `src/lib/fonts/`. The deterministic default loader covers normal weights 400, 500, 600, 700, and 800; regular and bold italics; Latin, Greek, Cyrillic, Vietnamese, and Simplified Chinese fixtures.

For other weights, scripts, or family fallbacks, pass an ordered Satori font array:

```ts
import { loadFont, renderSvg } from 'ogimagecn-svelte';

const devanagari = await loadFont(new URL('file:///srv/fonts/NotoSansDevanagari-Regular.ttf'), {
  name: 'Noto Sans Devanagari',
  weight: 400,
  style: 'normal'
});

await renderSvg(Simple, { title: 'नमस्ते' }, { fonts: [devanagari] });
```

Emoji and missing glyphs are explicit Satori concerns, not silently substituted by the browser. Supply `graphemeImages` for deterministic emoji data URIs or `loadAdditionalAsset(languageCode, segment)` to return an image data URI or additional fonts. In strict mode (the default), Satori warnings become errors. Font loading, unresolved assets, and failed remote responses also reject rendering.

## Images and asset loading

Use absolute `https:` URLs or data URIs in image props. Transparent PNGs and data URIs remain supported through Satori/resvg. Remote assets make output dependent on the remote server; production systems should pin, cache, or embed them. Failed loads are errors and should not be replaced with an invisible placeholder.

The documentation and registry are deployed below the project base path `/ogimagecn-svelte`. Gallery images use relative URLs and registry dependencies use complete `https://alois-reinstadler.github.io/ogimagecn-svelte/...` URLs, so GitHub Pages does not accidentally resolve them at the account root.

## Satori constraints

These components intentionally stay inside Satori's CSS subset:

- Flexbox is the primary layout model; CSS Grid and browser-only layout behavior are not assumed.
- Every element with multiple children uses an explicit `display: flex` or `display: none` layout.
- Styles are inline and use supported absolute units. Complex selectors, runtime stylesheets, pseudo-elements, and browser JavaScript are unavailable.
- Text wrapping, overflow, `line-clamp`, gradients, borders, transforms, and shadows follow Satori/resvg behavior and may differ from a browser.
- Image URLs must be fetchable by the server. There is no browser cookie jar, DOM, canvas, or screenshot fallback.
- Snippet content must itself use the same Satori-compatible subset.

Renderer warnings are captured and fail by default. Set `strict: false` only when you have inspected and accepted the final SVG and PNG output.

## Development and release validation

```sh
pnpm install --frozen-lockfile
pnpm validate:clean
```

The clean pipeline deletes generated outputs, runs Svelte/type diagnostics, renders and inspects final SVG and PNG images, compares raster baselines, builds the typed package, proves registry determinism, installs the tarball in a fresh Svelte consumer, performs a real remote-item install with `shadcn-svelte`, and builds the static final-image gallery. GitHub Pages deploys `docs/build`.

The exact upstream pin, exhaustive inventory, parity decisions, and intentional adaptations are documented in [UPSTREAM.md](./UPSTREAM.md) and the linked audit.

## License

MIT. Bundled Noto fonts are licensed under the SIL Open Font License 1.1; the license texts ship with the font files.
