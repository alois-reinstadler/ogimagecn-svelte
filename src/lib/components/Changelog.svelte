<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { changelogDefaults, resolveProps, type ChangelogProps } from '../registry.js';
  import { changelogTemplate } from '../templates/definitions.js';
  let { overlay, ...provided }: ChangelogProps = $props();
  let resolved = $derived(resolveProps(changelogDefaults, provided));
</script>
<OgNode node={changelogTemplate(resolved)} {overlay} />
