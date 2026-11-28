import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CalendarDaysIcon,
  CalendarIcon,
  DumbbellIcon,
  GaugeIcon,
  HomeIcon,
  SettingsIcon,
} from 'lucide-react';
import { MemoryRouter } from 'react-router';

import { AppShell } from '../../src/components/layout/app-shell';
import { AppSwitcher } from '../../src/components/layout/app-switcher';
import { ThemeToggle } from '../../src/components/layout/theme-toggle';
import type { SearchResult } from '../../src/components/search/search-match';
import { PageHeader } from '../../src/components/ui/page-header';

const meta = {
  title: 'Layout/AppShell',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// The shared menu order (layout guideline): day log, Week, 12 weeks, the app's other pages, Dashboard, Settings.
const NAV = [
  { to: '/', label: 'Day log', icon: HomeIcon },
  { to: '/week', label: 'Week', icon: CalendarIcon },
  { to: '/12-weeks', label: '12 weeks', icon: CalendarDaysIcon },
  { to: '/exercises', label: 'Exercises', icon: DumbbellIcon },
  { to: '/dashboard', label: 'Dashboard', icon: GaugeIcon },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
];

export const Default: Story = {
  render: () => (
    <AppShell
      appName="Workout memo"
      nav={NAV}
      actions={
        <>
          <AppSwitcher />
          <ThemeToggle />
        </>
      }
      footer={<p className="px-4 py-2 text-caption text-muted-foreground">Version 1.0</p>}
    >
      <main id="main" className="px-(--page-x) py-6">
        <PageHeader
          title="Day log"
          description="The start page. Menu order: day log, Week, 12 weeks, other pages, Dashboard, Settings."
        />
      </main>
    </AppShell>
  ),
};

export const Controls: Story = {
  name: 'ThemeToggle and AppSwitcher',
  parameters: { layout: 'centered' },
  render: () => (
    <div className="flex items-center gap-2">
      <AppSwitcher />
      <ThemeToggle />
    </div>
  ),
};

const SEARCH_CONTENT: SearchResult[] = [
  { title: 'Bench press, 5 x 5', href: '/', kind: 'content', snippet: 'Day log, Nov 24' },
  { title: 'Bench press record', href: '/exercises', kind: 'content', snippet: 'Exercises' },
];

export const Search: Story = {
  name: 'Search',
  parameters: {
    docs: {
      description: {
        story:
          'Press the Search button, Ctrl+K or "/". Menus are always searched; "Backup" is a page outside the menu and "bench" returns content from a mock searchContent.',
      },
    },
  },
  render: () => (
    <AppShell
      appName="Workout memo"
      nav={NAV}
      pages={[{ title: 'Backup', path: '/settings/backup', keywords: ['export', 'download'] }]}
      searchContent={(query, signal) =>
        new Promise<SearchResult[]>((resolve, reject) => {
          const timer = setTimeout(
            () =>
              resolve(
                SEARCH_CONTENT.filter((r) => r.title.toLowerCase().includes(query.toLowerCase())),
              ),
            400,
          );
          signal.addEventListener('abort', () => {
            clearTimeout(timer);
            reject(new DOMException('Aborted', 'AbortError'));
          });
        })
      }
    >
      <main id="main" className="px-(--page-x) py-6">
        <PageHeader title="Day log" description="Try the search from the top bar." />
      </main>
    </AppShell>
  ),
};
