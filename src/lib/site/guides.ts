export type Block={type:'p';text:string}|{type:'code';code:string;filename?:string}|{type:'list';items:string[]}|{type:'note';title:string;text:string};
export type GuideDoc={title:string;intro:string;sections:{id:string;title:string;blocks:Block[]}[]};

export const guideDocs:Record<string,GuideDoc>={
  einstieg:{title:'Getting started',intro:'Install the package and render your first Open Graph image directly from a Svelte component.',sections:[
    {id:'installation',title:'Installation',blocks:[{type:'code',code:'pnpm add ogimagecn-svelte',filename:'Terminal'}]},
    {id:'rendern',title:'Render SVG and PNG',blocks:[{type:'p',text:'The renderer runs exclusively on the server. Components and props remain fully typed.'},{type:'code',filename:'og.ts',code:`import { Simple, renderImage } from 'ogimagecn-svelte';

const { svg, png } = await renderImage(Simple, {
  title: 'Svelte components, Satori output',
  description: 'A deterministic Open Graph image.'
});`}]},
    {id:'endpoint',title:'SvelteKit endpoint',blocks:[{type:'code',filename:'src/routes/og/+server.ts',code:`import { Simple, renderImage } from 'ogimagecn-svelte';

export async function GET() {
  const { png } = await renderImage(Simple, { title: 'Hello SvelteKit' });
  return new Response(png, { headers: { 'content-type': 'image/png' } });
}`},{type:'note',title:'Server-side only',text:'Svelte SSR, font files, and @resvg/resvg-js do not belong in browser code.'}]}
  ]},
  einsatzfaelle:{title:'Use cases',intro:'The API turns structured data into reproducible brand images — especially when content changes frequently but the layout needs to remain controlled.',sections:[
    {id:'passende-aufgaben',title:'Where the API works best',blocks:[
      {type:'p',text:'The strongest use case is not a single Open Graph image, but a repeatable mapping: product, release, event, or metric in; verified SVG or PNG out.'},
      {type:'list',items:['Commerce: product name, price, currency, image, and campaign status from catalog or CMS data.','Automation: release notes, status pages, and deployment results directly from a pipeline.','Localization: translated content, en-US formatting, time zones, and explicitly loaded fonts.','Personalization: milestones, certificates, or annual reviews as a batch job for each account.','Content: article, podcast, or real estate previews from existing datasets.']}
    ]},
    {id:'vorlagen-statt-formen',title:'Choose templates by task',blocks:[
      {type:'p',text:'Names like Simple, Grid, or Shadcn Registry describe neither the content nor the occasion. The gallery therefore maps every stable API component to a concrete task, such as a feature announcement, technical deep dive, product launch, property listing, or customer story.'},
      {type:'list',items:['The use-case label helps you choose and can evolve as better examples emerge.','The technical component name and props remain compatible; existing imports and registry URLs do not change.','Example data shows a credible scenario instead of placeholder copy. Image-based templates use local, reproducible example assets.']},
      {type:'note',title:'A template is not a data model',text:'Product understands prices and packshots, Changelog a list of changes, and Event a date and location. Choose the component based on data your application actually has — not just its color or shape.'}
    ]},
    {id:'commerce',title:'Commerce endpoint',blocks:[
      {type:'p',text:'A product image demonstrates the value of typed props especially clearly: your application already owns the data and formats the price and availability before calling the visual component.'},
      {type:'code',filename:'src/routes/og/product/[slug]/+server.ts',code:`import { error } from '@sveltejs/kit';
import { Product, renderImage } from 'ogimagecn-svelte';
import { catalog } from '$lib/server/catalog';

export async function GET({ params }) {
  const product = await catalog.getProduct(params.slug);
  if (!product) error(404, 'Product not found');

  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency
  }).format(product.price);

  const { png } = await renderImage(Product, {
    brand: 'North Ridge',
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
}`},
      {type:'note',title:'Control your assets',text:'Product images from third-party hosts make rendering depend on their availability. In production, validate and cache them or embed them as data URIs.'}
    ]},
    {id:'automation',title:'Release automation',blocks:[
      {type:'p',text:'A release workflow can use the same data for the changelog, feed, and preview image. Strict mode makes renderer warnings fail the job visibly.'},
      {type:'code',filename:'scripts/render-release.ts',code:`import { writeFile } from 'node:fs/promises';
import { Changelog, renderImage } from 'ogimagecn-svelte';

const release = await getLatestRelease();
const { png, warnings } = await renderImage(Changelog, {
  brand: 'North Ridge Cloud',
  version: release.version,
  date: release.publishedAt,
  title: 'Release ready',
  items: release.highlights
});

await writeFile(\`artifacts/release-\${release.version}.png\`, png);
console.info({ warnings });`}
    ]},
    {id:'lokalisierung',title:'Localization and personalization',blocks:[
      {type:'p',text:'Format data before it reaches the renderer. Intl with en-US keeps currencies, percentages, and dates consistent; custom or additional fonts cover the required writing systems reproducibly.'},
      {type:'list',items:['Build a stable cache key for each language and dataset.','Validate remote images for allowed hosts, size, and content type before rendering.','Limit concurrency for large batches because font layout and rasterization are CPU-intensive.','Store SVG when you need more sizes without recalculating layout; output PNG for platforms that require raster images.']}
    ]},
    {id:'grenzen',title:'When a browser is a better fit',blocks:[
      {type:'p',text:'Satori is intentionally not a website screenshot tool. The API is less suitable for pixel-perfect browser views, arbitrary HTML and CSS, canvas, client-side chart libraries, or animation.'},
      {type:'note',title:'Dimensions are not responsive design',text:'Changing width and height changes the render area, but it does not automatically adapt a template designed for 1200 × 630. Design and test a dedicated Svelte component for each square, story, or banner format.'}
    ]}
  ]},
  api:{title:'API reference',intro:'The small public API returns SVG, PNG, dimensions, and renderer diagnostics.',sections:[
    {id:'renderer',title:'Renderer',blocks:[{type:'list',items:['renderSvg(component, props, options?) returns SVG, dimensions, warnings, and optional layout nodes.','renderPng(component, props, options?) returns a PNG as Uint8Array.','renderImage(component, props, options?) returns SVG metadata and PNG together.']}]},
    {id:'optionen',title:'RenderOptions',blocks:[{type:'list',items:['width and height: 1200 × 630 by default.','fonts: custom Satori fonts; bundled Noto fonts are used by default.','strict: true by default; renderer warnings become errors.','graphemeImages and loadAdditionalAsset: deterministic images or fonts for missing glyphs.']}]},
    {id:'fonts',title:'loadFont',blocks:[{type:'p',text:'loadFont accepts file: and https: URLs, absolute file paths, ArrayBuffer, or Uint8Array and returns a Satori font object.'}]}
  ]},
  komposition:{title:'Composition',intro:'Every template can be extended with a typed Svelte 5 snippet.',sections:[
    {id:'overlay',title:'Overlay snippet',blocks:[{type:'code',filename:'Card.svelte',code:`<script lang="ts">
  import { Simple } from 'ogimagecn-svelte';
</script>

{#snippet badge()}
  <div style="display:flex;position:absolute;right:48px;top:48px">
    Svelte 5
  </div>
{/snippet}

<Simple title="Composed in Svelte" overlay={badge} />`}]},
    {id:'regeln',title:'The same layout rules',blocks:[{type:'note',title:'Stay Satori-compatible',text:'Snippet content must also use Flexbox, inline styles, and supported absolute units.'}]}
  ]},
  schriften:{title:'Fonts & emoji',intro:'Bundled Noto fonts cover the most common writing systems; additional glyphs remain explicit and reproducible.',sections:[
    {id:'eigene-fonts',title:'Load a custom font',blocks:[{type:'code',filename:'fonts.ts',code:`import { loadFont, renderSvg } from 'ogimagecn-svelte';

const font = await loadFont('/srv/fonts/Brand.woff2', {
  name: 'Brand', weight: 400, style: 'normal'
});

await renderSvg(Simple, { title: 'Hello' }, { fonts: [font] });`}]},
    {id:'emoji',title:'Emoji and missing glyphs',blocks:[{type:'p',text:'Use graphemeImages to provide emoji as fixed data URIs. loadAdditionalAsset can return extra fonts or an image for each segment.'}]}
  ]},
  satori:{title:'Satori constraints',intro:'The components intentionally stay within the CSS subset supported by Satori.',sections:[
    {id:'css',title:'Supported layout',blocks:[{type:'list',items:['Flexbox is the primary layout model; CSS Grid is not assumed.','Styles are inline and use supported absolute units.','Pseudo-elements, browser JavaScript, and runtime stylesheets are unavailable.','Image URLs must be reachable from the server.']}]},
    {id:'strict',title:'Strict mode',blocks:[{type:'p',text:'Renderer warnings fail by default. Disable strict only after consciously verifying both SVG and PNG output.'},{type:'note',title:'Failures should be loud',text:'A build error is easier to find than a silently corrupted social preview in a cache.'}]}
  ]}
};
