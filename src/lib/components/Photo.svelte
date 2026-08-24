<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { photoDefaults, resolveProps, type PhotoProps } from '../registry.js';
  import { photoTemplate } from '../templates/definitions.js';
  let { overlay, ...provided }: PhotoProps = $props();
  let resolved = $derived(resolveProps(photoDefaults, provided));
</script>
<OgNode node={photoTemplate(resolved)} {overlay} />
