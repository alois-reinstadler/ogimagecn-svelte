<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { eventDefaults, type EventProps } from '../registry.js';
  import { eventTemplate } from '../templates/definitions.js';

  let {
    label = eventDefaults.label,
    brand = eventDefaults.brand,
    title = eventDefaults.title,
    date = eventDefaults.date,
    location = eventDefaults.location,
    logo = eventDefaults.logo,
    overlay
  }: EventProps = $props();
</script>

<OgNode node={eventTemplate({ label, brand, title, date, location, logo })} {overlay} />
