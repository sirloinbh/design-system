# #13 Add PageHeader backTo, ExternalLink and NavTabs

- Issue: [#13](https://github.com/sirloinbh/design-system/issues/13)
- Branch: `feat/13-header-link-tabs`
- Related: sirloinbh/project-standards#1156 (epic), the [component survey](https://github.com/sirloinbh/project-standards/blob/main/docs/design-system-component-survey.md) rows 14, 16 and 17
- Release: minor

## Changes — 2026-11-28

- `src/components/ui/page-header.tsx`: new optional prop `backTo` (`{ to, label }`). It renders a router `Link` with an arrow above the title, 44px tall (48px on touch). Without it the output is unchanged. This edits a file the apps receive, so it ships in the next release as a backward-compatible addition.
- `src/components/external-link/external-link.tsx` and `web-link.ts`: `ExternalLink` opens in a new tab with `rel="noopener noreferrer"` and the accessible name ends with "(opens in a new tab)". `safeWebUrl` accepts only absolute `http` and `https` addresses; anything else renders as plain text.
- `src/components/nav-tabs/nav-tabs.tsx`: `NavTabs` is a named `<nav>` of router `NavLink`s; the current page gets `aria-current="page"`, `end` stops a parent tab matching its children, the row scrolls sideways at 360px, tabs are 44px (48px on touch).
- Tests and stories for all three (`Components/PageHeader`, `Components/ExternalLink`, `Components/NavTabs`).
- Decision on the open question in the card: money-ledger's in-page `role="tablist"` switches a view that is not a route, so `SegmentedControl` covers it; `NavTabs` is for route tabs only. The dev-career-portfolio, life-journal and money-ledger migration cards apply this.
- The app originals were not available in this checkout, so the APIs follow the survey notes.

## Verification

- `npm run check` passes (Tests 226 passed | 3 skipped (229)).
