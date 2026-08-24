<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { ownerDefaults, type OwnerProps } from '../registry.js';
  import { ownerTemplate } from '../templates/definitions.js';

  let { eyebrow = ownerDefaults.eyebrow, title = ownerDefaults.title, brand = ownerDefaults.brand,
    // Exact remote gallery values remain exported in ownerDefaults. No-prop rendering stays offline.
    images = [], logo = '', overlay }: OwnerProps = $props();
</script>

<OgNode node={ownerTemplate({ eyebrow, title, brand, images, logo })} {overlay} />
