<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { editorialDefaults, type EditorialProps } from '../registry.js';
  import { editorialTemplate } from '../templates/definitions.js';

  let {
    kicker = editorialDefaults.kicker,
    title = editorialDefaults.title,
    meta = editorialDefaults.meta,
    ghost = editorialDefaults.ghost,
    brand = editorialDefaults.brand,
    logo = editorialDefaults.logo,
    overlay
  }: EditorialProps = $props();
</script>

<OgNode node={editorialTemplate({ kicker, title, meta, ghost, brand, logo })} {overlay} />
