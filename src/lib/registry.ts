import type { Component, Snippet } from 'svelte';

export interface ComposableOgProps {
  /** Absolute overlay rendered last, and therefore above the default Satori layout. */
  overlay?: Snippet;
}

export function resolveProps<T extends Record<string, unknown>>(defaults: T, provided: Partial<T>): T {
  const resolved = { ...defaults };
  for (const [key, value] of Object.entries(provided)) {
    if (value !== undefined) resolved[key as keyof T] = value as T[keyof T];
  }
  return resolved;
}

export interface SimpleProps extends ComposableOgProps {
  label?: string;
  title?: string;
  description?: string;
  brand?: string;
  logo?: string;
}

export const simpleDefaults = {
  brand: 'ogimagecn',
  description: 'A shadcn registry of social card components you can copy, paste, and ship.',
  label: 'Open Graph',
  logo: '',
  title: 'Beautiful OG images, built on Satori'
} satisfies Required<Omit<SimpleProps, 'overlay'>>;

export interface BlogProps extends ComposableOgProps {
  category?: string; title?: string; excerpt?: string; author?: string; meta?: string;
  avatar?: string; brand?: string; logo?: string;
}
export const blogDefaults = {
  author: 'Ada Lovelace', avatar: '', brand: 'ogimagecn', category: 'Engineering',
  excerpt: 'A deep dive into Satori, the next/og runtime, and shipping fast cards.', logo: '',
  meta: 'Jun 5, 2026 · 6 min read', title: 'How we generate social images at the edge'
} satisfies Required<Omit<BlogProps, 'overlay'>>;

export interface ChangelogProps extends ComposableOgProps {
  version?: string; date?: string; title?: string; items?: string[]; brand?: string; logo?: string;
}
export const changelogDefaults = {
  brand: 'ogimagecn', date: 'June 2026',
  items: ['Seven new OG image components', 'Live in-browser previews', 'One-line shadcn install'],
  logo: '', title: "What's new", version: 'v2.0'
} satisfies Required<Omit<ChangelogProps, 'overlay'>>;

export interface EditorialProps extends ComposableOgProps {
  kicker?: string; title?: string; meta?: string; ghost?: string; brand?: string; logo?: string;
}
export const editorialDefaults = {
  brand: 'ogimagecn', ghost: '', kicker: 'Essay', logo: '', meta: 'Issue 04',
  title: 'Designing at the edge of the canvas'
} satisfies Required<Omit<EditorialProps, 'overlay'>>;

export interface EventProps extends ComposableOgProps {
  label?: string; brand?: string; title?: string; date?: string; location?: string; logo?: string;
}
export const eventDefaults = {
  brand: 'ogimagecn', date: 'Jun 5, 2026 · 10:00 AM PT', label: 'Live Event', location: 'Online',
  logo: '', title: 'Shipping beautiful OG images at scale'
} satisfies Required<Omit<EventProps, 'overlay'>>;

export interface GridProps extends ComposableOgProps {
  title?: string; description?: string; brand?: string; logo?: string;
}
export const gridDefaults = {
  brand: 'ogimagecn', description: 'Composable components powered by Satori and the next/og runtime.',
  logo: '', title: 'Build your own OG images'
} satisfies Required<Omit<GridProps, 'overlay'>>;

export interface LogoProps extends ComposableOgProps {
  brand?: string; tagline?: string; monogram?: string; background?: string; logo?: string;
}
export const logoDefaults = {
  background: '#09090b', brand: 'ogimagecn', logo: '', monogram: '',
  tagline: 'Open Graph images, built on Satori'
} satisfies Required<Omit<LogoProps, 'overlay'>>;

export interface OwnerProps extends ComposableOgProps {
  eyebrow?: string; title?: string; brand?: string; images?: string[]; logo?: string;
}
export const ownerDefaults = {
  brand: 'Owner', eyebrow: 'Meet Owner.',
  images: [
    'https://picsum.photos/id/1005/400/400',
    'https://picsum.photos/id/1012/400/400',
    'https://picsum.photos/id/1025/400/400'
  ],
  logo: 'https://cdn.prod.website-files.com/69b9330c8b70142e4e5f7d3c/69df6b6abf59b8c2317f7635_favicon-dark.png',
  title: 'We make online growth easy for restaurants.'
} satisfies Required<Omit<OwnerProps, 'overlay'>>;

export interface PhotoProps extends ComposableOgProps {
  image?: string; label?: string; title?: string; brand?: string; logo?: string;
}
export const photoDefaults = {
  brand: 'ogimagecn', image: '', label: 'Travel', logo: '', title: 'Chasing light across the northern coast'
} satisfies Required<Omit<PhotoProps, 'overlay'>>;

export interface ProductProps extends ComposableOgProps {
  brand?: string; title?: string; description?: string; price?: string; image?: string; logo?: string;
}
export const productDefaults = {
  brand: 'ogimagecn', description: 'Copy-paste social cards rendered with next/og.', image: '', logo: '',
  price: '$49', title: 'The OG image toolkit'
} satisfies Required<Omit<ProductProps, 'overlay'>>;

export interface ProfileProps extends ComposableOgProps {
  name?: string; role?: string; bio?: string; avatar?: string; website?: string;
}
export const profileDefaults = {
  avatar: '', bio: 'Building tools for the open web. Writing about design systems, performance, and shipping fast.',
  name: 'Ada Lovelace', role: 'Founder & Engineer', website: 'ada.dev'
} satisfies Required<Omit<ProfileProps, 'overlay'>>;

export interface QuoteProps extends ComposableOgProps {
  quote?: string; author?: string; handle?: string; avatar?: string;
}
export const quoteDefaults = {
  author: 'Grace Hopper', avatar: '', handle: '@gracehopper',
  quote: 'This is hands down the fastest way to ship beautiful OG images.'
} satisfies Required<Omit<QuoteProps, 'overlay'>>;

export interface ShadcnRegistry1Props extends ComposableOgProps {
  name?: string; url?: string; description?: string; logo?: string; items?: string[];
}
export const shadcnRegistry1Defaults = {
  description: 'Beautifully designed components built with Radix UI and Tailwind CSS.',
  items: ['159+ components', 'open source', 'accessible'], logo: '', name: 'ogimagecn', url: 'ui.shadcn.com'
} satisfies Required<Omit<ShadcnRegistry1Props, 'overlay'>>;

export interface ShadcnRegistry2Props extends ComposableOgProps {
  name?: string; category?: string; title?: string; items?: string[]; logo?: string; accent?: string;
}
export const shadcnRegistry2Defaults = {
  accent: '#4f46e5', category: 'Marketing', items: ['Reusable', 'Scalable', 'Composable'], logo: '',
  name: 'ogimagecn', title: 'Animated components crafted for smooth interaction'
} satisfies Required<Omit<ShadcnRegistry2Props, 'overlay'>>;

export interface ShadcnRegistry3Props extends ComposableOgProps {
  title?: string; credit?: string; ghost?: string; logo?: string;
}
export const shadcnRegistry3Defaults = {
  credit: 'Developed By @alaymanguy', ghost: 'LOREM', logo: '',
  title: 'Beautifully designed open source components built with Radix UI and Tailwind CSS for your next project'
} satisfies Required<Omit<ShadcnRegistry3Props, 'overlay'>>;

export interface ShadcnRegistry4Props extends ComposableOgProps {
  name?: string; title?: string; url?: string; logo?: string;
}
export const shadcnRegistry4Defaults = {
  logo: '', name: 'ogimagecn',
  title: 'Discover animated primitives, components, and icons for building expressive, modern UIs',
  url: 'ogimagecn.com'
} satisfies Required<Omit<ShadcnRegistry4Props, 'overlay'>>;

export interface ShadcnRegistry5Props extends ComposableOgProps {
  name?: string; title?: string; description?: string; logo?: string;
}
export const shadcnRegistry5Defaults = {
  description: 'Built with React, Typescript, shadcn/ui, Tailwind CSS, and Motion.', logo: '',
  name: 'ogimagecn', title: 'Modern Next.js Templates'
} satisfies Required<Omit<ShadcnRegistry5Props, 'overlay'>>;

export interface ShadcnRegistry6Props extends ComposableOgProps {
  title?: string; description?: string; brand?: string; logo?: string;
}
export const shadcnRegistry6Defaults = {
  brand: 'ogimagecn', description: 'Composable OG image components built with Satori.', logo: '',
  title: 'Build your own OG images'
} satisfies Required<Omit<ShadcnRegistry6Props, 'overlay'>>;

export interface ShioriProps extends ComposableOgProps {
  background?: string; brand?: string; brandColor?: string; logo?: string; title?: string; titleColor?: string;
}
export const shioriDefaults = {
  background: '#faf6f1', brand: 'Shiori', brandColor: '#1a1a1a', logo: 'https://www.shiori.sh/logo.png',
  title: 'A beautifully simple read-it-later app', titleColor: '#8b7e74'
} satisfies Required<Omit<ShioriProps, 'overlay'>>;

export interface ShowcaseProps extends ComposableOgProps {
  title?: string; subtitle?: string; url?: string; accent?: string;
}
export const showcaseDefaults = {
  accent: '#6366f1', subtitle: 'The dashboard that brings every metric into one calm view.',
  title: 'Run your business smarter', url: 'app.ogimagecn.com'
} satisfies Required<Omit<ShowcaseProps, 'overlay'>>;

export interface StatProps extends ComposableOgProps {
  label?: string; value?: string; caption?: string; trend?: string; brand?: string; logo?: string;
}
export const statDefaults = {
  brand: 'ogimagecn', caption: 'Open Graph images generated with next/og this year.', label: 'Images rendered',
  logo: '', trend: '+24%', value: '10M+'
} satisfies Required<Omit<StatProps, 'overlay'>>;

export interface TerminalProps extends ComposableOgProps {
  brand?: string; title?: string; caption?: string; logo?: string;
}
export const terminalDefaults = {
  brand: 'ogimagecn', caption: 'npx shadcn@latest add ogimagecn', logo: '', title: 'Ship beautiful OG images'
} satisfies Required<Omit<TerminalProps, 'overlay'>>;

export interface RegistryEntry<Props extends Record<string, unknown> = Record<string, unknown>> {
  name: string;
  title: string;
  category: 'brand' | 'content' | 'product' | 'shadcn-registry';
  component: Component<Props>;
  defaults: Omit<Props, 'overlay'>;
}
