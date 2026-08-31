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
    title: 'Feature announcement',
    category: 'Product marketing',
    description: 'A clear product update for launches, waitlists, and major feature releases.',
    props: {
      brand: 'Clearview',
      label: 'New in the product',
      title: 'Forecasts your whole team can understand',
      description: 'Compare scenarios, spot risks earlier, and make decisions together.'
    }
  },
  {
    name: 'grid',
    title: 'Technical deep dive',
    category: 'Developer Content',
    description: 'For architecture articles, engineering decisions, and technical case studies.',
    props: {
      brand: 'North Ridge Engineering',
      title: 'How we cut build times by 40%',
      description: 'Measurements, failed attempts, and the architecture behind our faster Svelte monorepo.'
    }
  },
  {
    name: 'blog',
    title: 'Editorial article',
    category: 'Publishing',
    description: 'An editorial image with author, section, summary, and reading time.',
    props: {
      brand: 'Framework',
      category: 'Work culture',
      title: 'Why small teams build better systems',
      excerpt: 'What changes when ownership no longer gets lost between departments.',
      author: 'Mara Bennett',
      meta: 'August 31, 2026 · 8 min'
    },
    assets: [{ prop: 'avatar', file: 'founder-mara-berger.jpg' }]
  },
  {
    name: 'changelog',
    title: 'Release notes',
    category: 'Product updates',
    description: 'Version, publication date, and the most important changes from a release pipeline.',
    props: {
      brand: 'North Ridge Cloud',
      version: 'v3.2.0',
      date: 'August 31, 2026',
      title: 'Release ready',
      items: ['Faster builds', 'New Svelte adapters', 'More precise diagnostics']
    }
  },
  {
    name: 'quote',
    title: 'Customer testimonial',
    category: 'Social Proof',
    description: 'A credible testimonial for case studies, launches, and sales content.',
    props: {
      quote: 'Since the switch, reservations and repeat guests finally come through the same system.',
      author: 'Luke Carter',
      handle: 'Owner · Carter House'
    },
    assets: [{ prop: 'avatar', file: 'restaurant-owner.jpg' }]
  },
  {
    name: 'shadcn-registry-1',
    title: 'Open-source project',
    category: 'Developer Tools',
    description: 'A repository or registry launch with a URL, value proposition, and project highlights.',
    props: {
      name: 'formcraft',
      url: 'formcraft.dev',
      description: 'Typed forms for Svelte, from schema to accessible interface.',
      items: ['MIT', 'Svelte 5', '2,4k Stars']
    }
  },
  {
    name: 'shadcn-registry-2',
    title: 'Feature collection',
    category: 'Product marketing',
    description: 'Present a group of related capabilities as a curated collection.',
    props: {
      name: 'Clearview',
      category: 'Analytics',
      title: 'One calm place for every important business metric',
      items: ['Forecasts', 'Reports', 'Goals'],
      accent: '#2563eb'
    }
  },
  {
    name: 'shadcn-registry-3',
    title: 'Campaign headline',
    category: 'Campaign',
    description: 'A bold key message for initiatives, manifestos, and major brand campaigns.',
    props: {
      title: 'A city that can breathe in summer',
      credit: 'An initiative by Tomorrow London',
      ghost: 'CLIMATE'
    }
  },
  {
    name: 'shadcn-registry-4',
    title: 'Developer tool launch',
    category: 'Developer Tools',
    description: 'A focused launch image for CLIs, SDKs, and developer tools with a clear URL.',
    props: {
      name: 'tempo',
      title: 'Local development environments ready in seconds',
      url: 'tempo.dev'
    }
  },
  {
    name: 'shadcn-registry-5',
    title: 'Marketplace listing',
    category: 'Commerce',
    description: 'A digital product or template with an offer name and a concise stack promise.',
    props: {
      name: 'Blockhouse',
      title: 'SvelteKit Commerce Starter',
      description: 'Checkout, customer accounts, search, and CMS — assembled for production.'
    }
  },
  {
    name: 'shadcn-registry-6',
    title: 'API documentation',
    category: 'Developer Tools',
    description: 'A minimal image for API sections, integration pages, and technical documentation.',
    props: {
      brand: 'Pulse API',
      title: 'Integrate payments without rebuilding checkout',
      description: 'Typed endpoints, test mode, and webhooks with actionable errors.'
    }
  },
  {
    name: 'photo',
    title: 'Property listing',
    category: 'Marketplace',
    description: 'An image-led listing for real estate, travel, and other location-based offers.',
    props: {
      brand: 'Northspace Realty',
      label: 'Aspen · Red Mountain',
      title: 'Architect-designed home with a mountain view'
    },
    assets: [{ prop: 'image', file: 'alpine-cabin.jpg' }]
  },
  {
    name: 'product',
    title: 'Product launch',
    category: 'Commerce',
    description: 'A real product with a packshot, price, brand, and purchase-driving benefit.',
    props: {
      brand: 'North Ridge',
      title: 'Alpine Trail Shell',
      description: 'Weatherproof. Repairable. Ready for the next ascent.',
      price: '$189.90'
    },
    assets: [{ prop: 'image', file: 'alpine-shell.jpg' }]
  },
  {
    name: 'profile',
    title: 'Founder profile',
    category: 'Personal Brand',
    description: 'Introduce a person with their role, perspective, and a credible portrait.',
    props: {
      name: 'Mara Bennett',
      role: 'Founder of Loopworks',
      bio: 'Builds circular economy software for manufacturers and writes about better climate data.',
      website: 'loopworks.com'
    },
    assets: [{ prop: 'avatar', file: 'founder-mara-berger.jpg' }]
  },
  {
    name: 'event',
    title: 'Event announcement',
    category: 'Community',
    description: 'Title, format, date, and location for conferences, webinars, or local meetups.',
    props: {
      brand: 'Svelte London',
      label: 'Live in London',
      title: 'Svelte Summit UK',
      date: 'September 17, 2026 · 6:30 PM',
      location: 'Barbican Centre, London'
    }
  },
  {
    name: 'stat',
    title: 'KPI milestone',
    category: 'Data story',
    description: 'A single metric with trend and context for reports or social updates.',
    props: {
      brand: 'Clearview',
      label: 'August revenue',
      value: '$346k',
      trend: '+18.4%',
      caption: 'Growth compared with the previous month.'
    }
  },
  {
    name: 'logo',
    title: 'Brand launch',
    category: 'Brand',
    description: 'Distill a new brand, initiative, or product line down to its name.',
    props: {
      brand: 'Loopworks',
      monogram: 'L',
      tagline: 'Circular materials that pay off',
      background: '#10231c'
    }
  },
  {
    name: 'terminal',
    title: 'CLI release',
    category: 'Developer Tools',
    description: 'A technical release with a concise message and copy-ready command.',
    props: {
      brand: 'tempo',
      title: 'Preview environments in seconds',
      caption: 'pnpm add -D @tempo/cli'
    }
  },
  {
    name: 'editorial',
    title: 'Magazine cover',
    category: 'Publishing',
    description: 'A typographic cover for essays, issues, and editorial themes.',
    props: {
      brand: 'Between Spaces',
      kicker: 'Essay',
      title: 'Who owns the city?',
      meta: 'Issue 04',
      ghost: 'CITY'
    }
  },
  {
    name: 'showcase',
    title: 'SaaS product preview',
    category: 'Product marketing',
    description: 'Show a software interface alongside its most important outcome.',
    props: {
      title: 'Your business at a glance',
      subtitle: 'Revenue, cash flow, and goals in one calm, shared view.',
      url: 'app.clearview.com',
      accent: '#2563eb'
    }
  },
  {
    name: 'shiori',
    title: 'Consumer app launch',
    category: 'Product marketing',
    description: 'A friendly, minimal launch image for apps with a single core idea.',
    props: {
      brand: 'Reading List',
      title: 'Save articles. Actually read them later.',
      background: '#faf6f1',
      brandColor: '#1a1a1a',
      titleColor: '#8b5e3c'
    }
  },
  {
    name: 'owner',
    title: 'Restaurant customer story',
    category: 'Customer Story',
    description: 'A real customer story with a person, product, and place instead of an abstract claim.',
    props: {
      brand: 'Carter House',
      eyebrow: 'More direct reservations.',
      title: 'How a London restaurant won back its regulars.'
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
  brand: 'North Ridge',
  title: product.name,
  description: product.shortDescription,
  price: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency
  }).format(product.price),
  image: product.imageUrl
});`,
  changelog: `const release = await getLatestRelease();

const { png } = await renderImage(Changelog, {
  brand: 'North Ridge Cloud',
  version: release.version,
  date: release.publishedAt,
  title: 'Release ready',
  items: release.highlights
});`,
  event: `const event = await getEvent(params.slug);

const { png } = await renderImage(Event, {
  brand: event.organizer,
  label: 'Live in London',
  title: event.title,
  date: formatInTimeZone(event.startsAt, 'Europe/Vienna'),
  location: event.venue
});`,
  stat: `const account = await getAccount(params.accountId);

const { png } = await renderImage(Stat, {
  brand: account.name,
  label: 'August revenue',
  value: formatCurrency(account.revenue, 'en-US'),
  trend: formatPercent(account.growth, 'en-US'),
  caption: 'Growth compared with the previous month.'
});`
};
