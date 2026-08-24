<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { shioriDefaults, type ShioriProps } from '../registry.js';
  import { shioriTemplate } from '../templates/definitions.js';

  let {
    background = shioriDefaults.background,
    brand = shioriDefaults.brand,
    brandColor = shioriDefaults.brandColor,
    // Keep no-prop rendering offline and deterministic; explicit props retain the upstream URL.
    logo = '',
    title = shioriDefaults.title,
    titleColor = shioriDefaults.titleColor,
    overlay
  }: ShioriProps = $props();
</script>

<OgNode node={shioriTemplate({ background, brand, brandColor, logo, title, titleColor })} {overlay} />
