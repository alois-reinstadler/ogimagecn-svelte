import { error } from '@sveltejs/kit';
import { registry } from '$lib/catalog.js';
import { componentIndex } from '$lib/site/nav.js';
import { componentShowcaseByName } from '$lib/site/use-cases.js';

export const entries = () => componentIndex.map(({ name }) => ({ name }));

export const load = ({ params }) => {
  const meta = componentIndex.find((component) => component.name === params.name);
  const entry = registry.find((component) => component.name === params.name);
  if (!meta || !entry) error(404, 'Komponente nicht gefunden');

  const showcase = componentShowcaseByName[entry.name];
  const exampleProps = [
    ...Object.entries(showcase.props),
    ...(showcase.assets ?? []).map((asset) => [asset.prop, asset.file ?? asset.files] as const)
  ].map(([name, value]) => ({ name, value: JSON.stringify(value) }));

  return {
    meta,
    exampleProps,
    props: Object.entries(entry.defaults)
      .filter(([key]) => key !== 'overlay')
      .map(([name, value]) => ({ name, value: JSON.stringify(value) }))
  };
};
