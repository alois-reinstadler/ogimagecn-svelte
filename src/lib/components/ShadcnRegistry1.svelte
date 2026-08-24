<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { shadcnRegistry1Defaults as defaults, type ShadcnRegistry1Props } from '../registry.js';
  import { shadcnRegistry1Template } from '../templates/definitions.js';
  let { name = defaults.name, url = defaults.url, description = defaults.description, logo = defaults.logo,
    items = defaults.items, overlay }: ShadcnRegistry1Props = $props();
</script>
<OgNode node={shadcnRegistry1Template({ name, url, description, logo, items })} {overlay} />
