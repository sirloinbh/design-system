# #102 Release v1.1.0: CHANGELOG section

Release: none

The 1.1.0 section covers the 16 change records on main since v1.0.1 (v1.0.2 was cut from `release/1.0.x`, so `node scripts/release-plan.mjs` lists #91 again and proposes 1.0.2, which is already tagged; #91 stays only in the 1.0.2 section). The version is minor: #57 and #70 carry `Release: minor`, the other records add helpers or align values, and no app edit is needed. After the merge the user pushes the tag `v1.1.0` on the merge commit; `release.yml` then creates the Release and opens the pin PR in project-standards.

Note: the release plan reads `Release:` only on its own line, so the `- Release: minor` lines of #57 and #70 (list items) were counted as patch; the plan proposed `patch` for that reason too.

## Format fix found by the pre-merge app check

Rendering this release into a clean health-log clone (project-standards `scripts/release-app-check.mjs` logic, with this checkout as the release) failed the app's `prettier --check` on four new kit files: `src/lib/format.test.ts`, `icon-rules.mjs`, `use-url-param.ts` and `use-url-param.test.tsx`. `.prettierignore` ignored all of `src/lib/` as byte-for-byte moved files, so new files there were never formatted. It now ignores only the five moved files (`ai-chat`, `ai-chat.test`, `api.test`, `use-ai-chat`, `use-notice`), the four files are formatted, and `delivery/ui` is rebuilt.
