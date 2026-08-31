<script lang="ts">
  import { base } from '$app/paths';
  import CodeBlock from '$lib/components/site/CodeBlock.svelte';
  import { componentExampleCode } from '$lib/site/use-cases.js';
  import type { RegistryName } from '$lib/catalog.js';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const className = $derived(data.meta.name.split('-').map((part: string) =>
    part[0].toUpperCase() + part.slice(1)
  ).join(''));
  const literalProps = $derived(data.exampleProps
    .filter((prop) => !['image', 'images', 'avatar', 'logo'].includes(prop.name))
    .map((prop) => `  ${prop.name}: ${prop.value}`)
    .join(',\n'));
  const fallbackUsage = $derived(`const { svg, png } = await renderImage(${className}, {\n${literalProps}\n});`);
  const usage = $derived(`import { ${className}, renderImage } from 'ogimagecn-svelte';\n\n${
    componentExampleCode[data.meta.name as RegistryName] ?? fallbackUsage
  }`);
</script>

<svelte:head>
  <title>{data.meta.title} — ogimagecn-svelte</title>
  <meta name="description" content={data.meta.description} />
</svelte:head>

<article class="max-w-4xl">
  <a href={`${base}/components/`} class="text-muted-foreground text-sm">← All use cases</a>
  <p class="field-label text-muted-foreground mt-8">{data.meta.category} · API: {data.meta.template}</p>
  <h1 class="display mt-3 text-4xl sm:text-[2.75rem]">{data.meta.title}</h1>
  <p class="text-muted-foreground mt-4 max-w-2xl text-[17px] leading-relaxed">{data.meta.description}</p>

  <div class="bg-dots mt-10 rounded-lg border p-3 sm:p-6">
    <img
      src={`${base}/previews/${data.meta.name}.png`}
      width="1200"
      height="630"
      alt={`${data.meta.title} preview`}
      class="w-full rounded border shadow-xl"
    />
  </div>

  <section class="mt-12">
    <h2 class="display text-2xl">Example scenario</h2>
    <p class="text-muted-foreground mt-3 leading-7">
      This preview uses realistic content and local example assets. In your project, replace them with data from
      your catalog, CMS, or backend.
    </p>
    <div class="mt-4 overflow-x-auto rounded border">
      <table class="w-full text-left text-sm">
        <thead class="bg-muted"><tr><th class="p-3 font-medium">Prop</th><th class="p-3 font-medium">Example value</th></tr></thead>
        <tbody>
          {#each data.exampleProps as prop}
            <tr class="border-t">
              <td class="p-3 font-mono">{prop.name}</td>
              <td class="max-w-xl p-3 font-mono text-xs text-muted-foreground break-all">{prop.value}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <section class="mt-12">
    <h2 class="display text-2xl">Install</h2>
    <div class="mt-4">
      <CodeBlock code={`pnpm dlx shadcn-svelte@latest add https://alois-reinstadler.github.io/ogimagecn-svelte/r/${data.meta.name}.json`} />
    </div>
  </section>

  <section class="mt-12">
    <h2 class="display text-2xl">Use your own data</h2>
    <div class="mt-4"><CodeBlock code={usage} filename="og.ts" /></div>
  </section>

  <section class="mt-12">
    <h2 class="display text-2xl">Technical default props</h2>
    <p class="text-muted-foreground mt-3">
      The API name <code class="font-mono">{data.meta.template}</code> and its upstream defaults remain unchanged
      for compatibility. Every component also accepts an optional
      <code class="font-mono">overlay</code> snippet.
    </p>
    <div class="mt-4 overflow-x-auto rounded border">
      <table class="w-full text-left text-sm">
        <thead class="bg-muted"><tr><th class="p-3 font-medium">Prop</th><th class="p-3 font-medium">Default value</th></tr></thead>
        <tbody>
          {#each data.props as prop}
            <tr class="border-t">
              <td class="p-3 font-mono">{prop.name}</td>
              <td class="max-w-xl p-3 font-mono text-xs text-muted-foreground break-all">{prop.value}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</article>
