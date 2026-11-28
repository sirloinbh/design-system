// An ESLint rule set that flags a `lucide-react` icon imported for a meaning `lib/icons.ts` already covers (#70).
// Use it in an app's `eslint.config.mjs`:
//   import { iconImportConfig } from './src/lib/icon-rules.mjs';
//   export default [...yourConfig, iconImportConfig()];
// Each meaning lists the icon the map uses and the alternates people pick for the same meaning. Names are matched with
// and without the `Icon` suffix and with the `Lucide` prefix, so `Trash2`, `Trash2Icon` and `LucideTrash2` are one icon.

/** meaning → the name exported from icons.ts, the lucide icon it maps to, and alternates that must not be used */
export const ICON_MEANINGS = [
  { name: 'AddIcon', icon: 'Plus', alternates: ['CirclePlus', 'SquarePlus', 'PlusCircle', 'PlusSquare'] },
  { name: 'RemoveIcon', icon: 'Minus', alternates: ['CircleMinus', 'SquareMinus', 'MinusCircle', 'MinusSquare'] },
  { name: 'EditIcon', icon: 'Pencil', alternates: ['Pen', 'PenLine', 'PenSquare', 'SquarePen', 'Edit', 'Edit2', 'Edit3', 'PencilLine'] },
  { name: 'DeleteIcon', icon: 'Trash2', alternates: ['Trash', 'Delete', 'Eraser'] },
  { name: 'SaveIcon', icon: 'Save', alternates: ['SaveAll', 'FloppyDisk'] },
  { name: 'CloseIcon', icon: 'X', alternates: ['XCircle', 'XSquare', 'CircleX', 'SquareX'] },
  { name: 'ConfirmIcon', icon: 'Check', alternates: ['CheckCheck'] },
  { name: 'BackIcon', icon: 'ArrowLeft', alternates: ['MoveLeft', 'ArrowLeftCircle', 'CircleArrowLeft', 'Undo2'] },
  { name: 'PreviousIcon', icon: 'ChevronLeft', alternates: ['ChevronsLeft', 'CircleChevronLeft'] },
  { name: 'NextIcon', icon: 'ChevronRight', alternates: ['ChevronsRight', 'CircleChevronRight'] },
  { name: 'ExpandIcon', icon: 'ChevronDown', alternates: ['ChevronsDown', 'CircleChevronDown', 'ArrowDown'] },
  { name: 'CollapseIcon', icon: 'ChevronUp', alternates: ['ChevronsUp', 'CircleChevronUp', 'ArrowUp'] },
  { name: 'SearchIcon', icon: 'Search', alternates: ['ScanSearch', 'SearchCheck', 'TextSearch'] },
  { name: 'FilterIcon', icon: 'ListFilter', alternates: ['Filter', 'Funnel', 'SlidersHorizontal'] },
  { name: 'SortIcon', icon: 'ArrowUpDown', alternates: ['ArrowDownUp', 'ArrowDownAZ', 'ArrowUpAZ', 'ListOrdered'] },
  { name: 'SettingsIcon', icon: 'Settings2', alternates: ['Settings', 'Cog', 'Wrench', 'SlidersVertical'] },
  { name: 'DashboardIcon', icon: 'LayoutDashboard', alternates: ['Gauge', 'BarChart3', 'ChartColumn', 'LayoutPanelLeft'] },
  { name: 'CalendarIcon', icon: 'Calendar', alternates: ['CalendarDays', 'CalendarRange'] },
  { name: 'DayLogIcon', icon: 'NotebookPen', alternates: ['NotebookText', 'BookOpenText', 'ClipboardList'] },
  { name: 'HomeIcon', icon: 'Home', alternates: ['House'] },
  { name: 'MenuIcon', icon: 'Menu', alternates: ['AlignJustify', 'PanelLeft', 'PanelLeftOpen'] },
  { name: 'AppSwitcherIcon', icon: 'LayoutGrid', alternates: ['Grid', 'Grid3x3'] },
  { name: 'DownloadIcon', icon: 'Download', alternates: ['ArrowDownToLine', 'CloudDownload', 'FileDown'] },
  { name: 'UploadIcon', icon: 'Upload', alternates: ['ArrowUpFromLine', 'CloudUpload', 'FileUp'] },
  { name: 'BackupIcon', icon: 'DatabaseBackup', alternates: ['HardDriveDownload', 'ArchiveRestore'] },
  { name: 'SignOutIcon', icon: 'LogOut', alternates: ['DoorOpen', 'Power'] },
  { name: 'ExternalLinkIcon', icon: 'ExternalLink', alternates: ['SquareArrowOutUpRight', 'ArrowUpRight'] },
  { name: 'LoadingIcon', icon: 'LoaderCircle', alternates: ['Loader', 'Loader2', 'LoaderPinwheel', 'RefreshCw'] },
  { name: 'RetryIcon', icon: 'RotateCcw', alternates: ['RotateCw', 'RefreshCcw', 'Redo2'] },
  { name: 'AssistantIcon', icon: 'Bot', alternates: ['Sparkles', 'MessageCircle', 'BrainCircuit'] },
  { name: 'SendIcon', icon: 'Send', alternates: ['SendHorizontal'] },
  { name: 'EmptyIcon', icon: 'Inbox', alternates: ['PackageOpen', 'FolderOpen'] },
  { name: 'TimeIcon', icon: 'Clock', alternates: ['Clock3', 'Timer', 'AlarmClock'] },
  { name: 'LightModeIcon', icon: 'Sun', alternates: ['SunMedium'] },
  { name: 'DarkModeIcon', icon: 'Moon', alternates: ['MoonStar'] },
  { name: 'SystemModeIcon', icon: 'Monitor', alternates: ['Laptop', 'MonitorSmartphone'] },
  { name: 'RadioDotIcon', icon: 'Circle', alternates: ['CircleDot'] },
];

const forms = (name) => [name, `${name}Icon`, `Lucide${name}`];

/** The `no-restricted-imports` paths: one entry per meaning, so each message names the icon to use. */
export function iconRestrictedPaths() {
  return ICON_MEANINGS.map(({ name, icon, alternates }) => ({
    name: 'lucide-react',
    importNames: [...new Set([icon, ...alternates].flatMap(forms))],
    message: `Import ${name} from lib/icons (the shared icon for this meaning) instead of the lucide-react icon.`,
  }));
}

/**
 * A flat-config entry. `files` is where it applies, `ignores` where it does not (the map itself must import from
 * lucide-react, so `lib/icons.ts` is left out).
 */
export function iconImportConfig({ files = ['**/*.{ts,tsx}'], ignores = ['**/lib/icons.ts'] } = {}) {
  return {
    files,
    ignores,
    rules: { 'no-restricted-imports': ['error', { paths: iconRestrictedPaths() }] },
  };
}
