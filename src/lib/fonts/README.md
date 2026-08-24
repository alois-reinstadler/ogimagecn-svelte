# Reproducible fixture fonts

These fonts are bundled so clean checkouts and installed tarballs render the
same glyphs without relying on a CDN. They are test fixtures and useful
defaults; applications can pass their own `fonts` array to the renderer.

- Static Noto Sans WOFF files cover Latin weights 400, 500, 600, 700, and 800,
  plus regular and bold italics. Greek, Cyrillic, and Vietnamese subsets are
  registered with Satori language tags.
- `NotoSansCJKsc-Regular.otf` supplies the Simplified Chinese fallback.

Sources are pinned, not branch-relative:

- `@fontsource/noto-sans@5.3.0` (immutable npm tarball; Latin and language WOFF)
- notofonts/noto-cjk commit `f8d157532fbfaeda587e826d4cd5b21a49186f7c`

SHA-256:

```text
18e2e5b23a9bc5e8e636d6c7984b8ac6635aefc1c497ed1c5012f3c637761b91  NotoSans-Latin-400-Normal.woff
15f5a154b97262907900b5e3d297333417396cc775ae2e73f801763ebbac1dd6  NotoSans-Latin-500-Normal.woff
954cd3f8c324a52a0a78a97a48f459a6656400a814e427d2ef62a680b83d82b8  NotoSans-Latin-600-Normal.woff
cac2e44ebc446d5c71a9a16fd5592bf80abf6f56dd564a7b90eb01c5f9d29793  NotoSans-Latin-700-Normal.woff
e175827c2ce1500c917e16fd419c8e804eabbeeaa58c3e3ac5405cce99aae58b  NotoSans-Latin-800-Normal.woff
4612e626b2998e42750a4f49f48329a39ddff8a4305fcbdaba016c0dedd9bde7  NotoSans-Latin-400-Italic.woff
618fda07c207f7f4d67fbf5f304c2de33691654124f5b461a3b4e352bb3f8c8a  NotoSans-Latin-700-Italic.woff
2c76254f6fc379fddfce0a7e84fb5385bb135d3e399294f6eeb6680d0365b74b  NotoSansCJKsc-Regular.otf
```

All are licensed under the SIL Open Font License 1.1. See the adjacent license
files. The CJK font's upstream SPDX manifest records `OFL-1.1`.
