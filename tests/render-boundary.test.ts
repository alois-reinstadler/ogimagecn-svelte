import { createServer, type Server } from 'node:http';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { renderImage, renderPng, renderSvelteToSatori, renderSvg } from '../src/lib/render.js';
import { countPixelsNear, decodePng, expectVisualMatch, imageDigest, pngDimensions } from './image-assertions.js';
import FontFixture from './fixtures/FontFixture.svelte';
import RenderFixture from './fixtures/RenderFixture.svelte';
import SnippetComposition from './fixtures/SnippetComposition.svelte';

const transparentPixel =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M/wHwAEAQH/0JhWJwAAAABJRU5ErkJggg==';
const emojiImage =
  'data:image/svg+xml;base64,' +
  Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><circle cx="32" cy="32" r="30" fill="#f59e0b"/><circle cx="22" cy="25" r="4"/><circle cx="42" cy="25" r="4"/><path d="M18 39 Q32 52 46 39" fill="none" stroke="#111827" stroke-width="4"/></svg>').toString('base64');

let assetServer: Server;
let assetOrigin: string;

beforeAll(async () => {
  assetServer = createServer((request, response) => {
    if (request.url === '/pixel.png') {
      response.writeHead(200, { 'content-type': 'image/png' });
      response.end(Buffer.from(transparentPixel.split(',')[1], 'base64'));
    } else {
      response.writeHead(404, { 'content-type': 'text/plain' });
      response.end('not found');
    }
  });
  await new Promise<void>((resolve) => assetServer.listen(0, '127.0.0.1', resolve));
  const address = assetServer.address();
  if (!address || typeof address === 'string') throw new Error('Fixture asset server did not bind to TCP.');
  assetOrigin = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => assetServer.close((error) => (error ? reject(error) : resolve())));
});

describe('Svelte-to-Satori rendering boundary', () => {
  it('preserves Svelte 5 Snippet composition and renders its marker into SVG and PNG', async () => {
    const node = renderSvelteToSatori(SnippetComposition, {});
    expect(node.type).toBe('div');

    const { svg, png, nodes, warnings } = await renderImage(SnippetComposition, {}, { collectNodes: true });
    expect(svg).toMatch(/^<svg\b/);
    expect(svg).toContain('#12b981');
    expect(pngDimensions(png)).toEqual({ width: 1200, height: 630 });
    expect(countPixelsNear(decodePng(png), [18, 185, 129])).toBeGreaterThan(10_000);
    expect(nodes.length).toBeGreaterThan(0);
    expect(warnings).toEqual([]);
  });

  it('produces deterministic final SVG and PNG output', async () => {
    const props = { text: 'Deterministic output' };
    const first = await renderImage(RenderFixture, props);
    const second = await renderImage(RenderFixture, props);
    expect(first.svg).toBe(second.svg);
    expect(imageDigest(first.png)).toBe(imageDigest(second.png));
  });

  it('keeps dynamic Svelte text in final SVG paths and raster pixels', async () => {
    const withText = await renderImage(RenderFixture, { text: 'DYNAMIC TEXT REGION' }, { collectNodes: true });
    const withoutText = await renderImage(RenderFixture, { text: '' });
    expect(withText.nodes.some((node) => node.textContent?.includes('DYNAMIC TEXT REGION'))).toBe(true);
    expect(imageDigest(withText.png)).not.toBe(imageDigest(withoutText.png));
    expect(withText.png.byteLength).toBeGreaterThan(withoutText.png.byteLength + 1_000);
  });

  it('decodes SSR entities exactly once before final SVG and raster rendering', async () => {
    const text = 'Founder & Engineer <literal> &#169;';
    const image = await renderImage(RenderFixture, { text }, { collectNodes: true, embedFont: false });
    expect(image.nodes.some((node) => node.textContent === text)).toBe(true);
    expect(image.svg).toContain('>Founder</text>');
    expect(image.svg).toContain('>&amp;</text>');
    expect(image.svg).toContain('>Engineer</text>');
    expect(image.svg).toContain('>&lt;</text>');
    expect(image.svg).toContain('>literal</text>');
    expect(image.svg).toContain('>&gt;</text>');
    expect(pngDimensions(image.png)).toEqual({ width: 1200, height: 630 });
  });

  it('matches the reviewed final-image visual baseline within the documented tolerance', async () => {
    const image = await renderImage(SnippetComposition, {});
    const baseline = fileURLToPath(new URL('./baselines/snippet-composition.png', import.meta.url));
    await expectVisualMatch(image.png, baseline);
  });

  it('renders transparent data-URI images without losing the identifying region', async () => {
    const png = await renderPng(RenderFixture, { image: transparentPixel });
    expect(pngDimensions(png)).toEqual({ width: 1200, height: 630 });
    expect(countPixelsNear(decodePng(png), [6, 182, 212])).toBeGreaterThan(10_000);
  });

  it('loads a remote image into the final artifacts and rejects an HTTP asset failure', async () => {
    const success = await renderImage(RenderFixture, { image: `${assetOrigin}/pixel.png` });
    expect(success.svg).toContain('data:image/png;base64,');
    expect(pngDimensions(success.png)).toEqual({ width: 1200, height: 630 });
    await expect(renderSvg(RenderFixture, { image: `${assetOrigin}/missing.png` })).rejects.toThrow();
  });

  it('renders weights, italics, fallback scripts, non-ASCII text, and emoji into final images', async () => {
    const image = await renderImage(FontFixture, {}, { graphemeImages: { '😀': emojiImage }, collectNodes: true });
    expect(pngDimensions(image.png)).toEqual({ width: 1200, height: 630 });
    expect(image.svg).toContain('data:image/svg+xml;base64,');
    expect(image.nodes.some((node) => node.textContent?.includes('你好'))).toBe(true);
    // The raster must contain substantial foreground ink in addition to the background.
    const decoded = decodePng(image.png);
    expect(countPixelsNear(decoded, [15, 23, 42], 20)).toBeGreaterThan(2_000);
    expect(countPixelsNear(decoded, [245, 158, 11], 20)).toBeGreaterThan(1_000);
  });

  it('makes missing-glyph behavior explicit through Satori additional-asset loading', async () => {
    const requested: Array<[string, string]> = [];
    const image = await renderImage(
      RenderFixture,
      { text: 'Asset-loaded emoji 😀' },
      {
        loadAdditionalAsset: async (languageCode, segment) => {
          requested.push([languageCode, segment]);
          if (languageCode === 'emoji') return emojiImage;
          throw new Error(`No configured glyph fallback for ${languageCode}: ${segment}`);
        }
      }
    );
    expect(requested).toContainEqual(['emoji', '😀']);
    expect(countPixelsNear(decodePng(image.png), [245, 158, 11], 20)).toBeGreaterThan(1_000);
  });

  it('rejects failed assets and invalid image dimensions', async () => {
    await expect(
      renderSvg(RenderFixture, { image: 'file:///definitely/missing/ogimagecn-fixture.png' })
    ).rejects.toThrow();
    await expect(renderSvg(RenderFixture, {}, { width: 0 })).rejects.toThrow(/positive safe integers/);
    await expect(renderSvg(RenderFixture, {}, { height: 630.5 })).rejects.toThrow(/positive safe integers/);
  });

  it('retains computed boxes for clipping and text-bound checks', async () => {
    const rendered = await renderSvg(
      RenderFixture,
      { text: 'Long text '.repeat(12) },
      { collectNodes: true }
    );
    const outside = rendered.nodes.filter(
      (node) =>
        node.textContent &&
        (node.left < 0 || node.top < 0 || node.left + node.width > rendered.width || node.top + node.height > rendered.height)
    );
    expect(outside).toEqual([]);
  });
});
