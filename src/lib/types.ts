import type { Component } from 'svelte';
import type { Font as SatoriFont, SatoriNode } from 'satori';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export type OgComponent<Props extends Record<string, unknown> = Record<string, unknown>> = Component<Props>;

/** Minimal framework-neutral node shape accepted by Satori. */
export interface SatoriVNode {
  type: string;
  props: {
    style?: Record<string, unknown>;
    children?: string | SatoriVNode | Array<string | SatoriVNode | undefined>;
    [prop: string]: unknown;
  };
}

export type OgFont = SatoriFont;

export interface RenderOptions {
  width?: number;
  height?: number;
  fonts?: OgFont[];
  strict?: boolean;
  debug?: boolean;
  embedFont?: boolean;
  /** Inline images used for graphemes such as emoji. */
  graphemeImages?: Record<string, string>;
  /**
   * Called by Satori for a glyph which is not present in the configured fonts.
   * Return a data URI for an emoji/image or one or more matching fonts.
   */
  loadAdditionalAsset?: (
    languageCode: string,
    segment: string
  ) => Promise<string | Array<OgFont>>;
  /** Receives each box after Satori has performed layout. */
  onNodeDetected?: (node: SatoriNode) => void;
  /** Retain a small, serializable snapshot of computed boxes in the result. */
  collectNodes?: boolean;
}

export interface RenderedNode {
  left: number;
  top: number;
  width: number;
  height: number;
  type: string;
  key?: string | number;
  textContent?: string;
}

export interface RenderedImage {
  svg: string;
  width: number;
  height: number;
  warnings: readonly string[];
  nodes: readonly RenderedNode[];
}

export interface RenderPngOptions extends RenderOptions {
  fitTo?: { mode: 'width' | 'height' | 'zoom'; value: number };
}
