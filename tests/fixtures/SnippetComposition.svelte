<script lang="ts">
  import SnippetConsumer from './SnippetConsumer.svelte';
</script>

{#snippet badge(label: string)}
  <div
    data-marker="snippet-badge"
    style="background-color:#12b981;border-radius:18px;color:#071711;display:flex;font-size:42px;font-weight:700;padding:20px 30px"
  >
    {label}
  </div>
{/snippet}

<SnippetConsumer content={badge} />
