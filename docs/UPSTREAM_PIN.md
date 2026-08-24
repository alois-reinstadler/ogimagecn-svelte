# Upstream source pin

This port uses the React repository at
[`shadcn-labs/ogimagecn`](https://github.com/shadcn-labs/ogimagecn) as its
source of truth.

| Field | Pinned value |
| --- | --- |
| Repository | `https://github.com/shadcn-labs/ogimagecn.git` |
| Commit | `e1b91b3d9e8e8cebe40fb5910e60f076e92aace4` |
| Git tree | `7517dbc377864d62481283db3f5c570eec616de8` |
| Commit date | `2026-08-19T00:54:22+05:30` |
| Commit subject | `Refactor className strings in context-menu.tsx` |
| Branch observed | `main` |
| Observation date | `2026-08-24` |
| Release tag | None points at this commit |

Every upstream link in the audit is a permalink at this commit. Moving
`main` is not an input to a release build.

Reproduce the checkout without changing the application's Git remote:

```sh
git clone --filter=blob:none https://github.com/shadcn-labs/ogimagecn.git .upstream/ogimagecn
git -C .upstream/ogimagecn checkout --detach e1b91b3d9e8e8cebe40fb5910e60f076e92aace4
test "$(git -C .upstream/ogimagecn rev-parse HEAD)" = e1b91b3d9e8e8cebe40fb5910e60f076e92aace4
```

The upstream project is MIT licensed. External example images and remotely
loaded fonts are separate inputs and are called out in the audit; the upstream
MIT license must not be treated as a license grant for those resources.
