<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { blogDefaults, resolveProps, type BlogProps } from '../registry.js';
  import { blogTemplate } from '../templates/definitions.js';
  let { overlay, ...provided }: BlogProps = $props();
  let resolved = $derived(resolveProps(blogDefaults, provided));
</script>
<OgNode node={blogTemplate(resolved)} {overlay} />
