import { error } from '@sveltejs/kit';
import { registryByName } from '$lib/catalog.js';
import { renderImage } from '$lib/render.js';
import { showcaseUseCaseByName, showcaseUseCases } from '$lib/site/use-cases.js';

export const prerender = true;
export const entries = () => showcaseUseCases.map(({ name }) => ({ name }));

export async function GET({ params }) {
  const useCase = showcaseUseCaseByName[params.name as keyof typeof showcaseUseCaseByName];
  if (!useCase) error(404, 'Beispiel nicht gefunden');

  const entry = registryByName[useCase.componentName];
  const { png } = await renderImage(entry.component as never, useCase.props as never);

  return new Response(Uint8Array.from(png).buffer, {
    headers: {
      'content-type': 'image/png',
      'cache-control': 'public, max-age=31536000, immutable'
    }
  });
}
