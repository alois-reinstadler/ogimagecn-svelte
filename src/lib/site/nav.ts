import { components } from '../registry-metadata.mjs';
import type { RegistryName } from '../catalog.js';
import { componentShowcaseByName } from './use-cases.js';

export const REPOSITORY = 'https://github.com/alois-reinstadler/ogimagecn-svelte';
export const guides = [
  { slug: 'einstieg', title: 'Getting started', hint: 'Install the package and render your first image' },
  { slug: 'einsatzfaelle', title: 'Use cases', hint: 'Commerce, releases, and personalized images' },
  { slug: 'api', title: 'API reference', hint: 'Renderer, options, and return values' },
  { slug: 'komposition', title: 'Composition', hint: 'Extend layouts with Svelte snippets' },
  { slug: 'schriften', title: 'Fonts & emoji', hint: 'Load fonts and missing glyphs' },
  { slug: 'satori', title: 'Satori constraints', hint: 'Supported CSS and strict mode' }
] as const;
export const componentIndex = components.map((component) => {
  const showcase = componentShowcaseByName[component.name as RegistryName];
  return {
    ...component,
    template: component.title,
    title: showcase.title,
    category: showcase.category,
    description: showcase.description
  };
});
export const sections = [
  { id: 'guides', label: 'Guides', href: '/docs/', count: guides.length },
  { id: 'components', label: 'Templates', href: '/components/', count: componentIndex.length }
] as const;
export function sectionOf(path: string) { return path.startsWith('/components') ? 'components' : 'guides'; }
export const searchIndex = [
  ...guides.map((g) => ({ title:g.title, subtitle:g.hint, section:'Guides', href:`/docs/${g.slug}/`, keywords:`${g.title} ${g.hint}`.toLowerCase() })),
  ...componentIndex.map((c) => ({ title:c.title, subtitle:c.description, section:'Templates', href:`/components/${c.name}/`, keywords:`${c.name} ${c.template} ${c.category} ${c.title} ${c.description}`.toLowerCase() }))
];
