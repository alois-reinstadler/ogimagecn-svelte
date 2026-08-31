import { components } from '../registry-metadata.mjs';
import type { RegistryName } from '../catalog.js';
import { componentShowcaseByName } from './use-cases.js';

export const REPOSITORY = 'https://github.com/alois-reinstadler/ogimagecn-svelte';
export const guides = [
  { slug: 'einstieg', title: 'Einstieg', hint: 'Installieren und das erste Bild rendern' },
  { slug: 'einsatzfaelle', title: 'Einsatzfälle', hint: 'Commerce, Releases und personalisierte Bilder' },
  { slug: 'api', title: 'API-Referenz', hint: 'Renderer, Optionen und Rückgabewerte' },
  { slug: 'komposition', title: 'Komposition', hint: 'Layouts mit Svelte-Snippets erweitern' },
  { slug: 'schriften', title: 'Schriften & Emoji', hint: 'Fonts und fehlende Glyphen laden' },
  { slug: 'satori', title: 'Satori-Grenzen', hint: 'Unterstütztes CSS und Strict Mode' }
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
  { id: 'guides', label: 'Anleitungen', href: '/docs/', count: guides.length },
  { id: 'components', label: 'Vorlagen', href: '/components/', count: componentIndex.length }
] as const;
export function sectionOf(path: string) { return path.startsWith('/components') ? 'components' : 'guides'; }
export const searchIndex = [
  ...guides.map((g) => ({ title:g.title, subtitle:g.hint, section:'Anleitungen', href:`/docs/${g.slug}/`, keywords:`${g.title} ${g.hint}`.toLowerCase() })),
  ...componentIndex.map((c) => ({ title:c.title, subtitle:c.description, section:'Vorlagen', href:`/components/${c.name}/`, keywords:`${c.name} ${c.template} ${c.category} ${c.title} ${c.description}`.toLowerCase() }))
];
