<script lang="ts">
  import { base } from '$app/paths';
  import { componentIndex } from '$lib/site/nav.js';

  let query = $state('');
  const filtered = $derived(componentIndex.filter((item) =>
    `${item.name} ${item.template} ${item.category} ${item.title} ${item.description}`
      .toLowerCase()
      .includes(query.toLowerCase())
  ));
</script>

<svelte:head>
  <title>Vorlagen nach Einsatzfall — ogimagecn-svelte</title>
  <meta
    name="description"
    content="Open-Graph-Vorlagen für Produktlaunches, Artikel, Releases, Events, Kundenstimmen und weitere konkrete Aufgaben."
  />
</svelte:head>

<div class="flex items-end justify-between gap-6">
  <div>
    <p class="field-label text-muted-foreground">Einsatzfälle</p>
    <h1 class="display mt-3 text-4xl sm:text-[2.75rem]">Was möchtest du veröffentlichen?</h1>
    <p class="text-muted-foreground mt-4 max-w-3xl text-[17px] leading-7">
      Nicht 22 abstrakte Layoutnamen, sondern 22 konkrete Ausgangspunkte: vom Produkt-Launch über
      Release-Notizen bis zur Restaurant-Kundengeschichte. Die technischen API-Namen bleiben kompatibel.
    </p>
  </div>
  <span class="font-mono text-sm tabular-nums text-muted-foreground">{filtered.length}/{componentIndex.length}</span>
</div>

<label class="mt-8 flex max-w-md items-center rounded border bg-background px-3">
  <span class="sr-only">Einsatzfälle filtern</span>
  <input
    bind:value={query}
    type="search"
    placeholder="Einsatzfall suchen …"
    class="h-10 w-full bg-transparent outline-none"
  />
</label>

<div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
  {#each filtered as item}
    <a href={`${base}/components/${item.name}/`} class="group overflow-hidden rounded-md border bg-card no-underline">
      <div class="bg-dots p-2">
        <img
          src={`${base}/previews/${item.name}.png`}
          width="600"
          height="315"
          alt={`${item.title} Vorschau`}
          loading="lazy"
          class="w-full rounded-sm"
        />
      </div>
      <div class="border-t p-4">
        <div class="flex items-center justify-between gap-3">
          <p class="field-label text-muted-foreground">{item.category}</p>
          <span class="font-mono text-[11px] text-muted-foreground">{item.template}</span>
        </div>
        <h2 class="mt-2 font-medium">{item.title}</h2>
        <p class="text-muted-foreground mt-2 text-sm leading-6">{item.description}</p>
      </div>
    </a>
  {/each}
</div>
