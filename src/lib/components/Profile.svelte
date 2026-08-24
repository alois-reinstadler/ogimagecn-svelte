<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { profileDefaults, resolveProps, type ProfileProps } from '../registry.js';
  import { profileTemplate } from '../templates/definitions.js';
  let { overlay, ...provided }: ProfileProps = $props();
  let resolved = $derived(resolveProps(profileDefaults, provided));
</script>
<OgNode node={profileTemplate(resolved)} {overlay} />
