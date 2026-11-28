// The icons by meaning, and the icon sizes (#70, docs/ui-spec.md "Icons"). Every app shows the same icon for the same
// meaning, so the kit and the apps import common icons from here, not from `lucide-react` (ADR-0001). The lint rule
// in `icon-rules.mjs` flags a direct import of an icon that is covered here. An icon with no meaning here
// (a one-off picture in a menu, for example) is still imported from `lucide-react`.
export {
  Plus as AddIcon,
  LayoutGrid as AppSwitcherIcon,
  Bot as AssistantIcon,
  ArrowLeft as BackIcon,
  DatabaseBackup as BackupIcon,
  Calendar as CalendarIcon,
  X as CloseIcon,
  ChevronUp as CollapseIcon,
  Check as ConfirmIcon,
  Moon as DarkModeIcon,
  LayoutDashboard as DashboardIcon,
  NotebookPen as DayLogIcon,
  Trash2 as DeleteIcon,
  Download as DownloadIcon,
  Pencil as EditIcon,
  Inbox as EmptyIcon,
  ChevronDown as ExpandIcon,
  ExternalLink as ExternalLinkIcon,
  ListFilter as FilterIcon,
  Home as HomeIcon,
  Sun as LightModeIcon,
  LoaderCircle as LoadingIcon,
  Menu as MenuIcon,
  ChevronRight as NextIcon,
  ChevronLeft as PreviousIcon,
  Circle as RadioDotIcon,
  Minus as RemoveIcon,
  RotateCcw as RetryIcon,
  Save as SaveIcon,
  Search as SearchIcon,
  Send as SendIcon,
  Settings2 as SettingsIcon,
  LogOut as SignOutIcon,
  ArrowUpDown as SortIcon,
  Monitor as SystemModeIcon,
  Clock as TimeIcon,
  Upload as UploadIcon,
} from 'lucide-react';

/**
 * The size scale. Full class names, so Tailwind finds them. The stroke width stays at the `lucide-react` default (2);
 * do not set `strokeWidth`.
 * - `inline`: 16px, inside text, buttons and form controls (the default of `Button` and `Input` icons).
 * - `menu`: 20px, in the main menu and other lists of destinations.
 * - `feature`: 24px, in an empty state and for the app icon in the top bar.
 */
export const ICON_SIZE = {
  inline: 'size-4',
  menu: 'size-5',
  feature: 'size-6',
} as const;

export type IconSize = keyof typeof ICON_SIZE;
