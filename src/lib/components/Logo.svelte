<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { logoDefaults, type LogoProps } from '../registry.js';
  import { logoTemplate } from '../templates/definitions.js';

  let {
    brand = logoDefaults.brand,
    tagline = logoDefaults.tagline,
    monogram = logoDefaults.monogram,
    background = logoDefaults.background,
    logo = logoDefaults.logo,
    overlay
  }: LogoProps = $props();
</script>

<OgNode node={logoTemplate({ brand, tagline, monogram, background, logo })} {overlay} />
