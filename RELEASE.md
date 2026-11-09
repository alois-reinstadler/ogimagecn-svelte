# Release preparation

The first release is the 22-component Node/server catalog with Satori SVG and optional native resvg PNG output, typed props and explicit fonts. It excludes the upstream orphan Peggy component, arbitrary browser CSS, browser-side rendering and a hosted rendering service. Callers own image-fetch policies, request limits and cache isolation.

The proposed npm name is `ogimagecn-svelte` (0.1.0); the copy-source registry is a different distribution channel at `https://alois-reinstadler.github.io/ogimagecn-svelte/r/{name}.json`. An npm registry 404 is not name reservation or permission to publish. Verify the exact archive and all referenced public fonts/assets before enabling public installation instructions.

On 2026-11-09 the public simple/runtime registry JSON returned HTTP 200, but all eleven font URLs referenced by runtime returned 404. The candidate now copies the licensed fonts into both static asset roots during registry generation, and docs builds generate the registry. The hosted runtime also used readFile on HTTPS URLs; this candidate fixes that and executes the font loader in a fresh consumer. These fixes are local until an independently authorized deployment; the existing hosted registry is not yet qualified.

Public image probes returned 200 for the Webflow CDN logo and three Picsum fixtures, but 403 for `https://www.shiori.sh/logo.png`. Fixture URLs are not durable production assets: supply owned, reachable image URLs/data before using those templates in production. This external asset remains an explicit release limitation.

The two outstanding local documentation files add a dynamic OG endpoint guide and navigation. They are excluded from this candidate. Recommend reviewing and including them after changing any installation instructions that assume npm publication; owner decides.

MIT code attribution remains in LICENSE and UPSTREAM.md; bundled Noto fonts retain OFL notices. Supported Node versions must satisfy the package engines and have a compatible native resvg binary.

## Owner checklist

- [ ] Select the exact source commit, version, package identity and archive hash.
- [ ] Resolve the limitations and inclusion decisions above.
- [ ] Run the repository gate on the final candidate and retain logs.
- [ ] Inspect packed exports, files, dependency closure and third-party notices.
- [ ] Verify public documentation and assets independently of local tests.
- [ ] Obtain separate publication approval; this preparation does not publish, tag or merge.
