<script lang="ts">
  import OgNode from './OgNode.svelte';
  import { terminalDefaults, type TerminalProps } from '../registry.js';
  import { terminalTemplate } from '../templates/definitions.js';

  let {
    brand = terminalDefaults.brand,
    title = terminalDefaults.title,
    caption = terminalDefaults.caption,
    logo = terminalDefaults.logo,
    overlay
  }: TerminalProps = $props();
</script>

<OgNode node={terminalTemplate({ brand, title, caption, logo })} {overlay} />
