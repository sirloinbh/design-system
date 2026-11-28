import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { PeriodNav } from '../../src/components/period-nav/period-nav';
import type { PeriodKind } from '../../src/components/period-nav/periods';

function Demo({ period, weekStartsOn }: { period: PeriodKind; weekStartsOn?: 0 | 1 }) {
  const [date, setDate] = useState('2026-11-27');
  return (
    <PeriodNav
      period={period}
      date={date}
      today="2026-11-27"
      weekStartsOn={weekStartsOn}
      onDateChange={setDate}
    />
  );
}

const meta = {
  title: 'Components/PeriodNav',
  component: PeriodNav,
  args: { period: 'day', date: '2026-11-27', today: '2026-11-27', onDateChange: () => {} },
} satisfies Meta<typeof PeriodNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Day: Story = { render: () => <Demo period="day" /> };
export const Week: Story = { render: () => <Demo period="week" /> };
export const WeekStartsMonday: Story = { render: () => <Demo period="week" weekStartsOn={1} /> };
export const TwelveWeeks: Story = { render: () => <Demo period="12weeks" /> };
