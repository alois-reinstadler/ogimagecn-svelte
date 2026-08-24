<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { shadcnRegistry3Defaults as defaults, type ShadcnRegistry3Props } from '../registry.js';
  import { shadcnRegistry3Template } from '../templates/definitions.js';
  let { title = defaults.title, credit = defaults.credit, ghost = defaults.ghost, logo = defaults.logo,
    overlay }: ShadcnRegistry3Props = $props();
</script>
<OgNode node={shadcnRegistry3Template({ title, credit, ghost, logo })} {overlay} />
