import type { RegistryName } from '../catalog.js';

export interface ExampleAssetBinding {
  prop: string;
  file?: string;
  files?: string[];
}

export interface ComponentShowcase {
  name: RegistryName;
  title: string;
  category: string;
  description: string;
  props: Record<string, string | string[]>;
  assets?: ExampleAssetBinding[];
}

export const componentShowcases: readonly ComponentShowcase[] = [
  {
    name: 'simple',
    title: 'Feature-Ankündigung',
    category: 'Produktmarketing',
    description: 'Eine klare Produktneuigkeit für Launches, Wartelisten und große Funktionsupdates.',
    props: {
      brand: 'Klarblick',
      label: 'Neu im Produkt',
      title: 'Forecasts, die dein Team wirklich versteht',
      description: 'Szenarien vergleichen, Risiken früher sehen und gemeinsam entscheiden.'
    }
  },
  {
    name: 'grid',
    title: 'Technischer Deep Dive',
    category: 'Developer Content',
    description: 'Für Architekturartikel, Engineering-Entscheidungen und technische Fallstudien.',
    props: {
      brand: 'Nordgrat Engineering',
      title: 'Wie wir 40 % Build-Zeit eingespart haben',
      description: 'Messdaten, Fehlversuche und die Architektur hinter unserem schnelleren Svelte-Monorepo.'
    }
  },
  {
    name: 'blog',
    title: 'Editorialer Artikel',
    category: 'Publishing',
    description: 'Ein redaktionelles Motiv mit Autorin, Ressort, Zusammenfassung und Lesedauer.',
    props: {
      brand: 'Aufbau',
      category: 'Arbeitskultur',
      title: 'Warum kleine Teams bessere Systeme bauen',
      excerpt: 'Was sich ändert, wenn Verantwortung nicht zwischen Abteilungen verloren geht.',
      author: 'Mara Berger',
      meta: '31. August 2026 · 8 Min.'
    },
    assets: [{ prop: 'avatar', file: 'founder-mara-berger.jpg' }]
  },
  {
    name: 'changelog',
    title: 'Release-Notizen',
    category: 'Produktupdates',
    description: 'Version, Veröffentlichungsdatum und die wichtigsten Änderungen aus einer Release-Pipeline.',
    props: {
      brand: 'Nordgrat Cloud',
      version: 'v3.2.0',
      date: '31. August 2026',
      title: 'Release bereit',
      items: ['Schnellere Builds', 'Neue Svelte-Adapter', 'Präzisere Diagnosen']
    }
  },
  {
    name: 'quote',
    title: 'Kundenstimme',
    category: 'Social Proof',
    description: 'Ein glaubwürdiges Testimonial für Fallstudien, Launches und Vertriebsinhalte.',
    props: {
      quote: 'Seit der Umstellung kommen Reservierungen und Stammgäste endlich aus demselben System.',
      author: 'Lukas Kern',
      handle: 'Inhaber · Gasthaus Kern'
    },
    assets: [{ prop: 'avatar', file: 'restaurant-owner.jpg' }]
  },
  {
    name: 'shadcn-registry-1',
    title: 'Open-Source-Projekt',
    category: 'Developer Tools',
    description: 'Ein Repository- oder Registry-Launch mit URL, Nutzenversprechen und Projektmerkmalen.',
    props: {
      name: 'formwerk',
      url: 'formwerk.dev',
      description: 'Typisierte Formulare für Svelte, vom Schema bis zur barrierefreien Oberfläche.',
      items: ['MIT', 'Svelte 5', '2,4k Stars']
    }
  },
  {
    name: 'shadcn-registry-2',
    title: 'Feature-Kollektion',
    category: 'Produktmarketing',
    description: 'Mehrere zusammengehörige Fähigkeiten als kuratierte Kollektion präsentieren.',
    props: {
      name: 'Klarblick',
      category: 'Analytics',
      title: 'Ein ruhiger Ort für alle wichtigen Geschäftskennzahlen',
      items: ['Forecasts', 'Berichte', 'Ziele'],
      accent: '#2563eb'
    }
  },
  {
    name: 'shadcn-registry-3',
    title: 'Kampagnen-Headline',
    category: 'Kampagne',
    description: 'Ein plakatives Leitmotiv für Initiativen, Manifestos und große Markenbotschaften.',
    props: {
      title: 'Eine Stadt, die im Sommer atmen kann',
      credit: 'Eine Initiative von Wien morgen',
      ghost: 'KLIMA'
    }
  },
  {
    name: 'shadcn-registry-4',
    title: 'Developer-Tool-Launch',
    category: 'Developer Tools',
    description: 'Ein fokussiertes Launch-Motiv für CLIs, SDKs und Werkzeuge mit einer klaren URL.',
    props: {
      name: 'tempo',
      title: 'Lokale Entwicklungsumgebungen, die in Sekunden bereit sind',
      url: 'tempo.dev'
    }
  },
  {
    name: 'shadcn-registry-5',
    title: 'Marketplace-Angebot',
    category: 'Commerce',
    description: 'Ein digitales Produkt oder Template mit Angebotsname und kompaktem Stack-Versprechen.',
    props: {
      name: 'Blockhaus',
      title: 'SvelteKit Commerce Starter',
      description: 'Checkout, Kundenkonto, Suche und CMS — produktionsbereit zusammengesetzt.'
    }
  },
  {
    name: 'shadcn-registry-6',
    title: 'API-Dokumentation',
    category: 'Developer Tools',
    description: 'Ein reduziertes Motiv für API-Bereiche, Integrationsseiten und technische Dokumentation.',
    props: {
      brand: 'Pulse API',
      title: 'Zahlungen integrieren, ohne den Checkout neu zu erfinden',
      description: 'Typisierte Endpunkte, Testmodus und Webhooks mit nachvollziehbaren Fehlern.'
    }
  },
  {
    name: 'photo',
    title: 'Immobilien-Inserat',
    category: 'Marktplatz',
    description: 'Ein bildstarkes Inserat für Immobilien, Reisen und andere ortsgebundene Angebote.',
    props: {
      brand: 'Nordraum Immobilien',
      label: 'Innsbruck · Hungerburg',
      title: 'Architektenhaus mit Blick über das Inntal'
    },
    assets: [{ prop: 'image', file: 'alpine-cabin.jpg' }]
  },
  {
    name: 'product',
    title: 'Produkt-Launch',
    category: 'Commerce',
    description: 'Ein konkretes Produkt mit Packshot, Preis, Marke und kaufentscheidendem Nutzen.',
    props: {
      brand: 'Nordgrat',
      title: 'Alpine Trail Shell',
      description: 'Wetterfest. Reparierbar. Bereit für den nächsten Aufstieg.',
      price: '€ 189,90'
    },
    assets: [{ prop: 'image', file: 'alpine-shell.jpg' }]
  },
  {
    name: 'profile',
    title: 'Founder-Profil',
    category: 'Personal Brand',
    description: 'Eine Person mit Rolle, Perspektive und glaubwürdigem Portrait vorstellen.',
    props: {
      name: 'Mara Berger',
      role: 'Gründerin von Kreiswerk',
      bio: 'Entwickelt Kreislaufsoftware für produzierende Unternehmen und schreibt über bessere Klimadaten.',
      website: 'kreiswerk.at'
    },
    assets: [{ prop: 'avatar', file: 'founder-mara-berger.jpg' }]
  },
  {
    name: 'event',
    title: 'Event-Ankündigung',
    category: 'Community',
    description: 'Titel, Format, Termin und Ort für Konferenzen, Webinare oder lokale Treffen.',
    props: {
      brand: 'Svelte Vienna',
      label: 'Live in Wien',
      title: 'Svelte Summit Austria',
      date: '17. September 2026 · 18:30',
      location: 'MuseumsQuartier, Wien'
    }
  },
  {
    name: 'stat',
    title: 'KPI-Meilenstein',
    category: 'Datenstory',
    description: 'Eine einzelne Kennzahl mit Entwicklung und Kontext für Reports oder Social Updates.',
    props: {
      brand: 'Klarblick',
      label: 'Umsatz im August',
      value: '€ 346k',
      trend: '+18,4%',
      caption: 'Wachstum gegenüber dem Vormonat.'
    }
  },
  {
    name: 'logo',
    title: 'Marken-Launch',
    category: 'Brand',
    description: 'Eine neue Marke, Initiative oder Produktlinie bewusst auf ihren Namen reduzieren.',
    props: {
      brand: 'Kreiswerk',
      monogram: 'K',
      tagline: 'Materialkreisläufe, die sich rechnen',
      background: '#10231c'
    }
  },
  {
    name: 'terminal',
    title: 'CLI-Release',
    category: 'Developer Tools',
    description: 'Ein technisches Release mit prägnanter Botschaft und direkt kopierbarem Befehl.',
    props: {
      brand: 'tempo',
      title: 'Preview environments in seconds',
      caption: 'pnpm add -D @tempo/cli'
    }
  },
  {
    name: 'editorial',
    title: 'Magazin-Cover',
    category: 'Publishing',
    description: 'Ein typografisches Titelmotiv für Essays, Ausgaben und redaktionelle Schwerpunkte.',
    props: {
      brand: 'Zwischenraum',
      kicker: 'Essay',
      title: 'Wem gehört die Stadt?',
      meta: 'Ausgabe 04',
      ghost: 'STADT'
    }
  },
  {
    name: 'showcase',
    title: 'SaaS-Produktvorschau',
    category: 'Produktmarketing',
    description: 'Eine Softwareoberfläche zusammen mit ihrem wichtigsten Ergebnisversprechen zeigen.',
    props: {
      title: 'Dein Geschäft auf einen Blick',
      subtitle: 'Umsatz, Liquidität und Ziele in einer ruhigen, gemeinsamen Ansicht.',
      url: 'app.klarblick.at',
      accent: '#2563eb'
    }
  },
  {
    name: 'shiori',
    title: 'Consumer-App-Launch',
    category: 'Produktmarketing',
    description: 'Ein freundliches, reduziertes Launch-Motiv für Apps mit einer einzelnen Kernidee.',
    props: {
      brand: 'Leseliste',
      title: 'Artikel merken. Später wirklich lesen.',
      background: '#faf6f1',
      brandColor: '#1a1a1a',
      titleColor: '#8b5e3c'
    }
  },
  {
    name: 'owner',
    title: 'Restaurant-Kundengeschichte',
    category: 'Customer Story',
    description: 'Eine echte Kundengeschichte mit Person, Produkt und Ort statt einer abstrakten Behauptung.',
    props: {
      brand: 'Gasthaus Kern',
      eyebrow: 'Mehr Direktreservierungen.',
      title: 'Wie ein Wiener Lokal seine Stammgäste zurückgewonnen hat.'
    },
    assets: [{
      prop: 'images',
      files: ['restaurant-owner.jpg', 'restaurant-dish.jpg', 'restaurant-interior.jpg']
    }]
  }
];

export const componentShowcaseByName = Object.fromEntries(
  componentShowcases.map((showcase) => [showcase.name, showcase])
) as Record<RegistryName, ComponentShowcase>;

export interface FeaturedUseCase extends ComponentShowcase {
  slug: 'commerce' | 'release' | 'event' | 'metric';
}

const featured: Array<{ slug: FeaturedUseCase['slug']; name: RegistryName }> = [
  { slug: 'commerce', name: 'product' },
  { slug: 'release', name: 'changelog' },
  { slug: 'event', name: 'event' },
  { slug: 'metric', name: 'stat' }
];

export const showcaseUseCases: readonly FeaturedUseCase[] = featured.map(({ slug, name }) => ({
  ...componentShowcaseByName[name],
  slug
}));

export const showcaseUseCaseByName = Object.fromEntries(
  showcaseUseCases.map((useCase) => [useCase.slug, useCase])
) as Record<FeaturedUseCase['slug'], FeaturedUseCase>;

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
