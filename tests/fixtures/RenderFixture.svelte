<script lang="ts">
  let {
    text = 'Final image marker',
    image,
    lang = 'en'
  }: { text?: string; image?: string; lang?: string } = $props();
</script>

<div
  {lang}
  style="background-color:#111827;color:#f9fafb;display:flex;flex-direction:column;height:100%;padding:48px;width:100%"
>
  <div
    data-marker="cyan-region"
    style="background-color:#06b6d4;display:flex;height:72px;width:180px"
  ></div>
  <div style="display:flex;font-size:42px;font-weight:700;margin-top:32px">{text}</div>
  {#if image}
    <img alt="fixture" height="64" src={image} style="display:flex;margin-top:24px" width="64" />
  {/if}
</div>
