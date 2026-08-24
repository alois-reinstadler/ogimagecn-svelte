<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { gridDefaults, resolveProps, type GridProps } from '../registry.js';
  import { gridTemplate } from '../templates/definitions.js';
  let { overlay, ...provided }: GridProps = $props();
  let resolved = $derived(resolveProps(gridDefaults, provided));
</script>
<OgNode node={gridTemplate(resolved)} {overlay} />
