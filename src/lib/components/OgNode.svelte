<script lang="ts">
  import type { Snippet } from 'svelte';
  import OgNodeRenderer from './OgNode.svelte';
  import type { OgNode } from '../templates/node.js';
  import { serializeStyle } from '../templates/node.js';

  interface Props {
    node: OgNode;
    overlay?: Snippet;
    root?: boolean;
  }

  let { node, overlay, root = true }: Props = $props();
</script>

<!-- Keep this block compact: literal SSR whitespace becomes Satori text nodes. -->
{#if node.tag === 'img'}
  <svelte:element this={'img'} {...node.attrs} style={serializeStyle(node.style, node.tag)} />
{:else}
  <svelte:element this={node.tag} {...node.attrs} style={serializeStyle(node.style, node.tag)}>{#each node.children ?? [] as child}{#if typeof child === 'string'}{child}{:else}<OgNodeRenderer node={child} root={false} />{/if}{/each}{#if root && overlay}<div style="display:flex;position:absolute;top:0;right:0;bottom:0;left:0">{@render overlay()}</div>{/if}</svelte:element>
{/if}
