import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Heatmap } from '../../src/components/month-calendar/heatmap';
import { MonthCalendar } from '../../src/components/month-calendar/month-calendar';

const counts: Record<string, number> = {
  '2026-11-03': 1,
  '2026-11-05': 2,
  '2026-11-10': 4,
  '2026-11-12': 1,
  '2026-11-17': 7,
  '2026-11-24': 3,
  '2026-11-26': 5,
};

function Demo({ withContent }: { withContent?: boolean }) {
  const [month, setMonth] = useState('2026-11-01');
  const [selected, setSelected] = useState<string | null>('2026-11-12');
  return (
    <MonthCalendar
      month={month}
      onMonthChange={setMonth}
      selected={selected}
      onSelect={setSelected}
      today="2026-11-27"
      renderDay={
        withContent
          ? (day) =>
              counts[day] ? (
                <span className="text-meta text-inherit!">{counts[day]} entries</span>
              ) : null
          : undefined
      }
    />
  );
}

const meta = {
  title: 'Components/MonthCalendar',
  component: MonthCalendar,
  args: { month: '2026-11-01', onMonthChange: () => {} },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MonthCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Demo /> };

export const WithDayContent: Story = { render: () => <Demo withContent /> };

export const ReadOnly: Story = { args: { today: '2026-11-27' } };

export const ActivityHeatmap: Story = {
  render: () => (
    <Heatmap
      label="Workouts per day"
      unit="workouts"
      values={counts}
      bands={[1, 3, 6]}
      from="2026-09-01"
      to="2026-11-27"
    />
  ),
};
