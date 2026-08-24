<script lang="ts">
  import type { Snippet } from 'svelte';

  let { content }: { content: Snippet<[string]> } = $props();
</script>

<div
  style="align-items:center;background-color:#0b1020;color:#ffffff;display:flex;flex-direction:column;height:100%;justify-content:center;width:100%"
>
  {@render content('Svelte Snippet')}
</div>
