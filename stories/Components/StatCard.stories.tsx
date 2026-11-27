import type { Meta, StoryObj } from '@storybook/react-vite';
import { DumbbellIcon } from 'lucide-react';

import { StatCard } from '../../src/components/ui/stat-card';

const meta = {
  title: 'Components/StatCard',
  component: StatCard,
  args: {
    label: 'Sessions',
    value: '12',
    unit: 'this month',
    icon: <DumbbellIcon className="size-4" aria-hidden />,
    foot: '2 more than last month',
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatCard>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
