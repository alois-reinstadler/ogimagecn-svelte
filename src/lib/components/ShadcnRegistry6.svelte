<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { shadcnRegistry6Defaults as defaults, type ShadcnRegistry6Props } from '../registry.js';
  import { shadcnRegistry6Template } from '../templates/definitions.js';
  let { title = defaults.title, description = defaults.description, brand = defaults.brand, logo = defaults.logo,
    overlay }: ShadcnRegistry6Props = $props();
</script>
<OgNode node={shadcnRegistry6Template({ title, description, brand, logo })} {overlay} />
