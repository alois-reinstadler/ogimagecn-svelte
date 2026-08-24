# Visual regression policy

Tests compare decoded, final PNG pixels rather than Svelte SSR or Satori input.
The default tolerance permits at most **0.2%** of pixels to differ, with a
per-channel noise threshold of 12/255. This admits small platform rasterization
differences while still failing layout, color, font, image, or clipping changes.

Committed reference files live in `tests/baselines/`. Run `pnpm test:update` only
after reviewing the generated images. A normal test run never rewrites a baseline;
failure artifacts belong in the ignored `tests/artifacts/` directory.
