import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import type { OgFont } from './types.js';

const fontUrl = (name: string) => new URL(`./fonts/${name}`, import.meta.url);

const FIXTURE_FONT_FILES = [
  ['Noto Sans', 'NotoSans-Latin-400-Normal.woff', 400, 'normal', undefined],
  ['Noto Sans', 'NotoSans-Latin-500-Normal.woff', 500, 'normal', undefined],
  ['Noto Sans', 'NotoSans-Latin-600-Normal.woff', 600, 'normal', undefined],
  ['Noto Sans', 'NotoSans-Latin-700-Normal.woff', 700, 'normal', undefined],
  ['Noto Sans', 'NotoSans-Latin-800-Normal.woff', 800, 'normal', undefined],
  ['Noto Sans', 'NotoSans-Latin-400-Italic.woff', 400, 'italic', undefined],
  ['Noto Sans', 'NotoSans-Latin-700-Italic.woff', 700, 'italic', undefined],
  ['Noto Sans', 'NotoSans-greek-400-Normal.woff', 400, 'normal', undefined],
  ['Noto Sans', 'NotoSans-cyrillic-400-Normal.woff', 400, 'normal', undefined],
  ['Noto Sans', 'NotoSans-vietnamese-400-Normal.woff', 400, 'normal', undefined],
  ['Noto Sans', 'NotoSansCJKsc-Regular.otf', 400, 'normal', 'zh-CN']
] as const;

let fixtureFonts: Promise<OgFont[]> | undefined;

export function loadFixtureFonts(): Promise<OgFont[]> {
  fixtureFonts ??= Promise.all(
    FIXTURE_FONT_FILES.map(async ([name, file, weight, style, lang]) => ({
      name,
      data: await readFile(fontUrl(file)),
      weight,
      style,
      lang
    }))
  );
  return fixtureFonts;
}

export async function loadFont(
  source: string | URL | ArrayBuffer | Uint8Array,
  options: Omit<OgFont, 'data'>
): Promise<OgFont> {
  let data: OgFont['data'];
  if (typeof source === 'string' || source instanceof URL) {
    const isBarePath = typeof source === 'string' && !/^[a-z+.-]+:\/\//i.test(source) && !source.startsWith('file:');
    const url = source instanceof URL ? source : isBarePath ? pathToFileURL(source) : new URL(source);
    if (url.protocol === 'file:') data = await readFile(url);
    else {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Unable to load font ${url}: ${response.status} ${response.statusText}`);
      data = await response.arrayBuffer();
    }
  } else data = source instanceof Uint8Array ? Uint8Array.from(source).buffer : source;
  return { ...options, data };
}
