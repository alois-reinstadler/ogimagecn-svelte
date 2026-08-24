<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { shadcnRegistry4Defaults as defaults, type ShadcnRegistry4Props } from '../registry.js';
  import { shadcnRegistry4Template } from '../templates/definitions.js';
  let { name = defaults.name, title = defaults.title, url = defaults.url, logo = defaults.logo,
    overlay }: ShadcnRegistry4Props = $props();
</script>
<OgNode node={shadcnRegistry4Template({ name, title, url, logo })} {overlay} />
