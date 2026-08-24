export type OgTag = 'div' | 'span' | 'img' | 'svg' | 'path' | 'rect';

export type OgStyleValue = string | number | undefined;
export type OgStyle = Record<string, OgStyleValue>;
export type OgAttribute = string | number | undefined;

export interface OgNode {
  tag: OgTag;
  style?: OgStyle;
  attrs?: Record<string, OgAttribute>;
  children?: Array<OgNode | string>;
}

export const node = (
  tag: OgTag,
  style?: OgStyle,
  children?: Array<OgNode | string>,
  attrs?: Record<string, OgAttribute>
): OgNode => ({ tag, ...(style ? { style } : {}), ...(attrs ? { attrs } : {}), ...(children ? { children } : {}) });

export const div = (style: OgStyle, children: Array<OgNode | string> = []): OgNode =>
  node('div', style, children);

export const span = (style: OgStyle, children: Array<OgNode | string> = []): OgNode =>
  node('span', style, children);

export const image = (src: string, width?: number, height?: number, style?: OgStyle): OgNode =>
  node('img', style, undefined, { src, width, height });

const unitless = new Set([
  'flex',
  'flexGrow',
  'flexShrink',
  'fontWeight',
  'lineHeight',
  'opacity',
  'strokeWidth'
]);

const kebab = (name: string) => name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

export function serializeStyle(style: OgStyle | undefined, tag?: OgTag): string | undefined {
  const normalized = tag === 'div' && style?.display === undefined ? { ...style, display: 'flex' } : style;
  if (!normalized) return undefined;
  return Object.entries(normalized)
    .filter((entry): entry is [string, string | number] => entry[1] !== undefined)
    .map(([key, value]) => `${kebab(key)}:${typeof value === 'number' && !unitless.has(key) ? `${value}px` : value}`)
    .join(';');
}
