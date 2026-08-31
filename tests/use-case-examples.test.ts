import type { Component } from 'svelte';
import { describe, expect, it } from 'vitest';
import { registryByName } from '../src/lib/catalog.js';
import { renderImage } from '../src/lib/render.js';
import { resolveExampleProps } from '../src/lib/site/example-assets.server.js';
import { componentShowcases } from '../src/lib/site/use-cases.js';
import { pngDimensions } from './image-assertions.js';

describe('site use-case examples', () => {
  it('provides one meaningful scenario for every public component', () => {
    expect(componentShowcases).toHaveLength(22);
    expect(new Set(componentShowcases.map((showcase) => showcase.name)).size).toBe(22);
    expect(componentShowcases.map((showcase) => showcase.name).sort()).toEqual(Object.keys(registryByName).sort());
  });

  for (const showcase of componentShowcases) {
    it(`renders ${showcase.title} without clipped text or warnings`, async () => {
      const entry = registryByName[showcase.name];
      const props = await resolveExampleProps(showcase);
      const image = await renderImage(
        entry.component as Component<Record<string, unknown>>,
        props,
        { collectNodes: true }
      );

      expect(image.warnings).toEqual([]);
      expect(pngDimensions(image.png)).toEqual({ width: 1200, height: 630 });

      const decorativeText = new Set([showcase.props.ghost].flat().filter(Boolean));
      const textNodes = image.nodes.filter(
        (node) => node.textContent && !decorativeText.has(node.textContent)
      );
      expect(textNodes.length).toBeGreaterThan(0);
      for (const node of textNodes) {
        expect(node.left, node.textContent).toBeGreaterThanOrEqual(0);
        expect(node.top, node.textContent).toBeGreaterThanOrEqual(0);
        expect(node.left + node.width, node.textContent).toBeLessThanOrEqual(1200);
        expect(node.top + node.height, node.textContent).toBeLessThanOrEqual(630);
      }
    }, 60_000);
  }
});
