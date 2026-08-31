import { readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import type { ComponentShowcase } from './use-cases.js';

const mediaTypes: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png'
};

async function loadExampleAsset(file: string): Promise<string> {
  const extension = extname(file).toLowerCase();
  const mediaType = mediaTypes[extension];
  if (!mediaType) throw new Error(`Unsupported example asset type: ${extension}`);

  const bytes = await readFile(resolve('static', 'examples', file));
  return `data:${mediaType};base64,${bytes.toString('base64')}`;
}

export async function resolveExampleProps(showcase: ComponentShowcase): Promise<Record<string, unknown>> {
  const props: Record<string, unknown> = { ...showcase.props };

  for (const binding of showcase.assets ?? []) {
    if (binding.file) props[binding.prop] = await loadExampleAsset(binding.file);
    if (binding.files) props[binding.prop] = await Promise.all(binding.files.map(loadExampleAsset));
  }

  return props;
}
