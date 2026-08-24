<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { shadcnRegistry5Defaults as defaults, type ShadcnRegistry5Props } from '../registry.js';
  import { shadcnRegistry5Template } from '../templates/definitions.js';
  let { name = defaults.name, title = defaults.title, description = defaults.description, logo = defaults.logo,
    overlay }: ShadcnRegistry5Props = $props();
</script>
<OgNode node={shadcnRegistry5Template({ name, title, description, logo })} {overlay} />
