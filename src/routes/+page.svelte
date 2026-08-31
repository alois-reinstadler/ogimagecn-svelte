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
  price: new Intl.NumberFormat('de-AT', {
    style: 'currency',
    currency: product.currency
  }).format(product.price),
  image: product.imageUrl
});`;
</script>

<svelte:head>
  <title>ogimagecn-svelte — Daten werden Markenbilder</title>
  <meta
    name="description"
    content="Typisierte Svelte-5-Komponenten für dynamische, deterministische SVG- und PNG-Ausgabe mit Satori."
  />
</svelte:head>

<section class="container-page pt-16 pb-14 lg:pt-24">
  <div class="grid gap-12 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
    <div>
      <p class="field-label text-muted-foreground">Svelte 5 · Satori · SVG + PNG</p>
      <h1 class="display mt-5 text-[2.75rem] leading-[.95] sm:text-6xl">
        Strukturierte Daten.<br />Markenbilder.
      </h1>
      <p class="text-muted-foreground mt-6 max-w-lg text-[17px] leading-relaxed">
        Produkte, Releases, Termine und Kennzahlen am Server in reproduzierbare Bilder übersetzen — mit
        typisierten Svelte-Komponenten statt Browser-Screenshots oder React-Bäumen.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a
          href={`${base}/docs/einsatzfaelle/`}
          class="bg-foreground text-background inline-flex h-10 items-center gap-2 rounded px-5 text-sm font-medium no-underline"
        >
          Einsatzfälle ansehen <Icon name="arrow-right" class="size-3.5" />
        </a>
        <a
          href={`${base}/docs/einstieg/`}
          class="hover:bg-accent inline-flex h-10 items-center rounded border px-5 text-sm font-medium no-underline"
        >
          Loslegen
        </a>
      </div>
      <div class="mt-8"><CodeBlock code="pnpm add ogimagecn-svelte" /></div>
    </div>
    <div class="bg-dots rounded-lg border p-3 sm:p-6">
      <img
        src={`${base}/previews/use-cases/commerce.png`}
        width="1200"
        height="630"
        alt="Aus Produktdaten gerendertes Kampagnenbild"
        class="w-full rounded border shadow-xl"
      />
    </div>
  </div>
</section>

<section class="container-page border-t py-14">
  <dl class="grid gap-10 md:grid-cols-3">
    {#each [
      { t: 'Datengetrieben', d: 'Props aus Katalog, CMS, Release-Pipeline oder Datenbank werden zu konsistenten Markenbildern.' },
      { t: 'Svelte-native', d: 'Typisierte Svelte-5-Komponenten und Snippets halten Layout und Komposition im eigenen Stack.' },
      { t: 'Produktionsklar', d: 'Deterministische Ausgabe und Strict Mode machen Asset-, Font- und Layoutprobleme früh sichtbar.' }
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
    <p class="field-label text-muted-foreground">Nicht nur Blog-Vorschaubilder</p>
    <h2 class="display mt-3 text-2xl sm:text-3xl">Ein Renderer, mehrere echte Arbeitsabläufe</h2>
    <p class="text-muted-foreground mt-3 leading-7">
      Der größte Nutzen entsteht, wenn Inhalte häufig wechseln und das visuelle System stabil bleiben soll.
      Diese Beispiele werden mit derselben Produktions-Pipeline wie dein Servercode gerendert.
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
            alt={`${useCase.title} Vorschau`}
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
      <p class="field-label text-muted-foreground">Daten hinein, Bild hinaus</p>
      <h2 class="display mt-3 text-2xl sm:text-3xl">Die Anwendung behält die Kontrolle</h2>
      <p class="text-muted-foreground mt-4 leading-7">
        Preise werden mit <code class="font-mono">Intl</code> formatiert, Bilder kontrolliert geladen und
        Cache-Regeln im Endpunkt festgelegt. Der Renderer übernimmt nur die reproduzierbare Darstellung.
      </p>
      <a href={`${base}/docs/einsatzfaelle/`} class="mt-6 inline-flex items-center gap-2 text-sm">
        Vollständige Endpunkte öffnen <Icon name="arrow-right" />
      </a>
    </div>
    <CodeBlock code={endpointCode} filename="og-product.ts" />
  </div>
</section>

<section class="container-page border-t py-14">
  <div class="flex items-baseline justify-between gap-4">
    <div>
      <h2 class="display text-2xl sm:text-3xl">Mit einer Vorlage beginnen</h2>
      <p class="text-muted-foreground mt-3 max-w-2xl">
        {componentIndex.length} konkrete Einsatzfälle mit kompatiblen, installierbaren API-Komponenten.
      </p>
    </div>
    <a href={`${base}/components/`} class="text-sm">Alle öffnen</a>
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
  <h2 class="display text-2xl sm:text-3xl">Mit echten Daten starten</h2>
  <p class="text-muted-foreground mx-auto mt-3 max-w-xl">
    Installieren, eine Vorlage mit deinem Datensatz verbinden und SVG oder PNG am Server ausgeben.
  </p>
  <a
    href={`${base}/docs/einstieg/`}
    class="bg-foreground text-background mt-7 inline-flex h-10 items-center gap-2 rounded px-5 text-sm font-medium no-underline"
  >
    Anleitung öffnen <Icon name="arrow-right" />
  </a>
</section>
