# Upstream audit and parity contract

This document is the release checklist for the Svelte 5 port. It describes
what actually exists at the commit pinned in [UPSTREAM_PIN.md](./UPSTREAM_PIN.md),
including orphaned source and stale documentation. The checked-in registry,
component source, component configuration, and generated registry JSON take
precedence over marketing copy.

Upstream source permalinks in this document use commit
[`e1b91b3`](https://github.com/shadcn-labs/ogimagecn/tree/e1b91b3d9e8e8cebe40fb5910e60f076e92aace4).

## Executive inventory

- **22 public OG components** are present in both
  [`registry.json`](https://github.com/shadcn-labs/ogimagecn/blob/e1b91b3d9e8e8cebe40fb5910e60f076e92aace4/registry.json)
  and `public/r/<name>.json`.
- **1 orphan component, `Peggy`,** exists as source but is not in
  `registry.json`, the internal preview registry, generated registry JSON, or
  documentation. It is deliberately classified as unsupported upstream
  experimental source, not as a public component.
- **No separate public template inventory exists.** All 22 public components
  are the reusable templates. There are no `registry:page`, `registry:block`,
  or `registry:theme` items.
- **No OG theme API exists.** Components use fixed palettes, except for the
  explicit color props on Logo, Shiori, Shadcn Registry 2, and Showcase. The
  docs application's `system`, `light`, and `dark` modes (implemented with
  `next-themes` and light/`.dark` CSS variables) are not part of rendered OG
  output.
- Every documented canvas is **1200 by 630 pixels**. Component roots use
  `width: 100%` and `height: 100%`; Photo and Product additionally bake the
  1200x630 or 486x486 image sizes into background layout.
- Public registry items are standalone React `.tsx` files. They declare **no
  npm `dependencies`, no `registryDependencies`, no utility files, no fonts,
  and no asset files** in their generated item JSON.
- Upstream is a private Next.js application (`ogimagecn@0.1.0`), not a
  published component package. Its public component surface is copy-owned
  shadcn source, not package subpath exports.
- The upstream README still says “7 OG components”; this is stale and must not
  override the 22 registry entries.

## Public component and visual inventory

All public components render a 1200x630 card when used as documented. “Marker”
is a region that should be asserted in the final SVG and PNG, not merely in
serialized Svelte/renderer input.

| Category | Public item / export | Visual contract and final-image marker | Palette / variable theme |
| --- | --- | --- | --- |
| Product | `simple` / `Simple` | Centered uppercase label pill, responsive-size centered title, description, bottom brand mark | Near-black `#09090b`, purple `#7c3aed` radial glow |
| Content | `grid` / `Grid` | Four dashed inset frame lines, left title/description block, bottom-right brand | Black `#0a0a0a`, stone gray dashed grid, white text |
| Content | `blog` / `Blog` | Violet category pill, headline/excerpt, lower-left author row, upper-right brand | White, violet `#7c3aed`, zinc text |
| Product | `changelog` / `Changelog` | Emerald version pill/date, title, at most four check-mark rows, upper-right brand | Black, emerald `#34d399` radial glow |
| Content | `quote` / `Quote` | Large pink opening quote, quote text, avatar/initial author row | Zinc `#18181b`, pink `#f472b6` |
| Shadcn Registry | `shadcn-registry-1` / `ShadcnRegistry1` | Top identity/URL, oversized URL, description, optional tag badges | Near-black, cyan `#22d3ee`, muted warm/cool radial fields |
| Shadcn Registry | `shadcn-registry-2` / `ShadcnRegistry2` | Logo/name/category header, centered body title, dot-separated tags | White plus `accent` (default `#4f46e5`) |
| Shadcn Registry | `shadcn-registry-3` / `ShadcnRegistry3` | Large title/optional credit, 160px circular badge, huge faint ghost word behind | Black, white, blue/cyan fallback badge |
| Shadcn Registry | `shadcn-registry-4` / `ShadcnRegistry4` | Centered logo/name, alternating gray/white title words, optional URL | Black with subtle white radial field |
| Shadcn Registry | `shadcn-registry-5` / `ShadcnRegistry5` | Four dashed inset frame lines; centered logo/name, title, optional description | `#fafafa`, black/zinc text |
| Shadcn Registry | `shadcn-registry-6` / `ShadcnRegistry6` | Four solid inset frame lines, upper-left identity, ruled lower title/description | Pure black, zinc rules/text |
| Content | `photo` / `Photo` | Full-bleed image or blue-purple fallback, dark vertical scrim, bottom label/title/brand | Image-dependent; fallback `#0f172a` to `#7c3aed` |
| Product | `product` / `Product` | Left identity/copy/price pill and 486px rounded product panel on right | Near-black, indigo `#6366f1` to purple fallback |
| Content | `profile` / `Profile` | 300px avatar or initials, name/rose role/bio, website pill | Zinc `#18181b`, rose `#f43f5e` radial glow |
| Product | `event` / `Event` | Amber live pill, upper-right brand, title, calendar/date/location footer | Black, amber `#f59e0b` radial glow |
| Content | `stat` / `Stat` | Label, 200px metric, optional green trend pill/icon, caption, bottom brand | Near-black, green `#22c55e` radial glow |
| Product | `logo` / `Logo` | Centered 140px logo/monogram tile, 96px wordmark, optional tagline | `background`; hex values add a purple radial field |
| Content | `terminal` / `Terminal` | Upper identity; lower wide, uppercase title and optional command pill | Black, green `#22c55e` |
| Content | `editorial` / `Editorial` | Rose kicker, oversized display title, enormous faint ghost word, ruled footer | Cream `#f5f1e9`, rose `#e11d48` |
| Product | `showcase` / `Showcase` | Centered heading and a 1000px faux browser/dashboard with traffic lights and chart | Near-black plus `accent` (gallery default `#6366f1`) |
| Brand | `shiori` / `Shiori` | 96px circular logo at upper-left and bottom three-column brand/title layout | Fully prop-driven; gallery cream/orange-adjacent brand fixture |
| Brand | `owner` / `Owner` | Rounded white inner card, gray eyebrow/title, three bottom photo columns, upper-right identity | `#f5f5f5` outer and white inner surface |

The upstream docs categories contain 2 Brand, 8 Content, 6 Product, and 6
Shadcn Registry components. Registry ordering differs from docs ordering and is
not a semantic API.

## Typed public props

`?` means optional in the upstream TypeScript interface. Values after `=` are
defaults inside the component implementation, not gallery defaults.

| Export | Props | Notable source behavior |
| --- | --- | --- |
| `Blog` | `category: string; title: string; excerpt: string; author: string; meta: string; avatar?: string; brand: string; logo?: string` | Title switches 78px to 64px above 48 characters; missing avatar uses the first two initials. |
| `Changelog` | `version: string; date: string; title: string; items: string[]; brand: string; logo?: string = ""` | Only `items.slice(0, 4)` renders. |
| `Editorial` | `kicker: string; title: string; meta: string; ghost?: string; brand: string; logo?: string` | Missing ghost uses `title.split(" ")[0]`; title switches 120px to 96px above 36 characters. |
| `Event` | `label: string; brand: string; title: string; date: string; location: string; logo?: string = ""` | Title switches 88px to 72px above 40 characters. |
| `Grid` | `title: string; description: string; brand: string; logo?: string = ""` | Title switches 80px to 64px above 20 characters. |
| `Logo` | `brand: string; tagline?: string; monogram?: string; background: string; logo?: string = ""` | `background.startsWith("#")` selects a color plus fixed glow; otherwise the value is used verbatim as `backgroundImage`. |
| `Owner` | `eyebrow: string; title: string; brand: string; images: string[]; logo?: string` | Renders every image; image index 1 is 300px high and all others 260px. |
| `Photo` | `image?: string; label: string; title: string; brand: string; logo?: string = ""` | No image uses a fixed gradient; title switches 88px to 72px above 36 characters; background size is fixed at 1200x630. |
| `Product` | `brand: string; title: string; description: string; price: string; image?: string; logo?: string` | No image uses an indigo-purple gradient; title switches 76px to 64px above 28 characters. |
| `Profile` | `name: string; role: string; bio: string; avatar?: string; website: string` | Missing avatar uses the first two initials. |
| `Quote` | `quote: string; author: string; handle: string; avatar?: string` | Missing avatar uses initials; quote switches 64px to 52px above 90 characters. |
| `ShadcnRegistry1` | `name: string; url: string; description: string; logo?: string = ""; items?: string[] = []` | URL switches 120px to 96px above 20 characters; all tags render. |
| `ShadcnRegistry2` | `name: string; category: string; title: string; items?: string[] = []; logo?: string = ""; accent?: string = "#4f46e5"` | Title switches 72px to 64px above 50 characters; all tags render. |
| `ShadcnRegistry3` | `title: string; credit?: string = ""; ghost?: string = ""; logo?: string = ""` | Empty ghost uses the first title word; title switches 64px to 52px above 60 characters. |
| `ShadcnRegistry4` | `name: string; title: string; url?: string = ""; logo?: string = ""` | Splits title on literal spaces and alternates word colors; title switches 64px to 52px above 60 characters. |
| `ShadcnRegistry5` | `name: string; title: string; description?: string = ""; logo?: string = ""` | Title switches 88px to 72px above 30 characters. |
| `ShadcnRegistry6` | `title: string; description: string; brand: string; logo?: string = ""` | Title switches 64px to 52px above 60 characters. |
| `Shiori` | `background: string; brand: string; brandColor: string; logo: string; title: string; titleColor: string` | Logo is required and has no fallback. |
| `Showcase` | `title: string; subtitle: string; url: string; accent?: string` | `accent` has no source-level default even though the gallery supplies one; undefined reaches bar `backgroundColor`. |
| `Simple` | `label: string; title: string; description: string; brand: string; logo?: string` | Title switches 76px to 64px above 40 characters. |
| `Stat` | `label: string; value: string; caption: string; trend?: string; brand: string; logo?: string` | Trend row is conditional. |
| `Terminal` | `brand: string; title: string; caption?: string; logo?: string` | Title is uppercased and switches 104px to 84px above 28 characters. |

The port may make gallery defaults real Svelte prop defaults for usability, but
that is an intentional API adaptation and must be tested/documented. It must not
silently drop an upstream field or change the threshold/list behavior.

## Gallery defaults and examples

The exact default fixtures come from the 22 `config.ts` files. These defaults
drive the upstream live gallery; most are **not defaults on the React component
itself**.

| Item | Gallery fixture values |
| --- | --- |
| `blog` | `author="Ada Lovelace"`; `avatar=""`; `brand="ogimagecn"`; `category="Engineering"`; `excerpt="A deep dive into Satori, the next/og runtime, and shipping fast cards."`; `logo=""`; `meta="Jun 5, 2026 · 6 min read"`; `title="How we generate social images at the edge"` |
| `changelog` | `brand="ogimagecn"`; `date="June 2026"`; `items=["Seven new OG image components", "Live in-browser previews", "One-line shadcn install"]`; `logo=""`; `title="What's new"`; `version="v2.0"` |
| `editorial` | `brand="ogimagecn"`; `ghost=""`; `kicker="Essay"`; `logo=""`; `meta="Issue 04"`; `title="Designing at the edge of the canvas"` |
| `event` | `brand="ogimagecn"`; `date="Jun 5, 2026 · 10:00 AM PT"`; `label="Live Event"`; `location="Online"`; `logo=""`; `title="Shipping beautiful OG images at scale"` |
| `grid` | `brand="ogimagecn"`; `description="Composable components powered by Satori and the next/og runtime."`; `logo=""`; `title="Build your own OG images"` |
| `logo` | `background="#09090b"`; `brand="ogimagecn"`; `logo=""`; `monogram=""`; `tagline="Open Graph images, built on Satori"` |
| `owner` | `brand="Owner"`; `eyebrow="Meet Owner."`; three Picsum URLs with IDs 1005, 1012, 1025; remote Website Files logo; `title="We make online growth easy for restaurants."` |
| `photo` | `brand="ogimagecn"`; `image=""`; `label="Travel"`; `logo=""`; `title="Chasing light across the northern coast"` |
| `product` | `brand="ogimagecn"`; `description="Copy-paste social cards rendered with next/og."`; `image=""`; `logo=""`; `price="$49"`; `title="The OG image toolkit"` |
| `profile` | `avatar=""`; `bio="Building tools for the open web. Writing about design systems, performance, and shipping fast."`; `name="Ada Lovelace"`; `role="Founder & Engineer"`; `website="ada.dev"` |
| `quote` | `author="Grace Hopper"`; `avatar=""`; `handle="@gracehopper"`; `quote="This is hands down the fastest way to ship beautiful OG images."` |
| `shadcn-registry-1` | `description="Beautifully designed components built with Radix UI and Tailwind CSS."`; `items=["159+ components", "open source", "accessible"]`; `logo=""`; `name="ogimagecn"`; `url="ui.shadcn.com"` |
| `shadcn-registry-2` | `accent="#4f46e5"`; `category="Marketing"`; `items=["Reusable", "Scalable", "Composable"]`; `logo=""`; `name="ogimagecn"`; `title="Animated components crafted for smooth interaction"` |
| `shadcn-registry-3` | `credit="Developed By @alaymanguy"`; `ghost="LOREM"`; `logo=""`; `title="Beautifully designed open source components built with Radix UI and Tailwind CSS for your next project"` |
| `shadcn-registry-4` | `logo=""`; `name="ogimagecn"`; `title="Discover animated primitives, components, and icons for building expressive, modern UIs"`; `url="ogimagecn.com"` |
| `shadcn-registry-5` | `description="Built with React, Typescript, shadcn/ui, Tailwind CSS, and Motion."`; `logo=""`; `name="ogimagecn"`; `title="Modern Next.js Templates"` |
| `shadcn-registry-6` | `brand="ogimagecn"`; `description="Composable OG image components built with Satori."`; `logo=""`; `title="Build your own OG images"` |
| `shiori` | `background="#faf6f1"`; `brand="Shiori"`; `brandColor="#1a1a1a"`; remote `https://www.shiori.sh/logo.png`; `title="A beautifully simple read-it-later app"`; `titleColor="#8b7e74"` |
| `showcase` | `accent="#6366f1"`; `subtitle="The dashboard that brings every metric into one calm view."`; `title="Run your business smarter"`; `url="app.ogimagecn.com"` |
| `simple` | `brand="ogimagecn"`; `description="A shadcn registry of social card components you can copy, paste, and ship."`; `label="Open Graph"`; `logo=""`; `title="Beautiful OG images, built on Satori"` |
| `stat` | `brand="ogimagecn"`; `caption="Open Graph images generated with next/og this year."`; `label="Images rendered"`; `logo=""`; `trend="+24%"`; `value="10M+"` |
| `terminal` | `brand="ogimagecn"`; `caption="npx shadcn@latest add ogimagecn"`; `logo=""`; `title="Ship beautiful OG images"` |

There is no `examples/` directory at the pinned commit, although
`lib/registry.ts#getDemoSource()` looks for `examples/<name>.tsx`. The examples
that do exist are the MDX preview, CLI, and `next/og` usage sections for every
public item. Their intended production dimensions are uniformly 1200x630.
Several introductory usage samples pass only one or two required React props;
they are illustrative snippets and are not type-correct complete fixtures.

## Orphaned `Peggy` source

[`registry/components/peggy/index.tsx`](https://github.com/shadcn-labs/ogimagecn/blob/e1b91b3d9e8e8cebe40fb5910e60f076e92aace4/registry/components/peggy/index.tsx)
exports `Peggy` and `PeggyProps` (`title`, `subtitle`, optional `images`, optional
`logo`) but is not public upstream. It uses at most ten image tiles, a built-in
“Sign up” CTA, and requests Georgia/Times for the title.

It also relies on unsupported or unsafe Satori behavior (`zIndex`, `userSelect`,
the `background` shorthand, `currentColor` outside `color`, an unregistered
Georgia family, and image `alt` text). Therefore parity means documenting it as
unsupported, not adding a 23rd public item. It can be promoted only by a future
explicit upstream or port release decision with corrected rendering and tests.

## Public exports, registry dependencies, and install surface

Each generated JSON item:

- has `type: "registry:component"`;
- copies exactly one source file to `components/og/<name>.tsx`;
- exposes that file's named component and named `*Props` interface;
- has empty/absent `dependencies` and `registryDependencies` arrays;
- includes no CSS, utility, font, image, or icon dependency.

The internal docs-only
[`registry/__index__.tsx`](https://github.com/shadcn-labs/ogimagecn/blob/e1b91b3d9e8e8cebe40fb5910e60f076e92aace4/registry/__index__.tsx)
default-exports a name-to-`{ Component, config }` map for the same 22 public
items. Config modules named-export `blogConfig`, `changelogConfig`, etc.; they
are preview metadata, not part of installed registry items.

The upstream registry alias is:

```json
{
  "registries": {
    "@ogimagecn": "https://ogimagecn.com/r/{name}.json"
  }
}
```

It is additive. A Svelte port must use its own complete, base-path-aware item
URLs and must preserve the existing shadcn-svelte registry and all unrelated
`components.json` keys. Do not replace the core registry configuration.
Upstream's `registry.json.homepage` is `https://ogimagecn.vercel.app`, while
docs use `https://ogimagecn.com`; this domain inconsistency must not be copied
into generated Svelte registry URLs.

## Renderer, utilities, fonts, and assets

### Rendering path upstream

```text
config.ts gallery values
        -> React component (inline style tree)
        -> satori@^0.26.0 + Inter WOFF fonts
        -> SVG
        -> @resvg/resvg-wasm@^2.6.2 Web Worker
        -> PNG download
```

- `ComponentPreview` fixes width/height at 1200x630 and obtains defaults with
  `getDefaults(ControlConfig)`.
- `PreviewRenderer` loads Inter normal weights 400, 500, 600, 700, and 800 from
  `cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-<weight>-normal.woff`,
  then calls Satori. The mutable `latest` URL is not reproducible.
- `PreviewRenderer` catches and discards Satori exceptions, leaving an empty
  preview. The port must make renderer warnings and errors test failures.
- `resvg-worker.ts` initializes `@resvg/resvg-wasm`, fits by width, and emits a
  PNG object URL. Production docs use Next `ImageResponse` instead.
- `initials(name)` is duplicated privately in Blog, Profile, and Quote. It
  splits literal spaces, takes up to two first UTF-16 characters, joins, and
  uppercases.
- `ControlType`, `ControlConfig`, and `getDefaults` support `text`, `color`,
  `image`, `select`, and string `array` controls. No shipped config uses
  `select`.
- The OG component files import nothing and use inline SVG for the Changelog
  check, Event calendar, Stat trend arrow, and Shadcn Registry 2 lightning icon.

### Font inventory and gaps

| Use | Upstream source | Coverage / gap |
| --- | --- | --- |
| OG gallery | Inter normal 400/500/600/700/800 WOFF fetched from a mutable CDN URL | Latin subset only; no italics; not bundled or content-pinned |
| Production example | User-fetched `Inter-SemiBold.ttf`, registered as weight 600 normal | Example only; insufficient for components that request 400-800 |
| Docs application | Geist, Geist Mono, and Inter through `next/font/google` | Site UI only, not an OG render dependency |
| Peggy | CSS family `Georgia, 'Times New Roman', Times, serif` | No Satori font data; another reason it is not public |

No fixture font file or font license is committed upstream. The Svelte port
must bundle or reproducibly fetch appropriately licensed font bytes and license
text; register all used weights/styles; define deterministic fallback families;
and explicitly test non-ASCII, emoji, and missing glyph handling. Inter itself
is SIL Open Font License, but the port must retain the actual OFL text with any
redistributed files rather than relying on this audit statement.

### Image and asset inventory

- Registry components reference no repository-local raster or SVG asset.
  Fallback marks and the four icons are CSS shapes or inline SVG.
- Owner's gallery fixture uses three remote Picsum images and a remote Website
  Files logo. Shiori uses `https://www.shiori.sh/logo.png`. These are mutable
  network dependencies with no license metadata in upstream.
- MDX examples additionally reference an Unsplash image and placeholder
  `example.com` avatar/product URLs.
- `public/og.png`, favicons, Android/Apple icons, and `.github/assets/gh.png`
  are documentation/site assets, not transitive dependencies of any registry
  item. The exhaustive public site-asset filenames outside generated registry
  JSON are `android-chrome-192x192.png`, `android-chrome-512x512.png`,
  `apple-touch-icon.png`, `favicon-16x16.png`, `favicon-32x32.png`,
  `favicon-96x96.png`, `favicon.ico`, `favicon.png`, `favicon.svg`, and `og.png`;
  `.github/assets/gh.png` is the only repository social asset outside `public`.
- User image props accept arbitrary strings in React. Upstream does not fetch,
  validate, convert, timeout, cache, or report failures. The port boundary must
  define behavior for HTTP(S), data URIs, transparent PNG, invalid URLs,
  unsupported media types, and failed loads before Satori/resvg.

Release fixtures must therefore be local, deterministic, redistributable, and
included in registry/package dependency closure. Mutable remote examples may
remain as failure/remote-loading test cases, but may not be the only golden
fixtures.

## Satori constraints and required adaptations

The pinned repository includes its own Satori support guide. The following
constraints are binding on parity because the output engine is Satori, not a
browser screenshot:

1. Layout is Yoga flexbox. Multi-child containers must explicitly use flex;
   row is the default direction. Overlap uses absolute positioning.
2. Only Satori's CSS subset is valid. Unsupported features include `z-index`,
   `calc()`, 3D transforms, intrinsic size keywords, `flexBasis: auto`, and
   advanced OpenType typography. Stacking follows document order.
3. Shorthand spacing values need units on every value. The port must normalize
   style values rather than emitting invalid unitless shorthand.
4. Supported static elements are primarily `div`, `span`, `img`, `svg`, and
   text. Interactive/resource elements do not render.
5. Images need deterministic dimensions. PNG, JPEG, and GIF are the safe input
   formats; WebP and AVIF require conversion. Remote servers can content-negotiate
   an unsupported type regardless of filename.
6. Satori accepts TTF, OTF, and WOFF, not WOFF2. Text requires registered font
   data. Advanced kerning/ligatures are unavailable and RTL is unsupported.
7. Emoji require `graphemeImages` or `loadAdditionalAsset`; CJK and other
   scripts require additional fonts and appropriate `lang` values. Missing
   glyph policy is otherwise renderer-dependent.
8. `alt` on images and `<title>` in inline SVG can become visible output in
   Satori. Public upstream components frequently include `alt`; the port should
   omit/strip it at the renderer boundary and record this as a Satori adaptation.
9. Satori emits SVG; PNG parity must be evaluated after resvg rasterization.
   SVG DOM or Satori input snapshots alone cannot establish release readiness.
10. Satori is not pixel-identical to browser CSS. Browser-only docs preview is
    insufficient; the canonical gallery must show final generated SVG/PNG.

Known source-specific risks are Photo's fixed `backgroundSize: 1200px 630px`,
Product's fixed 486px panel/background, unbounded Owner and registry tag arrays,
title sizing based on UTF-16 string length rather than measured text, absent
line clamps, and remote image failures. Public Shadcn Registry 3 also uses
unsupported `userSelect` and the `background` shorthand; the port must omit the
former and translate the latter to `backgroundImage` without changing the
fallback badge. These behaviors should initially be
preserved for default parity; overflow safety for adversarial content may add
documented clamps/scaling so long as default output remains visually equivalent.

## Svelte parity and intentional boundary adaptations

The React components cannot be passed directly to Satori without requiring
React. The idiomatic port boundary should be:

```text
typed Svelte 5 props + optional Snippet composition
        -> framework-neutral Satori node/style model
        -> asset/font resolution and strict diagnostics
        -> Satori SVG
        -> resvg PNG
```

Required adaptations, which are not parity failures when documented and
covered by final-image tests:

- Svelte components use Svelte 5 `$props()` types and Snippets rather than
  `ReactNode`/JSX composition.
- A framework-neutral node model preserves composition; consumers do not author
  or install React.
- Gallery config defaults may become actual Svelte defaults, resolving the
  mismatch between upstream docs claims and required React props.
- Exact Owner/Shiori remote gallery URLs remain in exported metadata for source
  fidelity, while no-prop rendering uses deterministic empty image fallbacks.
  Golden tests use a generated transparent PNG data URI instead of requiring
  mutable third-party images whose redistribution license is not recorded
  upstream. Their remote photography/logo pixels are therefore intentionally
  not claimed as offline visual parity.
- Image `alt`/SVG title leakage is removed, mutable images are resolved to safe
  bytes/data URIs, and failed loads become explicit errors or documented
  deterministic fallbacks.
- Font loading is pinned and licensed; multilingual/emoji fallback is explicit.
- Renderer warnings are collected and fatal under test/CI instead of swallowed.
- Showcase's faux-browser glow uses a 60px blur instead of upstream's 80px.
  `@resvg/resvg-js@2.6.2` panics while rasterizing the upstream geometry; the
  reduced blur preserves the visible glow and produces a valid production PNG.
- Registry output targets `.svelte`, includes the complete dependency closure,
  and uses absolute item URLs that respect the deployed GitHub Pages base path.
- Public package exports are a new Svelte distribution surface; upstream has no
  analogous npm exports to preserve.

Using Playwright/browser screenshots as the core renderer, changing the 1200x630
default, or rebuilding layouts with unrelated canvas primitives would not be an
adaptation; each would break the source-of-truth contract.

## Final-image acceptance matrix

For each of the 22 public components, release validation must render the exact
gallery defaults to SVG and PNG and assert:

- SVG root and PNG IHDR are exactly 1200x630; PNG begins with the standard
  8-byte signature;
- the component-specific marker in the inventory table is present in both
  vector semantics and raster pixels;
- no renderer warning, unresolved import, missing font, or asset-load error was
  observed;
- foreground/text bounding boxes remain inside the 1200x630 image unless an
  upstream decorative overflow is intentionally clipped;
- deterministic renders are byte-identical where supported, or pixel-equivalent
  within the documented visual-regression tolerance;
- comparison is against the rasterized image, with clipping, empty/uniform
  regions, and missing image placeholders detected.

Cross-component stress coverage must include long strings around every source
threshold, arrays above source slice/unbounded limits, Latin weight 400-800,
italics and fallback families, CJK or another non-Latin script, combining text,
emoji, known missing glyphs, transparent PNG, data URI, successful remote image,
failed remote image, and unsupported/converted image formats. Determinism tests
must not depend on the mutable upstream CDN or Picsum/Shiori fixtures.

Package validation must install a packed tarball into a fresh Svelte consumer,
import every documented root/subpath export, render through both SVG and PNG
entry points, install every registry item with the real shadcn-svelte CLI from
its complete hosted URL, and compile/render the installed files. A clean CI run
must begin without `dist`, SvelteKit/build output, caches, or prior preview
artifacts.

## Audit disposition

| Upstream surface | Port obligation |
| --- | --- |
| 22 public component sources and props | Implement all, preserving default 1200x630 visual output and listed behaviors |
| 22 gallery configs/default fixtures | Export or document deterministic equivalents and use as golden fixtures |
| 22 component MDX pages and four category pages | Represent in the static base-path-aware gallery/docs site |
| Registry manifest and 22 generated item JSON files | Generate deterministic Svelte equivalents with complete URLs and dependency closure |
| Satori SVG path and resvg PNG path | Preserve with strict diagnostics and final-image tests |
| Inter preview fonts | Replace mutable CDN loading with licensed, pinned, sufficient font assets |
| Remote fixture images | Replace golden dependencies with licensed deterministic local fixtures; keep targeted remote/failure tests |
| Site-only assets, UI components, hooks, audio, SEO, agent routes | Not part of OG library parity; reimplement only what the Svelte docs site actually needs |
| Orphan `Peggy` | Explicitly unsupported until separately promoted and corrected |
| React/Next-specific `ImageResponse` examples | Adapt to SvelteKit/package renderer examples without exposing React to consumers |

Any future upstream update must rerun this inventory and record a new full
commit SHA before changing parity claims.
