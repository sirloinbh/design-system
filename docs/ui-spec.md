# UI element specs

## Icons

Every app shows the same icon for the same meaning, at the same size, from one map: `src/lib/icons.ts` (#70). All icons come from `lucide-react` ([ADR-0001](adr/0001-shadcn-ui-icons-emoji.md)). The kit and the apps import common icons from `lib/icons`, not from `lucide-react`; an icon with no meaning in the table (a one-off picture for a menu item, such as `Dumbbell`) is still imported from `lucide-react`.

### Icon by meaning

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

### Size and stroke

| Name      | Size | Class    | Where                                                                              |
| --------- | ---- | -------- | ---------------------------------------------------------------------------------- |
| `inline`  | 16px | `size-4` | Inside text, buttons and form controls. `Button` sizes its icon to this by default |
| `menu`    | 20px | `size-5` | The main menu and other lists of destinations                                      |
| `feature` | 24px | `size-6` | An empty state, and the app icon in the top bar                                    |

- The sizes are `ICON_SIZE` in `icons.ts` (`ICON_SIZE.menu`), written as full class names so Tailwind finds them.
- The stroke width is the `lucide-react` default (2). Do not set `strokeWidth`.
- Two shapes are not icons and keep their own size: the check mark inside the 16px checkbox (14px) and the dot of a radio item (8px).
- An icon next to text is decorative: `aria-hidden`. An icon-only control gets its name from `aria-label`.

### Icon or emoji

Icons mark actions and navigation. Emoji (Fluent Emoji Flat, ADR-0001) are for content a person chooses or reads as a picture, for example a mood or a category the person picks. Do not use an emoji where an icon in the table exists, and do not use an icon where the person chose an emoji.

### Keeping apps on the map

`src/lib/icon-rules.mjs` exports `iconImportConfig()`, an ESLint config entry that reports a `lucide-react` import of any icon in the table or any alternate listed in "Not this". An app turns it on in its `eslint.config.mjs`:

```js
import { iconImportConfig } from './src/lib/icon-rules.mjs';

export default [...config, iconImportConfig()];
```

The message names the shared icon to import instead.
