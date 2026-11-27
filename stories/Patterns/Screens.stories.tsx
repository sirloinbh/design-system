import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { PatternFrame } from '../../showcase/patterns/PatternFrame';
import { Badge } from '../../src/components/ui/badge';
import { Button } from '../../src/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../src/components/ui/card';
import { DateStepper, RangeSummary } from '../../src/components/ui/date-stepper';
import { PageHeader } from '../../src/components/ui/page-header';
import { SegmentedControl } from '../../src/components/ui/segmented-control';
import { StatCard } from '../../src/components/ui/stat-card';

const meta = { title: 'Patterns/Screens', parameters: { layout: 'padded' } } satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const SESSIONS = [
  {
    id: 1,
    name: 'Upper body',
    time: '18:30',
    detail: 'Bench press 4 x 8, Row 4 x 10',
    tag: 'Strength',
  },
  { id: 2, name: 'Easy run', time: '07:15', detail: '5.2 km in 31 minutes', tag: 'Cardio' },
  { id: 3, name: 'Mobility', time: '21:00', detail: '15 minutes of stretching', tag: 'Recovery' },
];

function DayLog() {
  const [day, setDay] = useState('2026-11-28');
  return (
    <PatternFrame
      follows={[
        { id: 'layout', rule: 'menu order and page title' },
        { id: 'ui-components', rule: 'move a period with DateStepper' },
      ]}
    >
      <PageHeader
        title="Day log"
        description="What you did on the selected day."
        actions={
          <Button>
            <PlusIcon aria-hidden /> Add session
          </Button>
        }
      />
      <DateStepper
        label="Day"
        value={day}
        onValueChange={setDay}
        onMove={(d) => setDay(d === 1 ? '2026-11-29' : '2026-11-27')}
      />
      <ul className="flex flex-col gap-3">
        {SESSIONS.map((s) => (
          <li key={s.id}>
            <Card className="gap-1 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{s.name}</span>
                <Badge variant="secondary">{s.tag}</Badge>
              </div>
              <p className="text-body-sm text-muted-foreground">
                {s.time} · {s.detail}
              </p>
            </Card>
          </li>
        ))}
      </ul>
    </PatternFrame>
  );
}

export const DayLogPage: Story = { name: 'Day log', render: () => <DayLog /> };

function Week() {
  const [view, setView] = useState('week');
  return (
    <PatternFrame
      follows={[
        { id: 'layout', rule: 'week and 12-week views' },
        { id: 'design-guidelines', rule: 'pick instead of type' },
      ]}
    >
      <PageHeader title="Week" description="Nov 23 to Nov 29" />
      <SegmentedControl
        label="Range"
        value={view}
        onValueChange={setView}
        options={[
          { value: 'week', label: 'Week' },
          { value: '12weeks', label: '12 weeks' },
        ]}
      />
      <RangeSummary from="2026-11-23" to="2026-11-29">
        5 sessions
      </RangeSummary>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          label="Sessions"
          value="5"
          unit="this week"
          icon={<span aria-hidden>S</span>}
          foot="1 more than last week"
        />
        <StatCard
          label="Time"
          value="4.5"
          unit="hours"
          icon={<span aria-hidden>T</span>}
          foot="Same as last week"
        />
        <StatCard
          label="Streak"
          value="12"
          unit="days"
          icon={<span aria-hidden>D</span>}
          foot="Best so far"
        />
      </div>
    </PatternFrame>
  );
}

export const WeekPage: Story = { name: 'Week', render: () => <Week /> };

const WEEKS = Array.from({ length: 12 }, (_, i) => ({
  week: i + 1,
  sessions: [3, 4, 5, 2, 4, 5, 3, 4, 6, 4, 5, 5][i],
}));

function TwelveWeeks() {
  return (
    <PatternFrame follows={[{ id: 'layout', rule: '12-week view' }]}>
      <PageHeader title="12 weeks" description="Sessions per week over the last 12 weeks" />
      <Card>
        <CardHeader>
          <CardTitle>Sessions per week</CardTitle>
          <CardDescription>Bar height is the number of sessions.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex h-40 items-end gap-2" aria-label="Sessions per week">
            {WEEKS.map((w) => (
              <li key={w.week} className="flex flex-1 flex-col items-center gap-1">
                <span
                  className="w-full rounded-sm bg-primary"
                  style={{ height: `${w.sessions * 20}px` }}
                />
                <span className="text-meta text-muted-foreground">W{w.week}</span>
                <span className="sr-only">{w.sessions} sessions</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </PatternFrame>
  );
}

export const TwelveWeeksPage: Story = { name: '12 weeks', render: () => <TwelveWeeks /> };
