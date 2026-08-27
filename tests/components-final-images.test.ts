import { fileURLToPath } from 'node:url';
import type { Component } from 'svelte';
import { describe, expect, it } from 'vitest';
import Changelog from '../src/lib/components/Changelog.svelte';
import Owner from '../src/lib/components/Owner.svelte';
import Simple from '../src/lib/components/Simple.svelte';
import { registry } from '../src/lib/catalog.js';
import { renderImage, renderSvg } from '../src/lib/render.js';
import { expectVisualMatch, expectSvgDigest, imageDigest, pngDimensions } from './image-assertions.js';

const pixel =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M/wHwAEAQH/0JhWJwAAAABJRU5ErkJggg==';

const cases: Record<
  string,
  { marker: string; markerProp: string; props?: Record<string, unknown>; intentionalOverflowText?: string[] }
> = {
  simple: { marker: 'Beautiful OG images', markerProp: 'title' },
  grid: { marker: 'Build your own OG images', markerProp: 'title' },
  blog: { marker: 'How we generate social images', markerProp: 'title' },
  changelog: { marker: "What's new", markerProp: 'title' },
  quote: { marker: 'hands down the fastest', markerProp: 'quote' },
  'shadcn-registry-1': { marker: 'ui.shadcn.com', markerProp: 'url' },
  'shadcn-registry-2': { marker: 'Animated components', markerProp: 'title' },
  'shadcn-registry-3': {
    marker: 'Beautifully designed', markerProp: 'title', intentionalOverflowText: ['LOREM']
  },
  'shadcn-registry-4': { marker: 'Discover', markerProp: 'title' },
  'shadcn-registry-5': { marker: 'Modern Next.js Templates', markerProp: 'title' },
  'shadcn-registry-6': { marker: 'Build your own OG images', markerProp: 'title' },
  photo: { marker: 'Chasing light', markerProp: 'title' },
  product: { marker: 'The OG image toolkit', markerProp: 'title' },
  profile: { marker: 'Ada Lovelace', markerProp: 'name' },
  event: { marker: 'Shipping beautiful OG images', markerProp: 'title' },
  stat: { marker: '10M+', markerProp: 'value' },
  logo: { marker: 'ogimagecn', markerProp: 'brand' },
  terminal: { marker: 'Ship beautiful OG images', markerProp: 'title' },
  editorial: {
    marker: 'Designing at the edge', markerProp: 'title', intentionalOverflowText: ['Designing']
  },
  showcase: { marker: 'Run your business smarter', markerProp: 'title' },
  shiori: { marker: 'beautifully simple read-it-later', markerProp: 'title', props: { logo: pixel } },
  owner: {
    marker: 'We make online growth easy', markerProp: 'title',
    props: { images: [pixel, pixel, pixel], logo: pixel }
  }
};

const asComponent = (component: Component<any>) => component as Component<Record<string, unknown>>;

function textOverflow(
  nodes: Awaited<ReturnType<typeof renderSvg>>['nodes'],
  ignored: readonly string[] = []
) {
  return nodes.filter(
    (node) =>
      node.textContent &&
      !ignored.some((text) => node.textContent?.includes(text)) &&
      (node.left < -0.01 || node.top < -0.01 || node.left + node.width > 1200.01 || node.top + node.height > 630.01)
  );
}

describe('all public components as final images', () => {
  it('keeps the complete pinned registry inventory', () => {
    expect(registry).toHaveLength(22);
    expect(new Set(registry.map((entry) => entry.name)).size).toBe(22);
    expect(Object.keys(cases).sort()).toEqual(registry.map((entry) => entry.name).sort());
  });

  for (const entry of registry) {
    it(`renders ${entry.name} to deterministic, bounded SVG and PNG matching its visual baseline`, async () => {
      const testCase = cases[entry.name];
      const props = { ...(testCase.props ?? {}) };
      const options = { collectNodes: true } as const;
      const first = await renderImage(asComponent(entry.component), props, options);
      const second = await renderImage(asComponent(entry.component), props, options);

      expect(first.svg).toMatch(/^<svg width="1200" height="630"/);
      expect(pngDimensions(first.png)).toEqual({ width: 1200, height: 630 });
      expect(first.warnings).toEqual([]);
      expect(first.svg).toBe(second.svg);
      expect(imageDigest(first.png)).toBe(imageDigest(second.png));

      const markerNodes = first.nodes.filter((node) => node.textContent?.includes(testCase.marker));
      expect(markerNodes.length, `${entry.name}: identifying text was not laid out`).toBeGreaterThan(0);
      for (const marker of markerNodes) {
        expect(marker.left).toBeGreaterThanOrEqual(0);
        expect(marker.top).toBeGreaterThanOrEqual(0);
        expect(marker.left + marker.width).toBeLessThanOrEqual(1200);
        expect(marker.top + marker.height).toBeLessThanOrEqual(630);
      }
      expect(textOverflow(first.nodes, testCase.intentionalOverflowText)).toEqual([]);

      const withoutMarker = await renderImage(asComponent(entry.component), {
        ...props,
        [testCase.markerProp]: ''
      });
      expect(imageDigest(first.png), `${entry.name}: marker did not affect final pixels`).not.toBe(
        imageDigest(withoutMarker.png)
      );

      const baseline = fileURLToPath(new URL(`./baselines/components/${entry.name}.png`, import.meta.url));
      await expectVisualMatch(first.png, baseline);
      expectSvgDigest(first.svg, entry.name);
    });
  }
});

describe('representative thresholds, long text, and lists', () => {
  it('uses the upstream long-title threshold and keeps the final title inside the image', async () => {
    const title = 'A release-ready Open Graph image library for multilingual products';
    const image = await renderImage(Simple, { title }, { collectNodes: true, embedFont: false });
    expect(image.svg).toContain('font-size="64"');
    const titleNode = image.nodes.find((node) => node.textContent === title);
    expect(titleNode).toBeDefined();
    expect((titleNode?.left ?? -1) + (titleNode?.width ?? 1201)).toBeLessThanOrEqual(1200);
    expect((titleNode?.top ?? -1) + (titleNode?.height ?? 631)).toBeLessThanOrEqual(630);
    expect(pngDimensions(image.png)).toEqual({ width: 1200, height: 630 });
  });

  it('limits changelog output to the upstream maximum of four list rows', async () => {
    const items = ['marker-one', 'marker-two', 'marker-three', 'marker-four', 'must-not-render'];
    const image = await renderImage(Changelog, { items }, { collectNodes: true, embedFont: false });
    const text = image.nodes.map((node) => node.textContent ?? '').join(' ');
    expect(text).toContain('marker-four');
    expect(text).not.toContain('must-not-render');
    expect(image.svg).not.toContain('must-not-render');
  });

  it('lays out an extended Owner image list without clipping or warnings', async () => {
    const images = Array.from({ length: 6 }, () => pixel);
    const image = await renderImage(Owner, { images, logo: pixel }, { collectNodes: true });
    expect(image.warnings).toEqual([]);
    expect((image.svg.match(/<image\b/g) ?? []).length).toBeGreaterThanOrEqual(7);
    expect(pngDimensions(image.png)).toEqual({ width: 1200, height: 630 });
  });
});
