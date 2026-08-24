<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { simpleDefaults, type SimpleProps } from '../registry.js';
  import { simpleTemplate } from '../templates/simple.js';

  let {
    label = simpleDefaults.label,
    title = simpleDefaults.title,
    description = simpleDefaults.description,
    brand = simpleDefaults.brand,
    logo = simpleDefaults.logo,
    overlay
  }: SimpleProps = $props();
</script>

<OgNode node={simpleTemplate({ label, title, description, brand, logo })} {overlay} />
