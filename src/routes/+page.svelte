<script lang="ts">
  import { base } from '$app/paths';
  import Icon from '$lib/components/site/Icon.svelte';
  import CodeBlock from '$lib/components/site/CodeBlock.svelte';
  import { componentIndex } from '$lib/site/nav.js';
  import { showcaseUseCases } from '$lib/site/use-cases.js';

  const endpointCode = `const product = await catalog.getProduct(params.slug);

const { png } = await renderImage(Product, {
  title: product.name,
  description: product.shortDescription,
  price: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency
  }).format(product.price),
  image: product.imageUrl
});`;
</script>

<svelte:head>
  <title>ogimagecn-svelte — Turn data into brand images</title>
  <meta
    name="description"
    content="Typed Svelte 5 components for dynamic, deterministic SVG and PNG output with Satori."
  />
</svelte:head>

<section class="container-page pt-16 pb-14 lg:pt-24">
  <div class="grid gap-12 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
    <div>
      <p class="field-label text-muted-foreground">Svelte 5 · Satori · SVG + PNG</p>
      <h1 class="display mt-5 text-[2.75rem] leading-[.95] sm:text-6xl">
        Structured data.<br />Brand images.
      </h1>
      <p class="text-muted-foreground mt-6 max-w-lg text-[17px] leading-relaxed">
        Turn products, releases, events, and metrics into reproducible server-rendered images — with typed
        Svelte components instead of browser screenshots or React trees.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a
          href={`${base}/docs/einsatzfaelle/`}
          class="bg-foreground text-background inline-flex h-10 items-center gap-2 rounded px-5 text-sm font-medium no-underline"
        >
          Explore use cases <Icon name="arrow-right" class="size-3.5" />
        </a>
        <a
          href={`${base}/docs/einstieg/`}
          class="hover:bg-accent inline-flex h-10 items-center rounded border px-5 text-sm font-medium no-underline"
        >
          Get started
        </a>
      </div>
      <div class="mt-8"><CodeBlock code="pnpm add ogimagecn-svelte" /></div>
    </div>
    <div class="bg-dots rounded-lg border p-3 sm:p-6">
      <img
        src={`${base}/previews/use-cases/commerce.png`}
        width="1200"
        height="630"
        alt="Campaign visual rendered from product data"
        class="w-full rounded border shadow-xl"
      />
    </div>
  </div>
</section>

<section class="container-page border-t py-14">
  <dl class="grid gap-10 md:grid-cols-3">
    {#each [
      { t: 'Data-driven', d: 'Props from your catalog, CMS, release pipeline, or database become consistent brand images.' },
      { t: 'Svelte-native', d: 'Typed Svelte 5 components and snippets keep layout and composition in your own stack.' },
      { t: 'Production-ready', d: 'Deterministic output and strict mode surface asset, font, and layout issues early.' }
    ] as item}
      <div>
        <dt class="field-label">{item.t}</dt>
        <dd class="text-muted-foreground mt-2.5 text-sm leading-6">{item.d}</dd>
      </div>
    {/each}
  </dl>
</section>

<section class="container-page border-t py-14">
  <div class="max-w-3xl">
    <p class="field-label text-muted-foreground">More than blog previews</p>
    <h2 class="display mt-3 text-2xl sm:text-3xl">One renderer, multiple real workflows</h2>
    <p class="text-muted-foreground mt-3 leading-7">
      The biggest gains come when content changes often while the visual system stays consistent.
      These examples use the same production pipeline as your server code.
    </p>
  </div>
  <div class="mt-8 grid gap-5 md:grid-cols-2">
    {#each showcaseUseCases as useCase}
      <article class="overflow-hidden rounded-md border bg-card">
        <div class="bg-dots p-2">
          <img
            src={`${base}/previews/use-cases/${useCase.slug}.png`}
            width="600"
            height="315"
            alt={`${useCase.title} preview`}
            loading="lazy"
            class="w-full rounded-sm"
          />
        </div>
        <div class="border-t p-5">
          <p class="field-label text-muted-foreground">{useCase.category}</p>
          <h3 class="mt-2 font-medium">{useCase.title}</h3>
          <p class="text-muted-foreground mt-2 text-sm leading-6">{useCase.description}</p>
        </div>
      </article>
    {/each}
  </div>
</section>

<section class="container-page border-t py-14">
  <div class="grid gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
    <div>
      <p class="field-label text-muted-foreground">Data in, image out</p>
      <h2 class="display mt-3 text-2xl sm:text-3xl">Your application stays in control</h2>
      <p class="text-muted-foreground mt-4 leading-7">
        Format prices with <code class="font-mono">Intl</code>, load images under your own policy, and set cache
        rules in the endpoint. The renderer handles only the reproducible presentation.
      </p>
      <a href={`${base}/docs/einsatzfaelle/`} class="mt-6 inline-flex items-center gap-2 text-sm">
        View complete endpoints <Icon name="arrow-right" />
      </a>
    </div>
    <CodeBlock code={endpointCode} filename="og-product.ts" />
  </div>
</section>

<section class="container-page border-t py-14">
  <div class="flex items-baseline justify-between gap-4">
    <div>
      <h2 class="display text-2xl sm:text-3xl">Start with a template</h2>
      <p class="text-muted-foreground mt-3 max-w-2xl">
        {componentIndex.length} concrete use cases with compatible, installable API components.
      </p>
    </div>
    <a href={`${base}/components/`} class="text-sm">View all</a>
  </div>
  <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
    {#each componentIndex.slice(0, 6) as item}
      <a href={`${base}/components/${item.name}/`} class="group overflow-hidden rounded-md border bg-card no-underline">
        <div class="bg-dots p-2">
          <img
            src={`${base}/previews/${item.name}.png`}
            width="600"
            height="315"
            alt={item.title}
            loading="lazy"
            class="w-full rounded-sm"
          />
        </div>
        <div class="border-t p-4">
          <h3 class="font-medium">{item.title}</h3>
          <p class="text-muted-foreground mt-1 text-sm line-clamp-2">{item.description}</p>
        </div>
      </a>
    {/each}
  </div>
</section>

<section class="container-page border-t py-16 text-center">
  <h2 class="display text-2xl sm:text-3xl">Start with real data</h2>
  <p class="text-muted-foreground mx-auto mt-3 max-w-xl">
    Install the package, connect a template to your dataset, and output SVG or PNG on the server.
  </p>
  <a
    href={`${base}/docs/einstieg/`}
    class="bg-foreground text-background mt-7 inline-flex h-10 items-center gap-2 rounded px-5 text-sm font-medium no-underline"
  >
    Open the guide <Icon name="arrow-right" />
  </a>
</section>
