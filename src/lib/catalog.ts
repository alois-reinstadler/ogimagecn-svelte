import Blog from './components/Blog.svelte';
import Changelog from './components/Changelog.svelte';
import Editorial from './components/Editorial.svelte';
import Event from './components/Event.svelte';
import Grid from './components/Grid.svelte';
import Logo from './components/Logo.svelte';
import Owner from './components/Owner.svelte';
import Photo from './components/Photo.svelte';
import Product from './components/Product.svelte';
import Profile from './components/Profile.svelte';
import Quote from './components/Quote.svelte';
import ShadcnRegistry1 from './components/ShadcnRegistry1.svelte';
import ShadcnRegistry2 from './components/ShadcnRegistry2.svelte';
import ShadcnRegistry3 from './components/ShadcnRegistry3.svelte';
import ShadcnRegistry4 from './components/ShadcnRegistry4.svelte';
import ShadcnRegistry5 from './components/ShadcnRegistry5.svelte';
import ShadcnRegistry6 from './components/ShadcnRegistry6.svelte';
import Shiori from './components/Shiori.svelte';
import Showcase from './components/Showcase.svelte';
import Simple from './components/Simple.svelte';
import Stat from './components/Stat.svelte';
import Terminal from './components/Terminal.svelte';
import {
  blogDefaults, changelogDefaults, editorialDefaults, eventDefaults, gridDefaults, logoDefaults,
  ownerDefaults, photoDefaults, productDefaults, profileDefaults, quoteDefaults,
  shadcnRegistry1Defaults, shadcnRegistry2Defaults, shadcnRegistry3Defaults,
  shadcnRegistry4Defaults, shadcnRegistry5Defaults, shadcnRegistry6Defaults,
  shioriDefaults, showcaseDefaults, simpleDefaults, statDefaults, terminalDefaults
} from './registry.js';

export const registry = [
  { name: 'simple', title: 'Simple', category: 'product', component: Simple, defaults: simpleDefaults },
  { name: 'grid', title: 'Grid', category: 'content', component: Grid, defaults: gridDefaults },
  { name: 'blog', title: 'Blog', category: 'content', component: Blog, defaults: blogDefaults },
  { name: 'changelog', title: 'Changelog', category: 'product', component: Changelog, defaults: changelogDefaults },
  { name: 'quote', title: 'Quote', category: 'content', component: Quote, defaults: quoteDefaults },
  { name: 'shadcn-registry-1', title: 'Shadcn Registry 1', category: 'shadcn-registry', component: ShadcnRegistry1, defaults: shadcnRegistry1Defaults },
  { name: 'shadcn-registry-2', title: 'Shadcn Registry 2', category: 'shadcn-registry', component: ShadcnRegistry2, defaults: shadcnRegistry2Defaults },
  { name: 'shadcn-registry-3', title: 'Shadcn Registry 3', category: 'shadcn-registry', component: ShadcnRegistry3, defaults: shadcnRegistry3Defaults },
  { name: 'shadcn-registry-4', title: 'Shadcn Registry 4', category: 'shadcn-registry', component: ShadcnRegistry4, defaults: shadcnRegistry4Defaults },
  { name: 'shadcn-registry-5', title: 'Shadcn Registry 5', category: 'shadcn-registry', component: ShadcnRegistry5, defaults: shadcnRegistry5Defaults },
  { name: 'shadcn-registry-6', title: 'Shadcn Registry 6', category: 'shadcn-registry', component: ShadcnRegistry6, defaults: shadcnRegistry6Defaults },
  { name: 'photo', title: 'Photo', category: 'content', component: Photo, defaults: photoDefaults },
  { name: 'product', title: 'Product', category: 'product', component: Product, defaults: productDefaults },
  { name: 'profile', title: 'Profile', category: 'content', component: Profile, defaults: profileDefaults },
  { name: 'event', title: 'Event', category: 'product', component: Event, defaults: eventDefaults },
  { name: 'stat', title: 'Stat', category: 'content', component: Stat, defaults: statDefaults },
  { name: 'logo', title: 'Logo', category: 'product', component: Logo, defaults: logoDefaults },
  { name: 'terminal', title: 'Terminal', category: 'content', component: Terminal, defaults: terminalDefaults },
  { name: 'editorial', title: 'Editorial', category: 'content', component: Editorial, defaults: editorialDefaults },
  { name: 'showcase', title: 'Showcase', category: 'product', component: Showcase, defaults: showcaseDefaults },
  { name: 'shiori', title: 'Shiori', category: 'brand', component: Shiori, defaults: shioriDefaults },
  { name: 'owner', title: 'Owner', category: 'brand', component: Owner, defaults: ownerDefaults }
] as const;

export type RegistryName = (typeof registry)[number]['name'];
export const registryByName = Object.fromEntries(registry.map((entry) => [entry.name, entry])) as {
  [Name in RegistryName]: Extract<(typeof registry)[number], { name: Name }>;
};
export const componentNames = registry.map((entry) => entry.name) as RegistryName[];
