import type { Meta, StoryObj } from '@storybook/react-vite';
import { InboxIcon } from 'lucide-react';
import { useState } from 'react';

import { PatternFrame } from '../../showcase/patterns/PatternFrame';
import { AlertBanner } from '../../src/components/ui/alert-banner';
import { Button } from '../../src/components/ui/button';
import { Combobox } from '../../src/components/ui/combobox';
import { ConfirmDialog } from '../../src/components/ui/confirm-dialog';
import { DateField, TimeField } from '../../src/components/ui/date-field';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../../src/components/ui/drawer';
import { EmptyState } from '../../src/components/ui/empty-state';
import { FieldError } from '../../src/components/ui/field';
import { Label } from '../../src/components/ui/label';
import { NumberInput } from '../../src/components/ui/number-input';
import { SegmentedControl } from '../../src/components/ui/segmented-control';
import { SkeletonList } from '../../src/components/ui/skeleton';
import { Switch } from '../../src/components/ui/switch';
import { Textarea } from '../../src/components/ui/textarea';

const meta = {
  title: 'Patterns/Forms and states',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const EXERCISES = ['Bench press', 'Squat', 'Deadlift', 'Overhead press', 'Barbell row'];

function SessionForm({ showError }: { showError?: boolean }) {
  const [date, setDate] = useState('2026-11-28');
  const [time, setTime] = useState('18:30');
  const [exercise, setExercise] = useState('Squat');
  const [unit, setUnit] = useState('kg');
  const [sets, setSets] = useState(showError ? '0' : '4');
  const [done, setDone] = useState(true);
  return (
    <PatternFrame
      follows={[
        { id: 'design-guidelines', rule: 'pick instead of type' },
        { id: 'ui-components', rule: 'which control for which values' },
      ]}
    >
      <form className="flex max-w-md flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <DateField label="Date" value={date} onValueChange={setDate} today="2026-11-28" />
        <TimeField label="Start time" value={time} onValueChange={setTime} />
        <div className="flex flex-col gap-2">
          <Label htmlFor="exercise-name">Exercise</Label>
          <Combobox
            id="exercise-name"
            value={exercise}
            onValueChange={setExercise}
            options={EXERCISES}
            listLabel="Suggested exercises"
            emptyMessage="No match. The typed name is saved as a new exercise."
          />
        </div>
        <SegmentedControl
          label="Unit"
          value={unit}
          onValueChange={setUnit}
          options={[
            { value: 'kg', label: 'kg' },
            { value: 'lb', label: 'lb' },
          ]}
        />
        <div className="flex flex-col gap-2">
          <NumberInput label="Sets" value={sets} onValueChange={setSets} min={1} max={20} />
          {showError ? <FieldError name="sets">Enter at least 1 set.</FieldError> : null}
        </div>
        <div className="flex items-center gap-2">
          <Switch id="done" checked={done} onCheckedChange={setDone} aria-label="Mark as done" />
          <Label htmlFor="done">Mark as done</Label>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" limit={200} defaultValue="Felt strong today." />
        </div>
        <Button type="submit">Save session</Button>
      </form>
    </PatternFrame>
  );
}

export const Form: Story = { name: 'Form with pickers', render: () => <SessionForm /> };
export const FormWithError: Story = {
  name: 'Form with an error',
  render: () => <SessionForm showError />,
};

export const Empty: Story = {
  name: 'Empty state',
  render: () => (
    <PatternFrame follows={[{ id: 'ui-components', rule: 'empty states' }]}>
      <EmptyState
        icon={<InboxIcon />}
        title="No sessions yet"
        description="Log your first session to see it here."
        action={<Button>Add session</Button>}
      />
    </PatternFrame>
  ),
};

export const ErrorState: Story = {
  name: 'Error state',
  render: () => (
    <PatternFrame follows={[{ id: 'ui-components', rule: 'loading screens: show the reason' }]}>
      <AlertBanner
        action={
          <Button size="sm" variant="outline">
            Try again
          </Button>
        }
      >
        Could not load your sessions. Check your connection and try again.
      </AlertBanner>
    </PatternFrame>
  ),
};

export const Loading: Story = {
  name: 'Loading state',
  render: () => (
    <PatternFrame
      follows={[{ id: 'ui-components', rule: 'loading screens: Skeleton of the real shape' }]}
    >
      <div aria-busy="true" aria-label="Loading sessions" role="group">
        <SkeletonList rows={4} />
      </div>
    </PatternFrame>
  ),
};

export const Dialogs: Story = {
  name: 'Dialog and drawer',
  render: () => (
    <PatternFrame
      follows={[
        { id: 'design-guidelines', rule: 'confirm destructive actions' },
        { id: 'ui-components', rule: 'ConfirmDialog and Drawer' },
      ]}
    >
      <div className="flex flex-wrap gap-3">
        <ConfirmDialog
          title="Delete this session?"
          description="This cannot be undone."
          trigger={<Button variant="destructive">Delete session</Button>}
          onConfirm={() => undefined}
        />
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Add a set</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Add a set</DrawerTitle>
              <DrawerDescription>Enter the weight and repetitions.</DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <NumberInput label="Repetitions" value="8" onValueChange={() => undefined} min={1} />
            </div>
            <DrawerFooter>
              <Button>Add</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </PatternFrame>
  ),
};
