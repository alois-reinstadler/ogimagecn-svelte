<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { shadcnRegistry2Defaults as defaults, type ShadcnRegistry2Props } from '../registry.js';
  import { shadcnRegistry2Template } from '../templates/definitions.js';
  let { name = defaults.name, category = defaults.category, title = defaults.title, items = defaults.items,
    logo = defaults.logo, accent = defaults.accent, overlay }: ShadcnRegistry2Props = $props();
</script>
<OgNode node={shadcnRegistry2Template({ name, category, title, items, logo, accent })} {overlay} />
