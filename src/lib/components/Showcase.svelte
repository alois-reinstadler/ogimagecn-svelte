<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { showcaseDefaults, type ShowcaseProps } from '../registry.js';
  import { showcaseTemplate } from '../templates/definitions.js';

  let {
    title = showcaseDefaults.title,
    subtitle = showcaseDefaults.subtitle,
    url = showcaseDefaults.url,
    accent = showcaseDefaults.accent,
    overlay
  }: ShowcaseProps = $props();
</script>

<OgNode node={showcaseTemplate({ title, subtitle, url, accent })} {overlay} />
