# #1168 Add the UX audit skill to the delivery folder

- Issue: [sirloinbh/project-standards#1168](https://github.com/sirloinbh/project-standards/issues/1168) (epic #1155)
- Branch: `docs/1168-ux-audit-skill`
- Related: project-standards PR for #1168 (moves the fallback copy to `templates/ui/skills/`), [release](../release.md)
- Release: patch

## Changes — 2026-11-28

- `delivery/ui/skills/std-ux-audit/SKILL.md`: the UX and accessibility audit skill the apps run. Text is byte for byte the copy in project-standards `templates/ui/skills/std-ux-audit/SKILL.md`; its links point to [guidelines](../guidelines.md) and [UI components](../ui-components.md) here. `{{project.title}}` is filled in per app by the central sync.
- `.prettierignore`: `delivery/` is not formatted, because sync compares file hashes.
- `docs/release.md`: names the skill as part of `delivery/ui/`.

## Verification

- `npm run check`.
