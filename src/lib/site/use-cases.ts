import type { RegistryName } from '../catalog.js';

const jacketImage = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486 486">
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#312e81"/>
      <stop offset="1" stop-color="#7c3aed"/>
    </linearGradient>
    <linearGradient id="jacket" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#f8fafc"/>
      <stop offset="1" stop-color="#cbd5e1"/>
    </linearGradient>
  </defs>
  <rect width="486" height="486" rx="28" fill="url(#background)"/>
  <circle cx="392" cy="86" r="78" fill="#ffffff" fill-opacity=".08"/>
  <circle cx="74" cy="414" r="112" fill="#ffffff" fill-opacity=".06"/>
  <path d="M178 132l44-26h42l44 26 68 72-48 44-30-31v170H188V217l-30 31-48-44 68-72z" fill="url(#jacket)" stroke="#ffffff" stroke-opacity=".55" stroke-width="4" stroke-linejoin="round"/>
  <path d="M222 106c2 26 40 26 42 0M243 129v258M188 284h110" fill="none" stroke="#64748b" stroke-width="5" stroke-linecap="round"/>
  <path d="M214 284l-8 48h37M272 284l8 48h-37" fill="none" stroke="#94a3b8" stroke-width="4" stroke-linejoin="round"/>
  <rect x="258" y="164" width="25" height="18" rx="5" fill="#6366f1"/>
</svg>`)}`;

export interface ShowcaseUseCase {
  name: 'commerce' | 'release' | 'event' | 'metric';
  eyebrow: string;
  title: string;
  description: string;
  componentName: RegistryName;
  props: Record<string, string | string[]>;
}

export const showcaseUseCases: readonly ShowcaseUseCase[] = [
  {
    name: 'commerce',
    eyebrow: 'Commerce',
    title: 'Produktdaten werden Kampagnenbilder',
    description: 'Preis, Verfügbarkeit und Produktbild direkt aus Katalog- oder CMS-Daten rendern.',
    componentName: 'product',
    props: {
      brand: 'Nordgrat',
      title: 'Alpine Trail Shell',
      description: 'Wetterfest. Reparierbar. Bereit für den nächsten Aufstieg.',
      price: '€ 189,90',
      image: jacketImage
    }
  },
  {
    name: 'release',
    eyebrow: 'Automation',
    title: 'Jedes Release erklärt sich selbst',
    description: 'Version, Datum und Highlights aus der Release-Pipeline in ein teilbares Bild übersetzen.',
    componentName: 'changelog',
    props: {
      brand: 'Nordgrat Cloud',
      version: 'v3.2.0',
      date: '31. August 2026',
      title: 'Release bereit',
      items: ['Schnellere Builds', 'Neue Svelte-Adapter', 'Präzisere Diagnosen']
    }
  },
  {
    name: 'event',
    eyebrow: 'Lokalisierung',
    title: 'Lokale Termine, korrekt formatiert',
    description: 'Sprache, Zeitzone und Markenschrift kontrolliert am Server zusammenführen.',
    componentName: 'event',
    props: {
      brand: 'Svelte Vienna',
      label: 'Live in Wien',
      title: 'Svelte Summit Austria',
      date: '17. September 2026 · 18:30',
      location: 'MuseumsQuartier, Wien'
    }
  },
  {
    name: 'metric',
    eyebrow: 'Personalisierung',
    title: 'Kennzahlen, die geteilt werden wollen',
    description: 'Meilensteine und Jahresrückblicke reproduzierbar für viele Konten erzeugen.',
    componentName: 'stat',
    props: {
      brand: 'Klarblick',
      label: 'Umsatz im August',
      value: '€ 346k',
      trend: '+18,4%',
      caption: 'Wachstum gegenüber dem Vormonat.'
    }
  }
];

export const showcaseUseCaseByName = Object.fromEntries(
  showcaseUseCases.map((useCase) => [useCase.name, useCase])
) as Record<ShowcaseUseCase['name'], ShowcaseUseCase>;

export const componentExampleCode: Partial<Record<RegistryName, string>> = {
  product: `const product = await catalog.getProduct(params.slug);

const { png } = await renderImage(Product, {
  brand: 'Nordgrat',
  title: product.name,
  description: product.shortDescription,
  price: new Intl.NumberFormat('de-AT', {
    style: 'currency',
    currency: product.currency
  }).format(product.price),
  image: product.imageUrl
});`,
  changelog: `const release = await getLatestRelease();

const { png } = await renderImage(Changelog, {
  brand: 'Nordgrat Cloud',
  version: release.version,
  date: release.publishedAt,
  title: 'Release bereit',
  items: release.highlights
});`,
  event: `const event = await getEvent(params.slug);

const { png } = await renderImage(Event, {
  brand: event.organizer,
  label: 'Live in Wien',
  title: event.title,
  date: formatInTimeZone(event.startsAt, 'Europe/Vienna'),
  location: event.venue
});`,
  stat: `const account = await getAccount(params.accountId);

const { png } = await renderImage(Stat, {
  brand: account.name,
  label: 'Umsatz im August',
  value: formatCurrency(account.revenue, 'de-AT'),
  trend: formatPercent(account.growth, 'de-AT'),
  caption: 'Wachstum gegenüber dem Vormonat.'
});`
};
