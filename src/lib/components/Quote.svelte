<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { quoteDefaults, resolveProps, type QuoteProps } from '../registry.js';
  import { quoteTemplate } from '../templates/definitions.js';
  let { overlay, ...provided }: QuoteProps = $props();
  let resolved = $derived(resolveProps(quoteDefaults, provided));
</script>
<OgNode node={quoteTemplate(resolved)} {overlay} />
