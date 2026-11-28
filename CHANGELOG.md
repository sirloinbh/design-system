# Changelog

One section per release of this repository (the package `@sirloinbh/design-tokens` has its own changelog in `packages/design-tokens/`). Add the section in the release PR, newest first, using `node scripts/release-plan.mjs` for the version and the draft. How a release works: [docs/release.md](docs/release.md).

## 1.0.0

The first release. Pinned in project-standards, it replaces the UI kit copy that project-standards delivered itself: the sync then delivers `delivery/ui/` of this tag. `sign-in.tsx` and the service worker files still come from project-standards.

App changes: none needed (no major change). Apps receive the new components, `components/ui/keyboard-inset.ts`, and edits to `dialog.tsx`, `page-header.tsx` and `segmented-control.tsx`.

Changes:

- #10 Add BusyButton and the useBusy hook (patch; docs/changes/10-busy-button.md)
- #11 Add the Disclosure component (patch; docs/changes/11-disclosure.md)
- #1162 Scaffold the design-system repository (patch; docs/changes/1162-scaffold.md)
- #1165 Move the design tokens package and its build to design-system (patch; docs/changes/1165-tokens-package.md)
- #1166 Move the shared UI kit (templates/ui) to design-system (patch; docs/changes/1166-ui-kit.md)
- #1167 Move the design-system docs and UI ADRs here (patch; docs/changes/1167-design-docs.md)
- #1168 Add the UX audit skill to the delivery folder (patch; docs/changes/1168-ux-audit-skill.md)
- #1169 The screen checks live here (minor; docs/changes/1169-screen-checks.md)
- #1172 Design guidelines (patch; docs/changes/1172-guidelines.md)
- #1173 Release flow: a design-system merge reaches all apps (none; docs/changes/1173-release-flow.md)
- #1175 Add PeriodNav and the period helpers (patch; docs/changes/1175-period-nav.md)
- #1176 Add BarChart, LineChart and ChartBoundary (patch; docs/changes/1176-charts.md)
- #1180 Scaffold the Storybook showcase (patch; docs/changes/1180-storybook-scaffold.md)
- #1181 Showcase foundation pages (patch; docs/changes/1181-foundations.md)
- #1182 Showcase component pages (patch; docs/changes/1182-component-stories.md)
- #1183 Showcase layout and pattern pages (patch; docs/changes/1183-layout-patterns.md)
- #1184 Showcase tools (patch; docs/changes/1184-showcase-tools.md)
- #1185 Showcase search and guidelines pages (patch; docs/changes/1185-search-guidelines.md)
- #1186 Showcase tests: visual screenshots and accessibility checks (patch; docs/changes/1186-showcase-tests.md)
- #12 Add ToggleChips, List and ListItem (patch; docs/changes/12-toggle-chips-list.md)
- #1209 Build delivery/ui/frontend from the kit (none; docs/changes/1209-delivery-build.md)
- #13 Add PageHeader backTo, ExternalLink and NavTabs (patch; docs/changes/13-header-link-tabs.md)
- #14 Add the ScoreField rating component (patch; docs/changes/14-score-field.md)
- #15 Add FileField, downloadBlob and BackupSection (patch; docs/changes/15-file-backup.md)
- #16 Add ResponsiveModal and ConfirmDelete (patch; docs/changes/16-modal-confirm-delete.md)
- #17 Add the ListToolbar component (patch; docs/changes/17-list-toolbar.md)
- #18 Add MonthCalendar and Heatmap (patch; docs/changes/18-month-calendar.md)
- #32 SegmentedControl inactive segments contrast (patch; docs/changes/32-segmented-contrast.md)
- #7 Add the ProgressBar component (patch; docs/changes/7-progress-bar.md)
- #8 Add the Table component family (patch; docs/changes/8-table.md)
- #9 Add LoadingRegion, LoadFailed and RetryButton (patch; docs/changes/9-load-state.md)
