# Upstream source of truth

This port is pinned to [`shadcn-labs/ogimagecn@e1b91b3d9e8e8cebe40fb5910e60f076e92aace4`](https://github.com/shadcn-labs/ogimagecn/commit/e1b91b3d9e8e8cebe40fb5910e60f076e92aace4), committed upstream on 2026-08-19.

The complete, file-level inventory and parity disposition are maintained in:

- [`docs/UPSTREAM_PIN.md`](./docs/UPSTREAM_PIN.md) — reproducible pin and audit procedure.
- [`docs/UPSTREAM_AUDIT.md`](./docs/UPSTREAM_AUDIT.md) — components, templates, props, themes, fonts, assets, utilities, dependencies, exports, examples, Satori constraints, adaptations, and unsupported items.

Every audited upstream item must be implemented, explicitly adapted for Svelte/Satori, or called out as unsupported there. Generated output tests, rather than serialized Svelte markup alone, are the release gate.
