import type { Component } from 'svelte';
import { describe, expect, it } from 'vitest';
import { registryByName } from '../src/lib/catalog.js';
import { renderImage } from '../src/lib/render.js';
import { showcaseUseCases } from '../src/lib/site/use-cases.js';
import { pngDimensions } from './image-assertions.js';

describe('site use-case examples', () => {
  for (const useCase of showcaseUseCases) {
    it(`renders the ${useCase.name} example without clipped text or warnings`, async () => {
      const entry = registryByName[useCase.componentName];
      const image = await renderImage(
        entry.component as Component<Record<string, unknown>>,
        useCase.props,
        { collectNodes: true }
      );

      expect(image.warnings).toEqual([]);
      expect(pngDimensions(image.png)).toEqual({ width: 1200, height: 630 });

      const textNodes = image.nodes.filter((node) => node.textContent);
      expect(textNodes.length).toBeGreaterThan(0);
      for (const node of textNodes) {
        expect(node.left, node.textContent).toBeGreaterThanOrEqual(0);
        expect(node.top, node.textContent).toBeGreaterThanOrEqual(0);
        expect(node.left + node.width, node.textContent).toBeLessThanOrEqual(1200);
        expect(node.top + node.height, node.textContent).toBeLessThanOrEqual(630);
      }
    });
  }
});
