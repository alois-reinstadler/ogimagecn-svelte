<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { statDefaults, type StatProps } from '../registry.js';
  import { statTemplate } from '../templates/definitions.js';

  let {
    label = statDefaults.label,
    value = statDefaults.value,
    caption = statDefaults.caption,
    trend = statDefaults.trend,
    brand = statDefaults.brand,
    logo = statDefaults.logo,
    overlay
  }: StatProps = $props();
</script>

<OgNode node={statTemplate({ label, value, caption, trend, brand, logo })} {overlay} />
