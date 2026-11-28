# UI element spec

The exact spec of every UI element the kit exports (with the icon map from #70), so the apps and reviews check against one source (#68). Each section lists the values the component has, read from the code, and under "Differs from the spec" every place where it still breaks the rules below (the open list is at the end).

Rules the spec holds every element to ([guidelines](guidelines.md), `AGENTS.project.md`):

| Rule                    | Value                                                                                                                                                                                                           |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Control height          | 40px on a pointer screen, 48px on touch (`pointer-coarse:`); a small visual control (checkbox, switch, icon) keeps a 44px press area on every screen                                                            |
| Text size               | 12px minimum; sizes come from the type scale tokens (`text-body` 16, `text-body-sm` 14, `text-caption` 14 muted, `text-meta` 12 muted, `h1` to `h4`), never a raw `text-sm`, `text-xs`, `text-lg` or pixel size |
| Cursor                  | `cursor-pointer` on every control that acts on click; `cursor-not-allowed` on a disabled one                                                                                                                    |
| Focus                   | Visible ring `ring-[3px] ring-ring/50`, never removed, the same strength on every control                                                                                                                       |
| Invalid                 | `border-destructive` plus `ring-destructive/20`, announced with `aria-invalid`                                                                                                                                  |
| Disabled                | `opacity-50`                                                                                                                                                                                                    |
| Colors, spacing, radius | Tokens from `@sirloinbh/design-tokens` only: no color codes, no `text-white`, no `bg-black/50`, no arbitrary radius or width                                                                                    |
| Spacing steps           | 4px steps (`1` = 4px); half steps such as `px-3.5` are not used                                                                                                                                                 |
| Radius                  | `--radius` is 10px: `rounded-sm` 6, `rounded-md` 8 (controls, fields, menus), `rounded-lg` 10 (dialog, sheet, drawer), `rounded-xl` 14 (card, empty state), `rounded-full` (chips, avatars, switch)             |
| Motion                  | Every animation turns off under `motion-reduce:`                                                                                                                                                                |

How to read a section: "pointer" is the default screen, "touch" is `pointer-coarse:`; 1 Tailwind unit is 4px; "inherited" names the component the value comes from. States not listed are not styled.

Shared field look (Input, Textarea, NativeSelect, `src/components/ui/input-styles.ts`): `w-full min-w-0 rounded-md border border-input bg-transparent px-3 text-body shadow-xs md:text-body-sm md:pointer-coarse:text-body dark:bg-input/30`; hover none; focus `border-ring ring-[3px] ring-ring/50`; invalid `border-destructive ring-destructive/20`; disabled `opacity-50 cursor-not-allowed pointer-events-none`; placeholder `text-muted-foreground`.

# Page layout

The page-level parts every app shares: page padding, gaps, content width, top bar and sidebar.

| Item                                                                  | Mobile (<768px)                                                                                                | md (>=768px)                                                            | lg (>=1024px)  | Where                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page padding (`--page-x`, left/right)                                 | 16px (1rem)                                                                                                    | 24px (1.5rem)                                                           | 32px (2rem)    | `main`: `px-[max(var(--page-x),env(safe-area-inset-left))]` (app-shell.tsx:143); footer `px-[var(--page-x)]` (app-shell.tsx:147, no safe-area max)                                                                                                                                                                      |
| Page padding (top/bottom)                                             | `py-6` 24px                                                                                                    | 24px                                                                    | 24px           | `main`, app-shell.tsx:143 (fixed, not a token)                                                                                                                                                                                                                                                                          |
| Section gap (`--section-gap`)                                         | 24px                                                                                                           | 32px                                                                    | 32px           | token only; AppShell does not use it, pages apply it                                                                                                                                                                                                                                                                    |
| Card grid / stack gap (`--stack-gap`, "between cards and form items") | 12px                                                                                                           | 16px                                                                    | 16px           | token only (design-tokens.md:59); no component applies it                                                                                                                                                                                                                                                               |
| Form field gap                                                        | no token of its own: `--stack-gap` per docs (12/16px)                                                          |                                                                         |                | Code: `gap-1.5` (6px) label-to-control inside a field (list-toolbar.tsx:73,115); `gap-3` (12px) between fields in a toolbar (list-toolbar.tsx:67,71); `gap-2` (8px) between controls in a row (backup-section.tsx:89, period-nav.tsx:44); `Card` `gap-6` 24px (ui/card.tsx:9); `Dialog` `gap-4` 16px (ui/dialog.tsx:62) |
| Content max width (`--content-max`)                                   | 100%                                                                                                           | 48rem = 768px                                                           | 72rem = 1152px | `main`: `mx-auto w-full max-w-[var(--content-max)]` (app-shell.tsx:143). It limits only the body column to the right of the sidebar, not the viewport                                                                                                                                                                   |
| Top bar height                                                        | `h-14` 56px + `env(safe-area-inset-top)`                                                                       | same                                                                    | same           | header inner row `h-14` (app-shell.tsx:89); header is `sticky top-0 border-b pt-[env(safe-area-inset-top)]` (line 88)                                                                                                                                                                                                   |
| Top bar side padding                                                  | `pl/pr max(safe-area, 0.5rem)` = 8px                                                                           | `md:px-4` 16px                                                          | 16px           | app-shell.tsx:89; differs from `--page-x`, so the bar edge and the body edge do not line up (24px/32px body vs 16px bar)                                                                                                                                                                                                |
| Sidebar width                                                         | hidden; Sheet menu `w-72` = 288px (app-shell.tsx:96)                                                           | 15rem = 240px (`md:grid-cols-[15rem_minmax(0,1fr)]`, app-shell.tsx:133) | 240px          | `aside` is `sticky top-[calc(3.5rem+env(safe-area-inset-top))] h-[calc(100dvh-3.5rem-env(safe-area-inset-top))]` with `border-r bg-sidebar` (line 134); docs/layout.md:28 says 240px, matches                                                                                                                           |
| Menu item                                                             | `min-h-9` 36px pointer, `pointer-coarse:min-h-11` 44px; `px-3 gap-3 rounded-md text-body-sm`; list `gap-1 p-2` |                                                                         |                | app-shell.tsx:27,36                                                                                                                                                                                                                                                                                                     |
| Footer                                                                | `border-t pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] text-caption`                                       |                                                                         |                | app-shell.tsx:147                                                                                                                                                                                                                                                                                                       |

## Differs from the spec (page level)

- app-shell.tsx:36 `min-h-9` menu items are 36px tall on a pointer screen (rule: 40) and `pointer-coarse:min-h-11` is 44px on touch (rule: 48).
- app-shell.tsx:110 header home link `min-h-11 min-w-11` has no `pointer-coarse:min-h-12` (48px on touch) and no `cursor-pointer` class (an `<a href>` shows the pointer by default).
- app-shell.tsx:89 uses `md:px-4` / 8px instead of `--page-x`; app-shell.tsx:147 footer ignores the left/right safe-area inset that `main` honours (line 143).
- docs/design-tokens.md:86 says touch targets are 44px; AGENTS.project.md says 48px on touch (the code uses 48 in Button, 44 only in NavList).
- docs/layout.md:28 says the body takes the remaining width "up to `--content-max`"; the cap applies to the column beside the 240px sidebar, so it only bites when viewport minus 240px exceeds it: 768px cap from about 1008px viewport, and from 1024px the cap is 1152px, reached only above about 1392px. Between 768px and 1007px the body just fills the column.
- `--section-gap`, `--stack-gap` are defined and documented but used by no shared component (grep of `src/`: no hit); pages must apply them by hand.

# Icons

Every app shows the same icon for the same meaning, at the same size, from one map: `src/lib/icons.ts` (#70). All icons come from `lucide-react` ([ADR-0001](adr/0001-shadcn-ui-icons-emoji.md)). The kit and the apps import common icons from `lib/icons`, not from `lucide-react`; an icon with no meaning in the table (a one-off picture for a menu item, such as `Dumbbell`) is still imported from `lucide-react`.

## Icon by meaning

| Meaning                       | Export                                            | Lucide icon              | Not this                              |
| ----------------------------- | ------------------------------------------------- | ------------------------ | ------------------------------------- |
| Add, create                   | `AddIcon`                                         | `Plus`                   | `CirclePlus`, `SquarePlus`            |
| Remove one, decrease          | `RemoveIcon`                                      | `Minus`                  | `CircleMinus`, `SquareMinus`          |
| Edit                          | `EditIcon`                                        | `Pencil`                 | `Pen`, `PenLine`, `SquarePen`, `Edit` |
| Delete                        | `DeleteIcon`                                      | `Trash2`                 | `Trash`, `Eraser`                     |
| Save                          | `SaveIcon`                                        | `Save`                   | `SaveAll`                             |
| Close, dismiss                | `CloseIcon`                                       | `X`                      | `XCircle`, `CircleX`                  |
| Confirm, selected             | `ConfirmIcon`                                     | `Check`                  | `CheckCheck`                          |
| Back to the previous screen   | `BackIcon`                                        | `ArrowLeft`              | `MoveLeft`, `Undo2`                   |
| Previous item or period       | `PreviousIcon`                                    | `ChevronLeft`            | `ChevronsLeft`                        |
| Next item or period           | `NextIcon`                                        | `ChevronRight`           | `ChevronsRight`                       |
| Expand, open a list           | `ExpandIcon`                                      | `ChevronDown`            | `ArrowDown`, `ChevronsDown`           |
| Collapse                      | `CollapseIcon`                                    | `ChevronUp`              | `ArrowUp`, `ChevronsUp`               |
| Search                        | `SearchIcon`                                      | `Search`                 | `ScanSearch`, `TextSearch`            |
| Filter                        | `FilterIcon`                                      | `ListFilter`             | `Filter`, `Funnel`                    |
| Sort                          | `SortIcon`                                        | `ArrowUpDown`            | `ArrowDownUp`, `ListOrdered`          |
| Settings                      | `SettingsIcon`                                    | `Settings2`              | `Settings`, `Cog`, `Wrench`           |
| Dashboard                     | `DashboardIcon`                                   | `LayoutDashboard`        | `Gauge`, `BarChart3`                  |
| Calendar, date                | `CalendarIcon`                                    | `Calendar`               | `CalendarDays`                        |
| Day log (the daily record)    | `DayLogIcon`                                      | `NotebookPen`            | `NotebookText`, `ClipboardList`       |
| Home                          | `HomeIcon`                                        | `Home`                   | `House`                               |
| Open the menu                 | `MenuIcon`                                        | `Menu`                   | `AlignJustify`, `PanelLeft`           |
| Switch app                    | `AppSwitcherIcon`                                 | `LayoutGrid`             | `Grid`, `Grid3x3`                     |
| Download, export a file       | `DownloadIcon`                                    | `Download`               | `ArrowDownToLine`, `FileDown`         |
| Upload, import a file         | `UploadIcon`                                      | `Upload`                 | `ArrowUpFromLine`, `FileUp`           |
| Backup                        | `BackupIcon`                                      | `DatabaseBackup`         | `HardDriveDownload`                   |
| Sign out                      | `SignOutIcon`                                     | `LogOut`                 | `DoorOpen`, `Power`                   |
| Opens in a new tab            | `ExternalLinkIcon`                                | `ExternalLink`           | `ArrowUpRight`                        |
| Loading                       | `LoadingIcon`                                     | `LoaderCircle`           | `Loader`, `Loader2`, `RefreshCw`      |
| Try again                     | `RetryIcon`                                       | `RotateCcw`              | `RotateCw`, `RefreshCcw`              |
| AI assistant                  | `AssistantIcon`                                   | `Bot`                    | `Sparkles`, `MessageCircle`           |
| Send a message                | `SendIcon`                                        | `Send`                   | `SendHorizontal`                      |
| Nothing here yet (empty)      | `EmptyIcon`                                       | `Inbox`                  | `PackageOpen`, `FolderOpen`           |
| Time                          | `TimeIcon`                                        | `Clock`                  | `Clock3`, `Timer`                     |
| Light, dark, system mode      | `LightModeIcon`, `DarkModeIcon`, `SystemModeIcon` | `Sun`, `Moon`, `Monitor` | `SunMedium`, `MoonStar`, `Laptop`     |
| Selected dot in a radio group | `RadioDotIcon`                                    | `Circle`                 | `CircleDot`                           |

A new meaning is added to `icons.ts` and to this table together, and to `ICON_MEANINGS` in `src/lib/icon-rules.mjs`; a test keeps the three in step.

## Size and stroke

| Name      | Size | Class    | Where                                                                              |
| --------- | ---- | -------- | ---------------------------------------------------------------------------------- |
| `inline`  | 16px | `size-4` | Inside text, buttons and form controls. `Button` sizes its icon to this by default |
| `menu`    | 20px | `size-5` | The main menu and other lists of destinations                                      |
| `feature` | 24px | `size-6` | An empty state, and the app icon in the top bar                                    |

- The sizes are `ICON_SIZE` in `icons.ts` (`ICON_SIZE.menu`), written as full class names so Tailwind finds them.
- The stroke width is the `lucide-react` default (2). Do not set `strokeWidth`.
- Two shapes are not icons and keep their own size: the check mark inside the 16px checkbox (14px) and the dot of a radio item (8px).
- An icon next to text is decorative: `aria-hidden`. An icon-only control gets its name from `aria-label`.

## Icon or emoji

Icons mark actions and navigation. Emoji (Fluent Emoji Flat, ADR-0001) are for content a person chooses or reads as a picture, for example a mood or a category the person picks. Do not use an emoji where an icon in the table exists, and do not use an icon where the person chose an emoji.

## Keeping apps on the map

`src/lib/icon-rules.mjs` exports `iconImportConfig()`, an ESLint config entry that reports a `lucide-react` import of any icon in the table or any alternate listed in "Not this". An app turns it on in its `eslint.config.mjs`:

```js
import { iconImportConfig } from './src/lib/icon-rules.mjs';

export default [...config, iconImportConfig()];
```

The message names the shared icon to import instead.

# Components in `src/components/ui/`

## AlertBanner

- Source: `src/components/ui/alert-banner.tsx`
- Size: height by content (py-3 + text); full width of parent (flex, no w-*)
- Padding / gap: `px-4 py-3` (16px / 12px), `gap-x-3 gap-y-2` (12px / 8px)
- Radius / border: `rounded-md border border-l-4 border-destructive/40 border-l-destructive`
- Text: `text-body-sm text-foreground` (14px)
- Icon size: none (no icon slot; `action` is a ReactNode)
- States: default `bg-destructive/10`; hover none; active none; focus none; disabled none; invalid n/a (always destructive); loading none; selected none. `role="alert"`.
- Differs from the spec:
  - Only a destructive look; the file comment says "failure or warning" (alert-banner.tsx:5) but there is no warning variant (Badge has one).

## Badge

- Source: `src/components/ui/badge.tsx` (also exports `badgeVariants`)
- Size: no fixed height; about 26px (line 20px + `py-0.5` + 2px border); `w-fit`, `whitespace-nowrap`
- Padding / gap: `px-2 py-0.5` (8px / 2px), `gap-1` (4px)
- Radius / border: `rounded-md border` (border-transparent except `outline`)
- Text: `text-caption font-medium` (14px)
- Icon size: `[&>svg]:size-3` (12px)
- States: default per variant: default `bg-primary text-primary-foreground`, secondary `bg-secondary text-secondary-foreground`, destructive `bg-destructive text-destructive-foreground` (dark `bg-destructive/60`), success `bg-success text-success-foreground`, warning `bg-warning text-warning-foreground`, outline `text-foreground`. hover (only when `asChild` renders an `<a>`): `[a&]:hover:bg-primary/90`, secondary `/90`, destructive `/90`, outline `bg-accent text-accent-foreground`; success and warning none. active none. focus `focus-visible:border-ring ring-[3px] ring-ring/50`. disabled none. invalid none. loading none. selected none.
- Differs from the spec:
  - success and warning have no hover while the others do (badge.tsx:15-16).

## Button

- Source: `src/components/ui/button.tsx` (also exports `buttonVariants`)
- Size: default `h-10` 40px / touch `min-h-12` 48px; sm `h-10` 40px / touch `min-h-12` 48px; lg `h-12` 48px / 48px; icon `size-10` 40px / touch `size-12` 48px. Width by content (`shrink-0`, `whitespace-nowrap`); icon is square.
- Padding / gap: default `px-4 py-2` (16/8), with only an svg child `px-3` (12); sm `px-3` (12), `gap-1.5` (6), svg-only `px-2.5` (10); lg `px-6` (24), svg-only `px-4` (16); base `gap-2` (8)
- Radius / border: `rounded-md`; `outline` variant `border border-input`; no border otherwise
- Text: `text-body-sm font-medium` (14px)
- Icon size: `size-4` (16px) unless the svg sets its own `size-*`
- States: default per variant: default `bg-primary text-primary-foreground`, destructive `bg-destructive text-destructive-foreground` (dark `bg-destructive/60`), outline `bg-background`, secondary `bg-secondary text-secondary-foreground`, ghost none, link `text-primary`. hover: default `bg-primary/90`, destructive `bg-destructive/90`, outline and ghost `bg-accent text-accent-foreground`, secondary `bg-secondary/80`, link `underline`. active none. focus `ring-[3px] ring-ring/50` (destructive `ring-destructive/20`, dark `/40`), `outline-none`. disabled `opacity-50 cursor-not-allowed`. aria-disabled `opacity-50 pointer-events-none`. invalid `border-destructive ring-destructive/20`. loading none (callers put a Spinner inside). selected none.
- Differs from the spec:
  - `aria-disabled:pointer-events-none` (button.tsx:11) removes the `cursor-not-allowed` look for the aria-disabled state that ConfirmDialog and NumberInput rely on; the guidelines say disabled controls show `cursor-not-allowed`.
  - `lg` has no `pointer-coarse:` rule, harmless because it is already 48px (button.tsx:26).

## Card

- Source: `src/components/ui/card.tsx` (parts: CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter)
- Size: Card height by content, full width (flex-col); parts have no size
- Padding / gap: Card `py-6` (24) with `gap-6` (24); CardHeader `px-6` (24), `gap-1.5` (6), `[.border-b]:pb-6` (24); CardContent `px-6`; CardFooter `px-6`, `[.border-t]:pt-6`; CardAction none (grid placement)
- Radius / border: `rounded-xl border` (14px), `shadow-sm`
- Text: Card `text-card-foreground`; CardTitle `text-title` (16px, 18px from md; renders `h3` by default, `asHeading` h2/h3/h4); CardDescription `text-body-sm text-muted-foreground`
- Icon size: none
- States: default `bg-card`; hover none; active none; focus none; disabled none; invalid none; loading none; selected none.
- Differs from the spec:
  - Card uses `rounded-xl` while Dialog, Drawer and Sheet use `rounded-lg` (dialog.tsx:62, drawer.tsx:40); likely intended (page card vs overlay) but undocumented.
  - CardDescription exists although the screen text rule removes card descriptions (docs/guidelines.md:36).

## Checkbox

- Source: `src/components/ui/checkbox.tsx`
- Size: 16px box (`size-4`) on pointer and touch; press area 44x44px only on touch via `pointer-coarse:after:-inset-[15px]` (14 + 30 = 44)
- Padding / gap: none
- Radius / border: `rounded-sm border border-input`, `shadow-xs`
- Text: none
- Icon size: check `size-3.5` (14px)
- States: default `dark:bg-input/30`; hover none; active none; focus `focus-visible:border-ring ring-[3px] ring-ring/50`; disabled `opacity-50 cursor-not-allowed`; invalid `aria-invalid:border-destructive` (no ring); loading none; selected (checked) `border-primary bg-primary text-primary-foreground` (dark `bg-primary`). Cursor `cursor-pointer`.
- Differs from the spec: none.

## Combobox

- Source: `src/components/ui/combobox.tsx`
- Size: the field is an Input (40px / touch 48px, full width, see Input); the list is `absolute inset-x-0` (field width), `max-h-72` (288px) scrolling; option rows about 32px on pointer (`py-1.5` + 20px line), `pointer-coarse:min-h-11` (44px) on touch
- Padding / gap: list `p-1` (4), `mt-1` (4); option `px-2 py-1.5` (8 / 6); group label `px-2 py-1.5`; empty message `px-3 py-2` (12 / 8)
- Radius / border: list `rounded-md border`, `shadow-md`; option `rounded-sm`; empty message `rounded-md border shadow-md`
- Text: field as Input (`text-body md:text-body-sm md:pointer-coarse:text-body`); option `text-body-sm` (14px); group label `text-caption font-medium text-muted-foreground`; empty message `text-body-sm text-muted-foreground`
- Icon size: none
- States: field = Input states. option default none, hover and keyboard-active `bg-accent text-accent-foreground` (hover sets active), active none, focus stays on the field (`aria-activedescendant`), disabled none (comes from the Input), invalid from Input, loading none, selected `aria-selected` on the active option only. Cursor `cursor-pointer` on options. List and empty message use `bg-popover text-popover-foreground`.
- Differs from the spec: none.

## ConfirmDialog

- Source: `src/components/ui/confirm-dialog.tsx`
- Size: a Dialog (see Dialog) with `showCloseButton={false}`; the two buttons are Button default (40px / touch 48px)
- Padding / gap: inherited from Dialog (`p-6`, `gap-4`, footer `gap-2`)
- Radius / border: inherited from Dialog
- Text: DialogTitle and DialogDescription (see Dialog); buttons `text-body-sm`
- Icon size: Spinner `sm` 16px inside the confirm button
- States: default Cancel `outline`, confirm `destructive` (or `default` when `destructive={false}`); hover, focus from Button; pending: both buttons `aria-disabled` (opacity-50, pointer-events-none), confirm `aria-busy` with Spinner; invalid none; selected none.
- Differs from the spec:
  - Pending look drops `cursor-not-allowed` (see Button, button.tsx:11).
  - Spinner label "Working" is fixed English text with no prop (confirm-dialog.tsx:93).

## DateField

- Source: `src/components/ui/date-field.tsx` (also exports TimeField, see below)
- Size: row = Input (40px / touch 48px, `flex-1`) + icon Button `size-10` (40px / touch `size-12` 48px), `gap-1` (4); width fills the parent unless `className` sets one. Popover day cell `size-10` (40px) / touch `size-12` (48px).
- Padding / gap: popover `p-3` (12); month header `mb-2` (8), `gap-2`; footer `mt-2`, Today / Clear are Button `sm`
- Radius / border: popover `rounded-md border`, `shadow-md`; day cell `rounded-md`
- Text: field as Input plus `md:pointer-coarse:text-base` (16px on touch at md and up); day cell `text-body-sm`; month title `text-body-sm font-semibold`; weekday heads `text-caption font-medium text-muted-foreground`
- Icon size: Calendar 16px (Button default), chevrons 16px
- States: day cell default none; hover `bg-accent`; focus `ring-[3px] ring-ring/50`; disabled (outside min/max) `opacity-50 pointer-events-none`; selected `group-aria-selected:bg-primary text-primary-foreground`; today `font-semibold underline` (`aria-[current=date]`); days of other months `text-muted-foreground`. Field states from Input; trigger Button disabled when the field is disabled or readOnly. Popover `bg-popover text-popover-foreground`.
- Differs from the spec: none.

## TimeField

- Source: `src/components/ui/date-field.tsx`
- Size: same row as DateField; hour grid `grid-cols-6 gap-1`: cells 40px (touch 48px), so 6 x 40 + 5 x 4 = 260px (touch 308px); 24 hour cells and 12 minute cells (5-minute steps)
- Padding / gap: popover `p-3`; groups `gap-3` (12); group label `mb-1` (4); grid `gap-1` (4)
- Radius / border: as DateField
- Text: cells `text-body-sm`; group labels `text-caption font-medium text-muted-foreground`
- Icon size: Clock 16px
- States: cell hover `bg-accent`; focus `ring-[3px] ring-ring/50`; selected (`aria-pressed`) `bg-primary text-primary-foreground`; disabled `opacity-50` (inherited cell class); others as DateField.
- Differs from the spec: none.

## DateStepper

- Source: `src/components/ui/date-stepper.tsx` (also exports RangeSummary, see below)
- Size: row of optional ghost icon Buttons (`size-10` 40px / touch `size-12` 48px) around a DateField with `w-52` (208px)
- Padding / gap: `gap-1` (4)
- Radius / border: inherited from Button and DateField
- Text: inherited from DateField
- Icon size: chevrons 16px (Button default), `text-muted-foreground`
- States: arrows Button ghost: hover `bg-accent text-accent-foreground`, focus `ring-[3px] ring-ring/50`, disabled `opacity-50`; field states from DateField; draft (half typed) text kept until blur.
- Differs from the spec: none.

## RangeSummary

- Source: `src/components/ui/date-stepper.tsx`
- Size: a `<p>` by content, full width
- Padding / gap: `mt-4 mb-5` (16 / 20); note `ml-2.5` (10)
- Radius / border: none
- Text: `text-meta text-foreground` (12px); note `text-muted-foreground`
- Icon size: none
- States: none
- Differs from the spec: none.

## Dialog

- Source: `src/components/ui/dialog.tsx` (parts: DialogTrigger, DialogClose, DialogOverlay, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription)
- Size: DialogContent `w-full max-w-[calc(100%-2rem)]`, from 640px `sm:max-w-lg` (512px), `max-h-[calc(100dvh-2rem)]` scrolling, centred. `layout`: `center` (default) keeps the box below 640px, `sheet` sticks it to the bottom (`max-sm:bottom-[var(--keyboard-inset,0px)] max-w-none`), `full` fills the screen (`max-sm:h-[calc(100dvh-var(--keyboard-inset,0px))]`). Close button `size-8` (32px) / touch `size-11` (44px).
- Padding / gap: content `p-6` (24), `gap-4` (16); header `gap-2` (8); footer `gap-2` (8), `flex-col-reverse`, from sm `flex-row justify-end`; close button `top-3 right-3` (12)
- Radius / border: content `rounded-lg border` (10px; `sheet` `max-sm:rounded-b-none`, `full` `rounded-none border-0`), `shadow-lg`; close button `rounded-sm`
- Text: DialogTitle `text-title` (16px, 18px from md); DialogDescription `text-body-sm text-muted-foreground`; header `text-center sm:text-left`; close label `sr-only` "Close"
- Icon size: close X `[&_svg]:size-4` (16px)
- States: content `bg-background`; overlay `bg-overlay`; open/closed fade and zoom animations (off with `motion-reduce:animate-none`); close button default `opacity-70`, hover `opacity-100`, focus `ring-[3px] ring-ring/50`, disabled none; invalid none; loading none; selected none.
- Differs from the spec: none.

## Drawer

- Source: `src/components/ui/drawer.tsx` (parts: DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription)
- Size: bottom panel `inset-x-0 bottom-0`, full width, `max-h-[80dvh]`, `mt-24` (96px); grab handle `h-2 w-24` (8 x 96px); close button `size-10` (40px) / touch `size-12` (48px)
- Padding / gap: handle `mt-4` (16); header `p-4` (16), `gap-1.5` (6); footer `p-4`, `gap-2` (8), `mt-auto`; content `pb-[env(safe-area-inset-bottom)]`; close `top-3 right-3`
- Radius / border: `rounded-t-lg border-t` (10px top); handle `rounded-full`; close `rounded-sm`
- Text: DrawerTitle `font-semibold text-foreground` (no size); DrawerDescription `text-body-sm text-muted-foreground`; header `text-center sm:text-left`
- Icon size: close X 16px
- States: content `bg-background`; handle `bg-muted`; overlay `bg-overlay`; close default `opacity-70`, hover `opacity-100`, focus `ring-[3px] ring-ring/50`; others none.
- Differs from the spec:
  - Radius `rounded-t-lg` consistent with Dialog; footer is always `flex-col` while DialogFooter goes `sm:flex-row` (drawer.tsx:66 vs dialog.tsx:92).

## DropdownMenu

- Source: `src/components/ui/dropdown-menu.tsx` (parts: DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator)
- Size: content `min-w-[8rem]` (128px), `max-h` = available height, scrolling; item `min-h-10` (40px), `pointer-coarse:min-h-12` (48px) on touch; separator `h-px`
- Padding / gap: content `p-1` (4), `sideOffset` 4; item `px-2 py-1.5` (8 / 6), `gap-2` (8); checkbox and radio items `pl-8` (32), indicator `left-2` in a `size-3.5` box; label `px-2 py-1.5`; separator `-mx-1 my-1`
- Radius / border: content `rounded-md border`, `shadow-md`; item `rounded-sm`
- Text: item `text-body-sm`; label `text-caption font-medium text-muted-foreground`
- Icon size: item svg `size-4` (16px); check `size-4`; radio dot `size-2` (8px)
- States: content `bg-popover text-popover-foreground`; item default none; hover/focus `focus:bg-accent focus:text-accent-foreground`; destructive item `text-destructive`, `focus:bg-destructive/10`; disabled `opacity-50 pointer-events-none`; selected (checkbox/radio) shows the indicator; invalid none; loading none. Items `cursor-pointer`.
- Differs from the spec:
  - Disabled item has `pointer-events-none` only, no `cursor-not-allowed` (dropdown-menu.tsx:42).
  - DropdownMenuTrigger has no styling of its own; the caller supplies a Button (dropdown-menu.tsx:13).

## EmptyState

- Source: `src/components/ui/empty-state.tsx`
- Size: `<section>` by content, full width; icon circle `size-12` (48px)
- Padding / gap: `px-6 py-10` (24 / 40), `gap-3` (12); action wrapper `mt-2` (8); description `max-w-sm` (384px)
- Radius / border: `rounded-xl border border-dashed` (14px)
- Text: title `text-body font-semibold` (16px, `h2` default, `headingLevel` h2/h3/h4); description `text-body-sm text-muted-foreground`
- Icon size: `[&_svg]:size-6` (24px) in a `rounded-full bg-muted text-muted-foreground` circle
- States: none (static)
- Differs from the spec:
  - `description` is an explanatory text slot that the screen text rule asks to remove (docs/guidelines.md:36 names PageHeader and card descriptions; empty-state.tsx:36).

## FieldError

- Source: `src/components/ui/field.tsx`
- Size: `block`, by content; renders nothing without children
- Padding / gap: none
- Radius / border: none
- Text: `text-caption font-semibold text-destructive` (14px)
- Icon size: none
- States: default `text-destructive`; others none
- Differs from the spec: none.

## Input

- Source: `src/components/ui/input.tsx`
- Size: `h-10` (40px) / touch `min-h-12` (48px); `w-full min-w-0`
- Padding / gap: `px-3` (12) from fieldClasses, `py-1` (4); file button `file:h-7` (28px)
- Radius / border: `rounded-md border border-input` (8px), `shadow-xs`
- Text: `text-base` (16px) below md, `md:text-body-sm` (14px) from md; file button `file:text-body-sm file:font-medium`
- Icon size: none
- States: see fieldClasses (default `bg-transparent`, dark `bg-input/30`; hover none; active none; focus `border-ring ring-[3px] ring-ring/50`; disabled `opacity-50 cursor-not-allowed`; invalid `border-destructive ring-destructive/20`; loading none; selected `selection:bg-primary selection:text-primary-foreground`)
- Differs from the spec: none.

## Label

- Source: `src/components/ui/label.tsx`
- Size: by content, `flex items-center`; `leading-none`
- Padding / gap: `gap-2` (8)
- Radius / border: none
- Text: `text-body-sm leading-none font-medium` (14px)
- Icon size: none
- States: disabled (peer or group disabled) `opacity-50`, `peer-disabled:cursor-not-allowed`; others none
- Differs from the spec:
  - A clickable label (for a control) has no `cursor-pointer` (label.tsx:11); minor, since it only forwards a click.
  - `leading-none` overrides the token line height (label.tsx:11).

## Notice

- Source: `src/components/ui/notice.tsx`
- Size: by content; two always-mounted `<p>` live regions (`role="status"`, `role="alert"`)
- Padding / gap: none
- Radius / border: none
- Text: `text-body-sm` (14px)
- Icon size: none
- States: status `text-muted-foreground`; error `text-destructive`; others none
- Differs from the spec: none.

## NumberInput

- Source: `src/components/ui/number-input.tsx` (also exports NumberValueInput, same visuals)
- Size: row of Button outline icon (`size-10` 40px / touch `size-12` 48px) + Input (`h-10` / touch `min-h-12`, `flex-1`) + icon Button; fills the parent width
- Padding / gap: `gap-1` (4); input `text-center`
- Radius / border: from Button outline and Input (`rounded-md border border-input`)
- Text: Input (`text-base md:text-body-sm`)
- Icon size: Minus and Plus 16px (Button default)
- States: from Button and Input; at a limit the button gets `aria-disabled` with `aria-disabled:cursor-not-allowed aria-disabled:opacity-50`; disabled or readOnly disables both buttons; others none.
- Differs from the spec:
  - `aria-disabled:cursor-not-allowed` never shows because Button sets `aria-disabled:pointer-events-none` (number-input.tsx:41 vs button.tsx:11).

## PageHeader

- Source: `src/components/ui/page-header.tsx`
- Size: full width block; back link `min-h-11` (44px) / touch `pointer-coarse:min-h-12` (48px); actions by content
- Padding / gap: root `gap-4` (16); text column `gap-2` (8); back link `-ml-2 px-2` (8), `gap-1` (4); actions `gap-2`; below md stacked (`flex-col items-start`), from md `md:flex-row md:items-center md:justify-between`
- Radius / border: back link `rounded-md`
- Text: `h1` (token h1: 24px, 30px from md, via tailwind.css base) ; eyebrow `text-caption font-semibold tracking-widest uppercase text-muted-foreground`; description `text-body text-muted-foreground`; back link `text-body-sm text-muted-foreground`
- Icon size: back arrow `size-4` (16px)
- States: back link default `text-muted-foreground`; hover `text-foreground underline`; focus `ring-[3px] ring-ring/50`; others none. Cursor `cursor-pointer`.
- Differs from the spec:
  - `description` is the kind of explanatory text the screen text rule removes (docs/guidelines.md:36; page-header.tsx:50).
  - Back link is 44px on a pointer screen, above 40px; fine. It is a router `Link` styled by hand, not a Button (page-header.tsx:40).

## SegmentedControl

- Source: `src/components/ui/segmented-control.tsx`
- Size: group `inline-flex max-w-full flex-wrap`; item `min-h-10` (40px) on pointer, `pointer-coarse:min-h-12` (48px) on touch; group height 48px on pointer (40 + 2 x 4 padding); width by content
- Padding / gap: group `p-1` (4), `gap-1` (4); item `px-3` (12)
- Radius / border: group `rounded-md` (8px); item `rounded-sm` (6px); no border
- Text: `text-body-sm` (14px), `text-foreground/70`
- Icon size: none
- States: group `bg-muted`; item default `text-foreground/70`; hover `text-foreground`; active none; focus `ring-[3px] ring-ring` (not `/50`); disabled none; invalid none; loading none; selected (`data-[state=on]`) `bg-card font-medium text-foreground`. Cursor `cursor-pointer`. Clicking the selected item keeps it and calls `onReselect`.
- Differs from the spec: none.

## Select

- Source: `src/components/ui/select.tsx` (parts: SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator)
- Size: trigger `data-[size=default]:h-10` (40px) / `data-[size=sm]:h-10` (40px), both `pointer-coarse:min-h-12` (48px), `w-fit`; item `min-h-10` (40px) on pointer, `pointer-coarse:min-h-12` (48px); content `min-w-[8rem]` (128px), at least the trigger width in popper mode
- Padding / gap: trigger `px-3 py-2` (12 / 8), `gap-2` (8); content viewport `p-1` (4); item `py-1.5 pr-8 pl-2`, `gap-2`; label `px-2 py-1.5`; separator `-mx-1 my-1`, `h-px`
- Radius / border: trigger `rounded-md border border-input`, `shadow-xs`; content `rounded-md border`, `shadow-md`; item `rounded-sm`
- Text: trigger, item `text-body-sm` (14px); label `text-caption text-muted-foreground`
- Icon size: trigger chevron `size-4` `opacity-50`; item check `size-4`; scroll buttons `size-4`
- States: trigger default `bg-transparent`, dark `bg-input/30`; hover dark `bg-input/50` only; focus `border-ring ring-[3px] ring-ring/50`; disabled `opacity-50 cursor-not-allowed`; invalid `border-destructive` (no ring); placeholder `text-muted-foreground`; item hover/focus `bg-accent text-accent-foreground`; item disabled `opacity-50 pointer-events-none`; selected item shows the check. Cursor `cursor-pointer` on trigger and items.
- Differs from the spec:
  - Trigger is `w-fit` while Input and NativeSelect are `w-full` (select.tsx:30).
  - Scroll buttons use `cursor-default` (select.tsx:62, 74), expected for hover scroll.

## NativeSelect

- Source: `src/components/ui/native-select.tsx`
- Size: `h-10` (40px) / touch `min-h-12` (48px); wrapper `relative w-full`
- Padding / gap: `px-3` (fieldClasses), `py-1`, `pr-9` (36) for the chevron
- Radius / border: `rounded-md border border-input`, `shadow-xs`
- Text: `text-base` (16px) below md, `md:text-body-sm` from md; options `bg-popover text-popover-foreground`
- Icon size: chevron `size-4` (16px) at `right-3`, `text-muted-foreground`
- States: fieldClasses states plus `cursor-pointer`; selected none
- Differs from the spec: `md:text-body-sm` with no `pointer-coarse:text-base` (see Input).

## Sheet

- Source: `src/components/ui/sheet.tsx` (parts: SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription)
- Size: left/right `h-full w-3/4`, from sm `sm:max-w-sm` (384px); top/bottom `h-auto` full width; close button `size-10` (40px) / touch `size-12` (48px)
- Padding / gap: content `gap-4` (16), safe-area padding top/bottom; header `p-4` (16), `gap-1.5` (6); footer `p-4`, `gap-2`, `mt-auto`; close `right-3`, `top-3` (bottom side) or `top-[calc(env(safe-area-inset-top)+0.75rem)]`
- Radius / border: no radius; `border-l` / `border-r` / `border-b` / `border-t` by side; `shadow-lg`; close `rounded-sm`
- Text: SheetTitle `font-semibold text-foreground` (no size); SheetDescription `text-body-sm text-muted-foreground`
- Icon size: close X 16px
- States: content `bg-background`; overlay `bg-overlay`; slide animations 300ms close / 500ms open (off with `motion-reduce:animate-none`); close default `opacity-70`, hover `opacity-100`, focus `ring-[3px] ring-ring/50`; others none.
- Differs from the spec: none.

## Skeleton

- Source: `src/components/ui/skeleton.tsx` (parts: SkeletonText, SkeletonCard, SkeletonList)
- Size: Skeleton sized by the caller; SkeletonText lines `h-4` (16px), last line `w-3/5`; SkeletonCard title `h-5 w-2/5` (20px) plus 2 text lines; SkeletonList rows with `size-10` (40px) circle, lines `h-4 w-1/2` and `h-3 w-1/3` (12px)
- Padding / gap: SkeletonText `gap-2` (8); SkeletonCard `p-6` (24), `gap-4` (16); SkeletonList `gap-4`, row `gap-3` (12), text column `gap-2`
- Radius / border: Skeleton `rounded-md`; SkeletonCard `rounded-xl border` (same as Card); avatar `rounded-full`
- Text: none
- Icon size: none
- States: default `bg-accent animate-pulse` (off with `motion-reduce:animate-none`), `aria-hidden`; others none
- Differs from the spec: none.

## Toaster

- Source: `src/components/ui/sonner.tsx` (also re-exports `toast` from sonner)
- Size: set by the sonner package; not set in this file
- Padding / gap: not set in this file
- Radius / border: not set in this file; border color `var(--border)`
- Text: not set in this file (sonner default, not checked against the type scale)
- Icon size: not set in this file
- States: colors via `--normal-bg: var(--popover)`, `--normal-text: var(--popover-foreground)`, `--normal-border: var(--border)`; theme follows `<html class>` (dark, light, else system); `position="top-center"`, `containerAriaLabel="Notifications"`, `zIndex: var(--z-toast)`; others none.
- Differs from the spec:
  - Font size, radius, padding and close/action button sizes come from the sonner package and are not controlled or verified here (sonner.tsx:20-34); needs a check against the 12px floor and the 40px/48px control rule.

## Spinner

- Source: `src/components/ui/spinner.tsx` (also exports `spinnerVariants`)
- Size: `sm` `size-4` (16px), `md` `size-6` (24px, default), `lg` `size-8` (32px)
- Padding / gap: none
- Radius / border: none
- Text: none (`aria-label` "Loading" by default, `role="status"`)
- Icon size: same as Size (Loader2Icon)
- States: `animate-spin` (off with `motion-reduce:animate-none`); color inherits `currentColor`; others none
- Differs from the spec: none.

## StatCard

- Source: `src/components/ui/stat-card.tsx`
- Size: a Card (full width of its grid cell), height by content
- Padding / gap: `p-4` (16), from xl `xl:p-5` (20), `gap-3` (12); icon box `p-1.5` (6); unit `ml-1.5` (6); label row `gap-2`
- Radius / border: Card `rounded-xl border` (14px), `shadow-none`; icon box `rounded-md` (8px)
- Text: label `text-caption text-muted-foreground`; value `text-stat` (24px, 30px from md); unit `text-caption tracking-normal text-muted-foreground`; foot `text-meta text-muted-foreground`
- Icon size: not set (caller passes the icon; no size class on the wrapper)
- States: none (static); icon box `bg-muted text-foreground`
- Differs from the spec:
  - Icon size is not constrained (stat-card.tsx:23); Skeleton, EmptyState and Button fix their icon sizes.

## Switch

- Source: `src/components/ui/switch.tsx`
- Size: track `h-5 w-9` (20 x 36px) on pointer and touch; press area 62 x 46px on every screen via `after:-inset-3.5`
- Padding / gap: none; thumb `size-4` (16px), offset `translate-x-0.5` (2px) unchecked, `translate-x-4` (16px) checked
- Radius / border: `rounded-full border border-transparent`
- Text: none
- Icon size: thumb 16px (no icon)
- States: unchecked `bg-muted-foreground`; checked `bg-primary`; thumb `bg-background`; hover none; active none; focus `ring-[3px] ring-ring` (not `/50`); disabled `opacity-50 cursor-not-allowed`; invalid none; loading none. Cursor `cursor-pointer`.
- Differs from the spec: none.

## Textarea

- Source: `src/components/ui/textarea.tsx`
- Size: `min-h-20` (80px) / touch `pointer-coarse:min-h-24` (96px), `field-sizing-content` (grows with text); `w-full`
- Padding / gap: `px-3 py-2` (12 / 8); with `limit` the wrapper is `grid gap-1.5` (6) with the counter below
- Radius / border: `rounded-md border border-input`, `shadow-xs`
- Text: `text-base md:text-body-sm` (fieldClasses); counter `text-caption text-muted-foreground`, over the limit `font-medium text-destructive` with " · N over the limit"
- Icon size: none
- States: fieldClasses states; over the limit `aria-invalid` is set (`border-destructive ring-destructive/20`); loading none; selected none.
- Differs from the spec: `md:text-body-sm` with no `pointer-coarse:text-base` (see Input).

# Feature components

## BackupSection

- Source: `src/components/backup-section/backup-section.tsx`
- Size: Buttons Button default 40 / 48 (outline); FileField `min-h-10` 40 / `min-h-12` 48; width: content width, buttons wrap (`flex flex-wrap`)
- Padding / gap: section `gap-3` (12px); button row `gap-2` (8px)
- Radius / border: Buttons `rounded-md` + `border-input` (outline)
- Text: h2 title (global h2: 20px, 24px from md, no class); description `text-body-sm text-muted-foreground`; status `text-body-sm text-muted-foreground`; error `text-body-sm font-semibold text-destructive`
- Icon size: none
- States: default outline; hover `bg-accent` (inherited); focus ring (inherited); disabled/busy while exporting `aria-disabled` -> `opacity-50 pointer-events-none` (backup-section.tsx:93); invalid: error text in `role="alert"` `text-destructive`; loading: none (no spinner; export is `aria-disabled` only); selected: none
- Differs from the spec:
  - Export button uses the plain `Button`, while the busy pattern exists in `BusyButton` (busy-button.tsx) with a Spinner; no loading indicator here (backup-section.tsx:90-97).
  - `<h2 id="backup-section-title">` is a fixed id, so two BackupSections on one page would duplicate ids (backup-section.tsx:84,87).

## BusyButton

- Source: `src/components/busy-button/busy-button.tsx` (helper hook: busy-button/use-busy.ts)
- Size: inherits Button: default 40 / 48, sm 36 / 48, icon 40 / 48, lg `h-12` 48; width by content
- Padding / gap: inherited from Button (`px-4`, `gap-2`)
- Radius / border: inherited (`rounded-md`)
- Text: inherited (`text-body-sm font-medium`)
- Icon size: Spinner `size="sm"` = `size-4` 16px (busy-button.tsx:33)
- States: default per variant; hover per variant; focus ring `ring-ring/50`; disabled inherited; loading `aria-busy`, `aria-disabled` -> `opacity-50 pointer-events-none`, Spinner shown, click ignored; invalid `aria-invalid:border-destructive`; selected none
- Differs from the spec: none.

## BarChart

- Source: `src/components/chart/chart.tsx` (shares ChartFrame, ChartTable, helpers in chart-data.ts)
- Size: plot `h-44` 176px; width fills container; bars `flex-1 min-w-0`; bar height up to 85% of plot (chart.tsx:112)
- Padding / gap: figure `gap-2` (8px); bars `gap-1` (4px); label row `mt-1 gap-1`
- Radius / border: bar `rounded-t-sm bg-primary`; axis `border-b border-border`
- Text: caption `text-body-sm font-medium`; value above bar and label under bar `text-meta text-muted-foreground` (12px) truncated; empty text `text-body-sm text-muted-foreground`
- Icon size: none
- States: default only; hover shows native `title="label: value"`; other states none (not interactive, `aria-hidden`, data is in the `sr-only` ChartTable)
- Differs from the spec: none (12px floor holds via text-meta). Note: `Label` header text in ChartTable is hard-coded English `Label` (chart.tsx:29).

## LineChart

- Source: `src/components/chart/chart.tsx`
- Size: plot `h-44` 176px; y-axis column auto width; x-label row `ml-10` (40px offset, hard-coded)
- Padding / gap: figure `gap-2`; plot row `gap-2`; plot `mx-2`; label row `mt-1 ml-10 gap-1`
- Radius / border: plot `border-b border-l border-border`; dots `rounded-full`
- Text: caption `text-body-sm font-medium`; axis and first/last labels `text-meta text-muted-foreground` (12px)
- Icon size: dot `size-2.5` 10px; line `strokeWidth 2` `stroke-primary`
- States: none (decorative `aria-hidden`; native `title` on dots)
- Differs from the spec:
  - chart.tsx:175 `ml-10` offset assumes the y-axis column is about 40px wide; it is not tied to the real width (inconsistent alignment risk), not a rule break.
  - chart.tsx:169 dot `size-2.5` (10px) with a `title` tooltip is not keyboard reachable; acceptable because the table carries the data.

## ChartTable

- Source: `src/components/chart/chart.tsx`
- Size: content size; no height rule (data table, not a control)
- Padding / gap: none set (browser default cell padding); `pr-4` (16px) on label cells
- Radius / border: none
- Text: `text-body-sm` (14px); caption `text-left text-muted-foreground`; headers `font-medium`, row headers `font-normal`
- Icon size: none
- States: none
- Differs from the spec: no cell padding classes, unlike `Table` (`px-3 py-2`, table/table.tsx:80-84); used `sr-only` inside charts, visible inside ChartBoundary (chart.tsx:210).

## ChartBoundary

- Source: `src/components/chart/chart.tsx` (class component)
- Size: width fills container; retry Button default 40 / 48 (outline)
- Padding / gap: `gap-3` (12px)
- Radius / border: none
- Text: message `text-body-sm`
- Icon size: none
- States: default renders children; failed renders `role="alert"` message, Try again button, optional table
- Differs from the spec: none.

## ConfirmDelete

- Source: `src/components/confirm-delete/confirm-delete.tsx`
- Size: all visual values come from `ui/confirm-dialog.tsx` (Dialog: `p-6`, `gap-4`, `rounded-lg`, `sm:max-w-lg`; buttons Button default 40 / 48)
- Padding / gap: inherited from ConfirmDialog / Dialog (`ui/dialog.tsx:62`; footer `gap-2`)
- Radius / border: inherited (`rounded-lg border`)
- Text: inherited (title via DialogTitle; confirm label default "Delete")
- Icon size: Dialog close button `size-10` 40px, touch `size-12` 48px (ui/dialog.tsx:73, inherited)
- States: closed when `item === null`; open otherwise; confirm failing keeps the dialog open (inherited)
- Differs from the spec: none.

## DescriptionList (with DescriptionItem)

- Source: `src/components/description-list/description-list.tsx`
- Size: width fills container; no height rule
- Padding / gap: `gap-x-4` (16px) `gap-y-3` (12px); columns `grid-cols-1`, `sm:grid-cols-2|3` (default 2)
- Radius / border: none
- Text: `text-body-sm` on the list; label `<dt>` `text-muted-foreground`; value `<dd>` `m-0 break-words`
- Icon size: none
- States: none
- Differs from the spec: none. Item has `min-w-0`.

## Disclosure

- Source: `src/components/disclosure/disclosure.tsx`
- Size: summary `min-h-11` 44px / `pointer-coarse:min-h-12` 48px; width fills container
- Padding / gap: summary `px-4 py-2 gap-2`; content `px-4 pt-1 pb-4`
- Radius / border: `rounded-md border border-border bg-card text-card-foreground`; summary `rounded-md`
- Text: summary `text-body-sm font-medium`; content `text-body-sm`
- Icon size: ChevronDown `size-4` 16px, `text-muted-foreground`, rotates 180deg when open (`group-open:rotate-180`)
- States: default; hover none; focus summary `ring-[3px] ring-ring/50` (`outline-none`); open chevron rotated; disabled/invalid/loading/selected none
- Differs from the spec: summary has `cursor-pointer` (ok). Hover is not styled (siblings List/Button show `hover:bg-accent`): inconsistent (disclosure.tsx:38).

## ExternalLink

- Source: `src/components/external-link/external-link.tsx` (helper: web-link.ts `safeWebUrl`)
- Size: `min-h-11` 44px / `pointer-coarse:min-h-12` 48px; width by content (`inline-flex`)
- Padding / gap: `gap-1` (4px); no padding
- Radius / border: `rounded-sm`
- Text: inherits parent size; `text-primary underline underline-offset-4`; sr-only suffix "(opens in a new tab)"
- Icon size: `size-3.5` 14px (external-link.tsx:31)
- States: default `text-primary` underlined; hover none; focus `ring-[3px] ring-ring/50`; unsafe URL renders a plain `<span>`; others none
- Differs from the spec: no hover style (Markdown link and PageHeader link also have none, but Button variant link has `hover:underline`); unsafe-URL span ignores `data-slot` and other props (external-link.tsx:17).

## FileField

- Source: `src/components/file-field/file-field.tsx` (helper: download-blob.ts)
- Size: `min-h-10` 40px / `pointer-coarse:min-h-12` 48px; width by content (`inline-flex`)
- Padding / gap: `px-4 py-2 gap-2`
- Radius / border: `rounded-md border border-input bg-background`
- Text: `text-body-sm font-medium`
- Icon size: none
- States: default `bg-background`; hover `bg-accent text-accent-foreground`; focus `has-focus-visible:ring-[3px] ring-ring/50`; disabled `has-disabled:opacity-50 cursor-not-allowed`; invalid, loading, selected none
- Differs from the spec: none; it copies the outline Button look by hand rather than reusing `Button` (inconsistent with BackupSection's export button only if tokens drift).

## AiShell

- Source: `src/components/layout/ai-shell.tsx` (helpers ToolCall, ChatPanel, AiShellPanel)
- Size: trigger Button ghost `icon` 40 / 48; panel `SheetContent side="right"` `w-full sm:max-w-md` (448px); Allow/Refuse `size="sm"` 36 / 48; Send and New conversation `icon` 40 / 48; Textarea `rows={2}`
- Padding / gap: log `px-4 space-y-3`; form `gap-2 p-4 border-t`; tool call `p-2`, `mt-1`/`mt-2 gap-2`; message indent `ml-8` (user) / `mr-4`
- Radius / border: tool call `rounded-md border bg-muted/40`; limit and error `rounded-md border border-destructive/50 p-2`
- Text: `text-body-sm` body; `text-caption text-muted-foreground` for role, status, JSON; error `text-destructive`
- Icon size: BotIcon / SendIcon / RotateCcwIcon default Button svg `size-4` 16px
- States: default; hover inherited; focus inherited; waiting shows Allow/Refuse; failed `border-destructive/50`; Send `aria-disabled` while busy or empty -> `opacity-50`; others inherited
- Differs from the spec:
  - ai-shell.tsx:28 hard-coded `text-body-sm`/`text-caption` are fine; no raw sizes.

## AppShell

- Source: `src/components/layout/app-shell.tsx` (helper NavList; type `NavItem`)
- Size: see "Page layout". Header row `h-14` 56px; sidebar 240px; mobile Sheet `w-72` 288px; icon buttons ghost `icon` 40 / 48; home link `min-h-11 min-w-11` 44px
- Padding / gap: header `gap-2`, actions `gap-1`, side 8px (mobile) / `md:px-4` 16px; main `py-6` + `--page-x`; menu `p-2`, items `px-3 gap-3`, list `gap-1`
- Radius / border: header `border-b`; sidebar `border-r`; footer `border-t`; menu item and home link `rounded-md`; skip link `rounded-md`
- Text: menu item `text-body-sm`, active `font-medium`; footer `text-caption text-muted-foreground`; skip link inherited
- Icon size: menu item icon `size-4` 16px; app icon `size-6` 24px; top bar icon buttons svg `size-4` (Button default)
- States: menu item default `text-body-sm`; hover `bg-sidebar-accent text-sidebar-accent-foreground`; active (current page) `bg-sidebar-accent font-medium text-sidebar-accent-foreground`; focus `ring-[3px] ring-sidebar-ring/50`; header `bg-background/95` (`/80` with backdrop-filter); skip link visible on focus `bg-primary text-primary-foreground`; disabled/invalid/loading none
- Differs from the spec (open, waits for the AppShell freeze to lift): see "Page layout": app-shell.tsx:36 `min-h-9` (36px), `pointer-coarse:min-h-11` (44px not 48); app-shell.tsx:110 home link no touch 48px, no `cursor-pointer`; app-shell.tsx:36 NavLink has no `cursor-pointer` (anchor default); app-shell.tsx:84 skip link `px-4 py-2` with `text-body-sm`-less default size (inherits body, ok).

## AppSwitcher

- Source: `src/components/layout/app-switcher.tsx`
- Size: trigger ghost `icon` 40 / 48; menu from `ui/dropdown-menu.tsx` (item heights inherited)
- Padding / gap: inherited from DropdownMenu
- Radius / border: inherited
- Text: inherited (label "Apps"; items link `flex-1`)
- Icon size: LayoutGridIcon `size-4` 16px; CheckIcon (current app) inherited size
- States: default; hover/focus inherited; current app `aria-current="page"` + CheckIcon; hidden when `APPS.length < 2`; others none
- Differs from the spec: none in this file (item height is in `ui/dropdown-menu.tsx`, not checked here).

## ThemeToggle

- Source: `src/components/layout/theme-toggle.tsx`
- Size: trigger ghost `icon` 40 / 48
- Padding / gap: inherited from DropdownMenu
- Radius / border: inherited
- Text: inherited; labels System / Light / Dark
- Icon size: Monitor/Sun/Moon `size-4` 16px (Button default)
- States: default; hover/focus inherited; selected radio item shows the dropdown's own indicator (inherited)
- Differs from the spec: none.

## List

- Source: `src/components/list/list.tsx`
- Size: width fills container; rows see ListItem
- Padding / gap: none on the list
- Radius / border: `rounded-md border border-border bg-card text-card-foreground`; rows separated by `divide-y divide-border`
- Text: inherits; rows `text-body-sm`
- Icon size: none
- States: none (rows are not styled for hover; actions are separate controls)
- Differs from the spec: none.

## ListItem

- Source: `src/components/list/list.tsx`
- Size: `min-h-11` 44px / `pointer-coarse:min-h-12` 48px; width fills
- Padding / gap: `px-4 py-2 gap-3` (16/8px, 12px)
- Radius / border: none (the List has it)
- Text: `text-body-sm`
- Icon size: none
- States: none
- Differs from the spec: none. Rows are 44px while the search result options are `min-h-10` (see SearchDialog): inconsistent row height.

## ListItemActions

- Source: `src/components/list/list.tsx`
- Size: `shrink-0`; pushed right with `ml-auto`
- Padding / gap: `gap-2` (8px)
- Radius / border: none
- Text: inherits
- Icon size: none
- States: none
- Differs from the spec: none.

## ListToolbar

- Source: `src/components/list-toolbar/list-toolbar.tsx` (helper: list-query.ts)
- Size: Input `h-10` 40 / `min-h-12` 48; NativeSelect `h-10` / `min-h-12`; Reset Button default 40 / 48; search field `sm:min-w-56` (224px) `sm:flex-1`; select `sm:w-44` (176px); full width on mobile
- Padding / gap: form `gap-3` (12px); row `gap-3`; label-to-control `gap-1.5` (6px); count `min-h-5` (20px)
- Radius / border: inherited from Input, NativeSelect, outline Button
- Text: labels `text-body-sm font-medium`; count `text-body-sm text-muted-foreground`
- Icon size: NativeSelect chevron `size-4` 16px (inherited)
- States: default; hover/focus/invalid/disabled inherited from Input, NativeSelect; Reset shown only when something differs from default; others none
- Differs from the spec: none. Note: search is a `type="search"` free text field (needed; filters use NativeSelect, ok).

## LoadingRegion

- Source: `src/components/load-state/load-state.tsx`
- Size: width fills container; shapes from `ui/skeleton.tsx` (card `p-6`, `rounded-xl`; list avatar `size-10`)
- Padding / gap: `cards` shape `gap-4` (16px); list `gap-4` (inherited)
- Radius / border: inherited (`rounded-md bg-accent animate-pulse`; card `rounded-xl border`)
- Text: none visible (label is `aria-label`)
- Icon size: none
- States: loading only (`role="status" aria-busy`, `animate-pulse`, `motion-reduce:animate-none`)
- Differs from the spec: none.

## RetryButton

- Source: `src/components/load-state/load-state.tsx`
- Size: Button default 40 / 48 (outline)
- Padding / gap: inherited (`px-4 gap-2`)
- Radius / border: `rounded-md border border-input` (outline)
- Text: `text-body-sm font-medium`; label default "Try again"
- Icon size: Spinner `sm` = `size-4` 16px
- States: default; hover `bg-accent`; focus ring; loading (`pending`) `aria-disabled` -> `opacity-50 pointer-events-none` + Spinner "Trying again"; others inherited
- Differs from the spec: none.

## LoadFailed

- Source: `src/components/load-state/load-state.tsx` (uses `ui/alert-banner.tsx`)
- Size: width fills; height from AlertBanner (inherited); retry button 40 / 48
- Padding / gap: inherited from AlertBanner
- Radius / border: inherited
- Text: inherited
- Icon size: inherited
- States: invalid/error banner (inherited); loading via RetryButton `pending`
- Differs from the spec: none in this file.

## Markdown

- Source: `src/components/markdown/markdown.tsx` (parser: parse.ts; syntax: markdown.md)
- Size: width fills container; `break-words`
- Padding / gap: block `gap-3` (12px); list `gap-1 pl-6`; quote `pl-4`; code block `p-3`; inline code `px-1 py-0.5`; heading `mt-2 first:mt-0`
- Radius / border: quote `border-l-4 border-border`; code block `rounded-md bg-muted`; inline code `rounded-sm bg-muted`; rule `border-border`
- Text: container `text-body` (16px); code `font-mono text-body-sm`; quote `text-muted-foreground`; strong `font-semibold`; headings h2-h4 use the global heading styles (h2 20/24px, h3 18/20, h4 16/18; `headingStart` stops at h4)
- Icon size: none
- States: link default `text-primary underline underline-offset-4`; focus `ring-[3px] ring-ring/50`; hover none; others none
- Differs from the spec:
  - markdown.tsx:121 link has no hover style; link markup is a copy of `ExternalLink` (external-link.tsx:25) but without the icon: inconsistent look.

## Heatmap

- Source: `src/components/month-calendar/heatmap.tsx` (helper: heatmap-bands.ts)
- Size: cell `size-3.5` 14px (not interactive); weekday row `h-3.5`; month label row `h-5` 20px; grid `w-max`, scrolls sideways in a focusable region
- Padding / gap: figure `gap-2`; grid `gap-2`; cells `gap-0.5` (2px); weekday column `pt-5 gap-0.5`; legend `gap-x-3 gap-y-1`, item `gap-1`
- Radius / border: cell `rounded-sm`; region `rounded-md`
- Text: caption `text-body-sm font-medium`; weekday, month and legend `text-meta text-muted-foreground` (12px)
- Icon size: none (14px squares)
- States: shades `bg-accent` (0), `bg-primary/25`, `/50`, `/75`, `bg-primary` (top); region focus `ring-[3px] ring-ring/50`; others none
- Differs from the spec: none (cells are `role="img"`, not controls). Shade 0 `bg-accent` and `bg-primary/25` have low contrast in light mode; the legend carries the meaning.

## MonthCalendar

- Source: `src/components/month-calendar/month-calendar.tsx`
- Size: day cell `min-h-11` 44px / `pointer-coarse:min-h-12` 48px, `w-full` (7 columns, `table-fixed`); month buttons ghost `icon` 40 / 48
- Padding / gap: root `gap-2`; cell `py-1 gap-0.5`; `td` `p-0.5`; header `pb-1`
- Radius / border: cell `rounded-md`; today `ring-1 ring-ring`
- Text: day `text-body-sm`, number `tabular-nums`; month title `text-body-sm font-semibold`; weekday head `text-caption font-medium text-muted-foreground`
- Icon size: ChevronLeft/Right `size-4` 16px (Button default)
- States: default transparent; hover `bg-accent`; focus `ring-[3px] ring-ring/50`; disabled `opacity-50 cursor-not-allowed`; selected (`aria-pressed`) `bg-primary text-primary-foreground`; today `ring-1 ring-ring`; read-only (no `onSelect`) `div role="group"`, out-of-range `opacity-50`
- Differs from the spec: none. Month arrows are 40px on a pointer screen (meets 40, press area 44 not met by the visual box alone; inherited Button icon).

## NavTabs

- Source: `src/components/nav-tabs/nav-tabs.tsx`
- Size: tab `min-h-11` 44px / `pointer-coarse:min-h-12` 48px; width by content, row scrolls sideways (`w-max min-w-full`)
- Padding / gap: tab `px-4`; list `gap-1`
- Radius / border: nav `border-b border-border`; tab `border-b-2 -mb-px`; no radius
- Text: `text-body-sm font-medium whitespace-nowrap`
- Icon size: none
- States: default `border-transparent text-muted-foreground`; hover `text-foreground`; active (current) `border-primary text-foreground`; focus `ring-[3px] ring-ring/50`; disabled/invalid/loading none
- Differs from the spec: none. Tab height 44px vs `SegmentedControl` item `min-h-10` (40px) / touch `min-h-12` (ui/segmented-control.tsx:39).

## PeriodNav

- Source: `src/components/period-nav/period-nav.tsx` (helper: periods.ts)
- Size: DateStepper icon buttons 40 / 48 and date field `w-52` (208px, ui/date-stepper.tsx:48); Today Button default 40 / 48 (outline)
- Padding / gap: root `flex-col`; row `gap-2`; range line `mt-4 mb-5` (16px / 20px); note `ml-2.5` (10px)
- Radius / border: inherited
- Text: range line `text-xs text-foreground` (12px); note `text-muted-foreground`
- Icon size: inherited from DateStepper (Button svg 16px)
- States: Today `disabled` when `date === today` -> `opacity-50 cursor-not-allowed`; others inherited
- Differs from the spec: none.

## ProgressBar

- Source: `src/components/progress-bar/progress-bar.tsx`
- Size: track `h-2` 8px; width `w-full`
- Padding / gap: `gap-1` (4px) between text row and track; row `gap-3`
- Radius / border: track and fill `rounded-full`
- Text: `text-body-sm`; value `text-muted-foreground tabular-nums`
- Icon size: none
- States: track `bg-accent`; fill `bg-primary`; known width transition (`motion-reduce:transition-none`); indeterminate `w-1/3 animate-pulse` (`motion-reduce:animate-none`); others none
- Differs from the spec: none.

## ResponsiveModal

- Source: `src/components/responsive-modal/responsive-modal.tsx`
- Size: all from `ui/dialog.tsx`: from 640px `sm:max-w-lg` (512px) centered, `max-h-[calc(100dvh-2rem)]`; below 640px sheet at bottom (`max-sm:max-w-none`, `rounded-b-none`) or full (`max-sm:inset-0`); footer Buttons 40 / 48
- Padding / gap: Dialog `p-6` (24px), `gap-4` (16px); header `gap-2`; footer `gap-2`, `flex-col-reverse` mobile, `sm:flex-row sm:justify-end`
- Radius / border: `rounded-lg border`; full layout `rounded-none border-0`
- Text: DialogTitle / DialogDescription (inherited)
- Icon size: close button `size-10` 40px, touch `size-12` 48px (`[&_svg]:size-4` 16px)
- States: open/closed animations (`motion-reduce:animate-none`); others inherited
- Differs from the spec: none.

## ScoreField

- Source: `src/components/score-field/score-field.tsx` (helper: score-values.ts)
- Size: option `min-h-10 min-w-10` 40px / `pointer-coarse:min-h-12 min-w-12` 48px; Clear Button `size="sm"` 40px / `min-h-12` 48
- Padding / gap: fieldset `gap-2`; row `gap-2`; option `px-3`; legend `mb-1`; hint `gap-4`
- Radius / border: option `rounded-md border border-input bg-background`
- Text: option `text-body-sm font-medium`; legend `text-body-sm font-medium`; hint `text-caption text-muted-foreground`
- Icon size: none
- States: default `bg-background`; hover `bg-accent`; focus `has-focus-visible:ring-[3px] ring-ring/50`; selected `has-checked:border-primary bg-primary text-primary-foreground`; disabled `has-disabled:opacity-50 cursor-not-allowed`; invalid, loading none
- Differs from the spec:
  - score-field.tsx:53 option label `px-3` vs ToggleChips `px-4`, `rounded-md` vs `rounded-full`: same job (pick a value), different shape.

## SearchDialog

- Source: `src/components/search/search-dialog.tsx` (helpers: search-match.ts, use-search-shortcut.ts)
- Size: Dialog `layout="full"` (full screen below 640px; `sm:top-[20%] sm:translate-y-0`, `sm:max-w-lg` inherited); input `h-10` 40 / `pointer-coarse:h-12` 48; option `min-h-10` 40 / `pointer-coarse:min-h-12` 48; results `max-h-[60dvh]` scrolling
- Padding / gap: input box `px-3 gap-2`; results `gap-3`; group `gap-1`; option `px-3 py-1`; group label `px-2`
- Radius / border: input box `rounded-md border bg-background`, `focus-within:ring-[3px] ring-ring/50`; option `rounded-md`
- Text: input `text-body` (16px); options `text-body-sm`; snippet and group label `text-caption` (`text-muted-foreground`); empty text `text-body-sm text-muted-foreground`
- Icon size: SearchIcon `size-4` 16px
- States: option default; hover and keyboard-active `bg-accent text-accent-foreground` (mouse move sets active); focus stays in the input (combobox, `aria-activedescendant`); loading `LoadingRegion`; failed `LoadFailed`; empty text; disabled/invalid none
- Differs from the spec:
  - search-dialog.tsx:222-225 option `min-h-10` (40) while ListItem rows are `min-h-11` (44): inconsistent row height (still within the 40 rule).
  - search-dialog.tsx:189 input has `outline-none` and shows its focus ring on the wrapper; fine.
  - Inherited ui/dialog.tsx:73 close button not shown here (`showCloseButton={false}`).

## Table

- Source: `src/components/table/table.tsx` (exports Table, TableCaption, TableHeader, TableBody, TableRow, TableHead, TableCell)
- Size: wrapper `w-full overflow-x-auto`, a focusable `role="region"`; no row height rule (rows about 36px: `py-2` 8px x2 + 20px line)
- Padding / gap: cells `px-3 py-2` (12/8px); caption `px-3 py-2`
- Radius / border: wrapper `rounded-md border border-border`; header `border-b border-border bg-muted`; body `divide-y divide-border`
- Text: table `text-body-sm`; caption `text-left font-medium`; head `font-medium`; numeric `text-right tabular-nums`; align left otherwise
- Icon size: none
- States: wrapper focus `ring-[3px] ring-ring/50`; sticky first column `sticky left-0 bg-card` (`bg-muted` in thead); hover/selected none (rows not interactive)
- Differs from the spec: none. Row hover is not styled; if rows become clickable they must meet 40/48 heights.

## ToggleChips

- Source: `src/components/toggle-chips/toggle-chips.tsx`
- Size: chip `min-h-10` 40px / `pointer-coarse:min-h-12` 48px; width by content
- Padding / gap: chip `px-4`; group `flex-wrap gap-2`
- Radius / border: `rounded-full border border-input bg-background`
- Text: `text-body-sm font-medium`
- Icon size: none
- States: default `bg-background`; hover `bg-accent text-accent-foreground`; focus `ring-[3px] ring-ring/50`; selected `data-[state=on]:border-primary bg-primary text-primary-foreground`; disabled `opacity-50 cursor-not-allowed`; invalid, loading none
- Differs from the spec: none. Pill shape `rounded-full` differs from `rounded-md` of Button, FileField and ScoreField options.

# Differences still open (card #69)

The kit now follows the spec except for the places below. Everything else that the first version of this page listed (heights, press areas, cursors, type scale tokens, raw colors and sizes, focus and invalid looks, text size on touch, titles, `StatCard`) was fixed in #69.

| Where                                    | Difference                                                                                                                                                                                                                                              | Why it is open                                                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `AppShell`                               | Menu items `min-h-9` (36px) and `pointer-coarse:min-h-11` (44px) should be 40px and 48px; the header home link has no 48px touch height; the header side padding is 8px and 16px instead of `--page-x`; the footer ignores the left and right safe area | `src/components/layout/app-shell.tsx` is frozen while another card edits it; change it when the freeze is lifted  |
| `Badge` as a link                        | The press area is about 26px tall                                                                                                                                                                                                                       | `overflow-hidden` clips an enlarged hit area; a link badge needs a different shape, not a class                   |
| `Button`, `NumberInput`, `ConfirmDialog` | `aria-disabled:pointer-events-none` hides the `cursor-not-allowed` look                                                                                                                                                                                 | Removing it lets a click reach an `aria-disabled` button; the handlers rely on it                                 |
| `DropdownMenuItem` disabled              | `pointer-events-none` hides the `cursor-not-allowed` look                                                                                                                                                                                               | Same reason; Radix sets it                                                                                        |
| `Toaster`                                | Font size, radius and button sizes come from the sonner package                                                                                                                                                                                         | Not controlled here; check against the 12px and 40px rules when sonner is updated                                 |
| Docs                                     | `docs/design-tokens.md` says touch targets are 44px, the rules say 48px for controls                                                                                                                                                                    | The text is generated from `tokens/tokens.json` (`touchTarget`, the press area), so it stays true for press areas |

# Values that changed the look (confirmed)

The user confirmed these on 2026-11-28 (option A) and #69 applied them.

| #   | Change                                                                              | Before                                         | Now                                                        |
| --- | ----------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------- |
| 1   | Button `sm` height, pointer                                                         | 36px                                           | 40px                                                       |
| 2   | SegmentedControl item height, pointer / touch                                       | 32px / 44px (group 40px)                       | 40px / 48px (group 48px / 56px)                            |
| 3   | Menu, select and combobox row height, pointer / touch                               | about 32px / 44px                              | 40px / 48px                                                |
| 4   | Dialog, Drawer, Sheet close button, pointer / touch                                 | 32px / 44px                                    | 40px / 48px                                                |
| 5   | AppShell menu item, pointer / touch                                                 | 36px / 44px                                    | 40px / 48px (open, see above)                              |
| 6   | Focus ring on Switch and SegmentedControl                                           | `ring-ring` full strength                      | `ring-ring/50`                                             |
| 7   | Invalid look on Select, Checkbox, Switch                                            | border only or none                            | border plus `ring-destructive/20`                          |
| 8   | DateField disabled cell                                                             | `opacity-40`                                   | `opacity-50`                                               |
| 9   | Text size on touch from 768px: Input, Textarea, NativeSelect, NumberInput, Combobox | 14px                                           | 16px                                                       |
| 10  | Select trigger text below 768px                                                     | 14px                                           | 16px                                                       |
| 11  | DialogTitle, CardTitle, DrawerTitle, SheetTitle                                     | 18px, 18/20px, 20/24px, 20/24px by inheritance | `text-title`: 16px, 18px from md                           |
| 12  | StatCard value                                                                      | 24px, 30px from xl                             | `text-stat`: 24px, 30px from md (type tokens switch at md) |

New tokens in `@sirloinbh/design-tokens`: colors `destructive-foreground` and `overlay`; text styles `text-stat` and `text-title`. A `--control-height` token was not added: the 40px and 48px heights stay as `h-10` and `pointer-coarse:min-h-12`. No new package.

# Coverage check

`scripts/ui-spec-coverage.mjs`, run by `npm run test` (`scripts/test/ui-spec-coverage.test.mjs`), fails when a `.tsx` file under `src/components/` that exports a component has no `Source: \`path\`` line in this page, or when one of its exported components (a PascalCase export) is not named here. Add the section in the same pull request as the component.
