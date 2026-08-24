<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { productDefaults, resolveProps, type ProductProps } from '../registry.js';
  import { productTemplate } from '../templates/definitions.js';
  let { overlay, ...provided }: ProductProps = $props();
  let resolved = $derived(resolveProps(productDefaults, provided));
</script>
<OgNode node={productTemplate(resolved)} {overlay} />
