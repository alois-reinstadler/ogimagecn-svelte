# Changelog

## Unreleased — release preparation

- Exclude documentation-only site modules from the npm archive and check the packed file boundary.
- Restore the pinned upstream Shadcn Labs copyright notice alongside port attribution.
- Include licensed font assets in generated static sites and regenerate the registry before docs builds.
- Fix the registry font loader to fetch hosted fonts instead of passing HTTPS URLs to Node readFile; execute the installed loader in the consumer gate.
- Document the supported release boundary, upstream attribution and remaining qualification decisions.
- Include release notes and attribution in the package file allowlist.
