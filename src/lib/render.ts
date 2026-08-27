import { Resvg } from '@resvg/resvg-js';
import satori, { type SatoriNode } from 'satori';
import { html as toSatoriNode } from 'satori-html';
import { render } from 'svelte/server';
import type { Component } from 'svelte';
import { loadFixtureFonts } from './fonts.js';
import {
  OG_HEIGHT,
  OG_WIDTH,
  type RenderedNode,
  type RenderOptions,
  type RenderedImage,
  type RenderPngOptions,
  type SatoriVNode
} from './types.js';

function normalizeWarning(value: unknown): string {
  return value instanceof Error ? value.message : String(value);
}

// console is process-global. Serialize the small region in which Satori/Resvg may
// report warnings so concurrent renders cannot steal or lose one another's output.
let warningCaptureQueue: Promise<void> = Promise.resolve();
let warningCaptureActive = false;

async function withCapturedWarnings<T>(task: () => Promise<T>): Promise<{ result: T; warnings: string[] }> {
  // Guard against re-entrancy: a nested call (e.g. renderImage invoking renderSvg)
  // would otherwise await its own predecessor in the queue and deadlock. When a
  // capture is already active we run without re-wrapping console, so we neither
  // clobber the outer capture nor block on a release that never comes.
  if (warningCaptureActive) return { result: await task(), warnings: [] };

  warningCaptureActive = true;
  const previous = warningCaptureQueue;
  let release!: () => void;
  warningCaptureQueue = new Promise<void>((resolve) => {
    release = resolve;
  });
  await previous;

  const warnings: string[] = [];
  const originalWarn = console.warn;
  const originalError = console.error;
  console.warn = (...values: unknown[]) => warnings.push(values.map(normalizeWarning).join(' '));
  console.error = (...values: unknown[]) => warnings.push(values.map(normalizeWarning).join(' '));
  try {
    return { result: await task(), warnings };
  } finally {
    console.warn = originalWarn;
    console.error = originalError;
    warningCaptureActive = false;
    release();
  }
}

function assertDimensions(width: number, height: number): void {
  if (!Number.isSafeInteger(width) || width <= 0 || !Number.isSafeInteger(height) || height <= 0) {
    throw new TypeError(`Image dimensions must be positive safe integers; received ${width}x${height}.`);
  }
}

function assertSvg(svg: string, width: number, height: number): void {
  const root = svg.match(/^<svg\b[^>]*>/)?.[0];
  if (!root) throw new Error('Satori returned an invalid SVG document.');
  const svgWidth = Number(root.match(/\bwidth="([0-9.]+)"/)?.[1]);
  const svgHeight = Number(root.match(/\bheight="([0-9.]+)"/)?.[1]);
  if (svgWidth !== width || svgHeight !== height) {
    throw new Error(`Satori returned ${svgWidth}x${svgHeight}; expected ${width}x${height}.`);
  }
}

function snapshotNode(node: SatoriNode): RenderedNode {
  return {
    left: node.left,
    top: node.top,
    width: node.width,
    height: node.height,
    type: node.type,
    ...(node.key === undefined ? {} : { key: node.key }),
    ...(node.textContent === undefined ? {} : { textContent: node.textContent })
  };
}

function decodeHtmlEntities(value: string): string {
  return value.replace(/&(?:#(\d+)|#x([\da-f]+)|(amp|lt|gt|quot|apos));/gi, (entity, decimal, hex, named) => {
    if (decimal) return String.fromCodePoint(Number(decimal));
    if (hex) return String.fromCodePoint(Number.parseInt(hex, 16));
    const replacements: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
    return replacements[String(named).toLowerCase()] ?? entity;
  });
}

/**
 * Render a Svelte 5 component (including Snippet props) to the small VDOM shape
 * consumed by Satori. Consumers never need React or JSX at this boundary.
 */
export function renderSvelteToSatori<Props extends Record<string, unknown>>(
  component: Component<Props>,
  props: Props
): SatoriVNode {
  const rendered = render(component, { props });
  if (!rendered.body.trim()) throw new Error('The Svelte component rendered an empty body.');
  // Svelte SSR emits hydration comments around dynamic expressions. They are
  // meaningful to Svelte's client hydrator but can split/drop adjacent text in
  // HTML-to-VDOM parsers, so the server-only Satori boundary removes them.
  const serverOnlyHtml = rendered.body.replace(/<!--[\s\S]*?-->/g, '');
  const root = toSatoriNode(serverOnlyHtml) as SatoriVNode;

  // HTML attributes are strings after SSR. Satori deliberately distinguishes
  // numeric intrinsic image sizes from CSS lengths and warns for `width="64"`.
  // Restore the number type a Svelte/DOM author intended at this boundary.
  const normalize = (node: SatoriVNode): void => {
    if (node.type === 'img' || node.type === 'svg') {
      for (const attribute of ['width', 'height'] as const) {
        const value = node.props[attribute];
        if (typeof value === 'string' && /^\d+(?:\.\d+)?$/.test(value)) node.props[attribute] = Number(value);
      }
    }
    // `alt` belongs to HTML accessibility semantics but is not a Satori prop;
    // retaining it produces a renderer warning without affecting the final SVG.
    if (node.type === 'img') delete node.props.alt;
    let children = node.props.children;
    if (Array.isArray(children)) {
      children = children.map((child) => (typeof child === 'string' ? decodeHtmlEntities(child) : child));
      // satori-html can produce a mixed raw-text/element child array. Satori's
      // flex traversal may omit that raw text, so materialize it as an inheriting
      // flex span, matching the box React creates internally for the same input.
      const hasElement = children.some((child) => child && typeof child !== 'string');
      if (hasElement) {
        children = children.map((child) =>
          typeof child === 'string' && child.length > 0
            ? { type: 'span', props: { style: { display: 'flex' }, children: child } }
            : child
        );
      }
      node.props.children = children;
      for (const child of children) if (child && typeof child !== 'string') normalize(child);
    } else if (typeof children === 'string') {
      node.props.children = decodeHtmlEntities(children);
    } else if (children) normalize(children);
  };
  normalize(root);
  return root;
}

export async function renderSvg<Props extends Record<string, unknown>>(
  component: Component<Props>,
  props: Props,
  options: RenderOptions = {}
): Promise<RenderedImage> {
  const width = options.width ?? OG_WIDTH;
  const height = options.height ?? OG_HEIGHT;
  assertDimensions(width, height);
  const fonts = options.fonts ?? (await loadFixtureFonts());
  const nodes: RenderedNode[] = [];
  const { result: svg, warnings } = await withCapturedWarnings(() => {
    const node = renderSvelteToSatori(component, props);
    return satori(node as Parameters<typeof satori>[0], {
      width,
      height,
      fonts,
      debug: options.debug,
      embedFont: options.embedFont ?? true,
      graphemeImages: options.graphemeImages,
      loadAdditionalAsset: options.loadAdditionalAsset,
      onNodeDetected: (detected) => {
        if (options.collectNodes) nodes.push(snapshotNode(detected));
        options.onNodeDetected?.(detected);
      }
    });
  });

  if ((options.strict ?? true) && warnings.length > 0) {
    throw new Error(`Satori emitted renderer warnings:\n${warnings.join('\n')}`);
  }
  assertSvg(svg, width, height);
  return { svg, width, height, warnings, nodes };
}

function rasterize(svg: string, options: RenderPngOptions): Uint8Array {
  const renderer = new Resvg(svg, options.fitTo ? { fitTo: options.fitTo } : undefined);
  const png = renderer.render().asPng();
  const signature = [137, 80, 78, 71, 13, 10, 26, 10];
  if (png.length < 24 || !signature.every((byte, index) => png[index] === byte)) {
    throw new Error('Resvg returned an invalid PNG document.');
  }
  return png;
}

export async function renderPng<Props extends Record<string, unknown>>(
  component: Component<Props>,
  props: Props,
  options: RenderPngOptions = {}
): Promise<Uint8Array> {
  const { svg } = await renderSvg(component, props, options);
  const { result, warnings } = await withCapturedWarnings(async () => rasterize(svg, options));
  if ((options.strict ?? true) && warnings.length > 0) {
    throw new Error(`Resvg emitted renderer warnings:\n${warnings.join('\n')}`);
  }
  return result;
}

export async function renderImage<Props extends Record<string, unknown>>(
  component: Component<Props>,
  props: Props,
  options: RenderPngOptions = {}
): Promise<RenderedImage & { png: Uint8Array }> {
  const rendered = await renderSvg(component, props, options);
  const { result: png, warnings } = await withCapturedWarnings(async () => rasterize(rendered.svg, options));
  const allWarnings = [...rendered.warnings, ...warnings];
  // `rendered.warnings` were already enforced (and would have thrown) by renderSvg
  // under strict mode, so only the Resvg warnings from rasterization remain to check.
  if ((options.strict ?? true) && warnings.length > 0) {
    throw new Error(`Resvg emitted renderer warnings:\n${warnings.join('\n')}`);
  }
  return { ...rendered, warnings: allWarnings, png };
}
