import { error } from '@sveltejs/kit';
import { registry } from '$lib/catalog.js';
import { renderImage } from '$lib/render.js';

export const prerender = true;
export const entries = () => registry.map(({ name }) => ({ name }));

export async function GET({ params }) {
  const entry = registry.find((item) => item.name === params.name);
  if (!entry) error(404, 'Vorschau nicht gefunden');
  const props = entry.name === 'owner' ? { images: [], logo: '' } : entry.name === 'shiori' ? { logo: '' } : {};
  const { png } = await renderImage(entry.component as never, props as never);
  return new Response(Uint8Array.from(png).buffer, { headers: { 'content-type': 'image/png', 'cache-control': 'public, max-age=31536000, immutable' } });
}
