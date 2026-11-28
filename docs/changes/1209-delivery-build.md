# #1209 Build delivery/ui/frontend from the kit

Release: none

Epic #1156 (first release, v1.0.0). A release hands `delivery/ui/` to the project-standards sync, but only the skill was there: the kit files stayed in `src/` and `public/`. Pinning a release would have left the apps without the kit.

## Change

| File | Content |
|---|---|
| `scripts/build-delivery.mjs` | `npm run delivery` copies the git-tracked files of `src/` and `public/` (without stories) to `delivery/ui/frontend/`; `npm run delivery:check` fails with the fix command when the copy is stale. `delivery/ui/skills` is not touched |
| `delivery/ui/frontend/` | The generated copy (134 files) |
| `scripts/test/build-delivery.test.mjs` | Build, stale detection, and that this repository is up to date |
| `package.json`, `eslint.config.mjs` | The two scripts; `delivery:check` is part of `check`; the copy is not linted twice (prettier already ignores `delivery/`) |

## Working here

After you change a file under `src/` or `public/`, run `npm run delivery` and commit the result. `check` (and CI) fails when you forget.

## Compared with templates/ui

The files that stay in project-standards (`sign-in.tsx`, `service-worker.ts`, `service-worker.test.tsx`) are not here; project-standards still delivers them (project-standards#1207). Every other moved kit file is identical to `templates/ui` except what this repository changed since the move: the new components and `components/ui/keyboard-inset.ts`, and edits to `dialog.tsx`, `page-header.tsx`, `page-header.test.tsx` and `segmented-control.tsx`.
