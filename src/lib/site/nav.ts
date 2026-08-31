import { components } from '../registry-metadata.mjs';

export const REPOSITORY = 'https://github.com/alois-reinstadler/ogimagecn-svelte';
export const guides = [
  { slug: 'einstieg', title: 'Einstieg', hint: 'Installieren und das erste Bild rendern' },
  { slug: 'einsatzfaelle', title: 'Einsatzfälle', hint: 'Commerce, Releases und personalisierte Bilder' },
  { slug: 'api', title: 'API-Referenz', hint: 'Renderer, Optionen und Rückgabewerte' },
  { slug: 'komposition', title: 'Komposition', hint: 'Layouts mit Svelte-Snippets erweitern' },
  { slug: 'schriften', title: 'Schriften & Emoji', hint: 'Fonts und fehlende Glyphen laden' },
  { slug: 'satori', title: 'Satori-Grenzen', hint: 'Unterstütztes CSS und Strict Mode' }
] as const;
const descriptions: Record<string,string> = {
  simple:'Ein minimales, zentriertes Open-Graph-Bild mit Label, Titel, Beschreibung und Markenname.', grid:'Ein technisch gerahmtes Motiv mit gestricheltem Raster und Markenname in der Ecke.', blog:'Ein Artikelmotiv mit Kategorie, Überschrift, Auszug und Autorenzeile.', changelog:'Ein Release-Motiv mit Version, Datum, Titel und einer Liste der Änderungen.', quote:'Ein Testimonial-Motiv mit großem Zitat und Autorenzeile.',
  'shadcn-registry-1':'Ein Registry-Motiv mit Logo, Name, URL, Beschreibung und Schlagwörtern.', 'shadcn-registry-2':'Ein helles Registry-Motiv mit Logo, Kategorie, Titel und Schlagwörtern.', 'shadcn-registry-3':'Ein kräftiges dunkles Motiv mit großem Titel, Plakette und Wasserzeichen.', 'shadcn-registry-4':'Ein zentriertes dunkles Motiv auf einem dezenten Punktraster.', 'shadcn-registry-5':'Ein sauberes helles Registry-Motiv in einem gerahmten Layout.', 'shadcn-registry-6':'Ein minimales Registry-Motiv mit Linienrahmen, Logo und Beschreibung.',
  photo:'Ein vollflächiges Fotomotiv mit dunklem Verlauf und unten ausgerichtetem Titel.', product:'Ein zweispaltiges Produktmotiv mit Text, Produktbild und Preis.', profile:'Ein persönliches Profilmotiv mit Avatar, Rolle, Biografie und Website.', event:'Ein Veranstaltungsmotiv mit Titel, Datum und Ort.', stat:'Ein Kennzahlenmotiv mit großer Zahl, Trendanzeige und Beschriftung.', logo:'Ein zentriertes Markenmotiv mit Logo, Wortmarke und optionalem Claim.', terminal:'Ein technisches Motiv mit Wortmarke, Akzentlinie und breiter Versalüberschrift.', editorial:'Ein plakatartiges Motiv mit großer Typografie und blassem Hintergrundwort.', showcase:'Ein Produktmotiv mit Überschrift, Browserrahmen und Dashboard-Ansicht.', shiori:'Ein helles, reduziertes Motiv mit orangefarbenem Logo, Titel und Beschreibung.', owner:'Ein helles Motiv mit Label, Überschrift und drei abgerundeten Fotos.'
};
export const componentIndex = components.map((component)=>({...component,description:descriptions[component.name]??component.description}));
export const sections = [
  { id: 'guides', label: 'Anleitungen', href: '/docs/', count: guides.length },
  { id: 'components', label: 'Komponenten', href: '/components/', count: componentIndex.length }
] as const;
export function sectionOf(path: string) { return path.startsWith('/components') ? 'components' : 'guides'; }
export const searchIndex = [
  ...guides.map((g) => ({ title:g.title, subtitle:g.hint, section:'Anleitungen', href:`/docs/${g.slug}/`, keywords:`${g.title} ${g.hint}`.toLowerCase() })),
  ...componentIndex.map((c) => ({ title:c.title, subtitle:c.description, section:'Komponenten', href:`/components/${c.name}/`, keywords:`${c.name} ${c.title} ${c.description}`.toLowerCase() }))
];
