import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';
import { expect } from 'vitest';

const SVG_MANIFEST_PATH = fileURLToPath(new URL('./baselines/svg-manifest.json', import.meta.url));

export function svgDigest(svg: string): string {
  return createHash('sha256').update(svg).digest('hex');
}

/**
 * The committed PNG baselines are antialiasing-sensitive and can drift across
 * machines/builds even when output is visually identical. The Satori SVG is a
 * pure, deterministic string, so its digest is a portable regression gate. The
 * PNG diff remains as a secondary visual check.
 */
export function expectSvgDigest(svg: string, name: string): void {
  if (process.env.UPDATE_SNAPSHOTS === '1') {
    const manifest = existsSync(SVG_MANIFEST_PATH)
      ? JSON.parse(readFileSync(SVG_MANIFEST_PATH, 'utf8'))
      : {};
    manifest[name] = svgDigest(svg);
    writeFileSync(SVG_MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
    return;
  }
  expect(existsSync(SVG_MANIFEST_PATH), `No SVG baseline manifest; run with UPDATE_SNAPSHOTS=1`).toBe(true);
  const manifest = JSON.parse(readFileSync(SVG_MANIFEST_PATH, 'utf8'));
  expect(manifest[name], `No SVG baseline digest for ${name}; run with UPDATE_SNAPSHOTS=1`).toBeDefined();
  expect(svgDigest(svg), `${name}: SVG differs from committed baseline digest`).toBe(manifest[name]);
}

const PNG_SIGNATURE = Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10]);

export function pngDimensions(bytes: Uint8Array): { width: number; height: number } {
  expect(bytes.length).toBeGreaterThan(24);
  expect(Array.from(bytes.subarray(0, 8))).toEqual(Array.from(PNG_SIGNATURE));
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  expect(String.fromCharCode(...bytes.subarray(12, 16))).toBe('IHDR');
  return { width: view.getUint32(16), height: view.getUint32(20) };
}

export function decodePng(bytes: Uint8Array): PNG {
  return PNG.sync.read(Buffer.from(bytes));
}

export function countPixelsNear(
  png: PNG,
  target: readonly [number, number, number],
  channelTolerance = 4
): number {
  let count = 0;
  for (let offset = 0; offset < png.data.length; offset += 4) {
    if (
      png.data[offset + 3] > 0 &&
      Math.abs(png.data[offset] - target[0]) <= channelTolerance &&
      Math.abs(png.data[offset + 1] - target[1]) <= channelTolerance &&
      Math.abs(png.data[offset + 2] - target[2]) <= channelTolerance
    ) {
      count += 1;
    }
  }
  return count;
}

export function visualDifference(actual: PNG, expected: PNG, threshold = 12): number {
  expect(actual.width).toBe(expected.width);
  expect(actual.height).toBe(expected.height);
  let changed = 0;
  const pixelCount = actual.width * actual.height;
  for (let offset = 0; offset < actual.data.length; offset += 4) {
    const delta = Math.max(
      Math.abs(actual.data[offset] - expected.data[offset]),
      Math.abs(actual.data[offset + 1] - expected.data[offset + 1]),
      Math.abs(actual.data[offset + 2] - expected.data[offset + 2]),
      Math.abs(actual.data[offset + 3] - expected.data[offset + 3])
    );
    if (delta > threshold) changed += 1;
  }
  return changed / pixelCount;
}

export async function expectVisualMatch(
  actualBytes: Uint8Array,
  baselinePath: string,
  tolerance = 0.002
): Promise<void> {
  if (process.env.UPDATE_SNAPSHOTS === '1') {
    await mkdir(dirname(baselinePath), { recursive: true });
    await writeFile(baselinePath, actualBytes);
  }
  const expectedBytes = await readFile(baselinePath);
  const difference = visualDifference(decodePng(actualBytes), decodePng(expectedBytes));
  expect(difference, `${(difference * 100).toFixed(3)}% of pixels differ`).toBeLessThanOrEqual(tolerance);
}

export function imageDigest(bytes: Uint8Array): string {
  return createHash('sha256').update(bytes).digest('hex');
}
