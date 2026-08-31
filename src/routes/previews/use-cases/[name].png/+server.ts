import { error } from '@sveltejs/kit';
import { registryByName } from '$lib/catalog.js';
import { renderImage } from '$lib/render.js';
import { resolveExampleProps } from '$lib/site/example-assets.server.js';
import { showcaseUseCaseByName, showcaseUseCases } from '$lib/site/use-cases.js';

export const prerender = true;
export const entries = () => showcaseUseCases.map(({ slug }) => ({ name: slug }));

export async function GET({ params }) {
  const useCase = showcaseUseCaseByName[params.name as keyof typeof showcaseUseCaseByName];
  if (!useCase) error(404, 'Example not found');

  const entry = registryByName[useCase.name];
  const props = await resolveExampleProps(useCase);
  const { png } = await renderImage(entry.component as never, props as never);

  return new Response(Uint8Array.from(png).buffer, {
    headers: {
      'content-type': 'image/png',
      'cache-control': 'public, max-age=31536000, immutable'
    }
  });
}
