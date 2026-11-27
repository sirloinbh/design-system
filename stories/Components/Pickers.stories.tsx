import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Combobox } from '../../src/components/ui/combobox';
import { DateField, TimeField } from '../../src/components/ui/date-field';
import { DateStepper, RangeSummary } from '../../src/components/ui/date-stepper';
import { Label } from '../../src/components/ui/label';
import { NativeSelect } from '../../src/components/ui/native-select';
import { NumberInput } from '../../src/components/ui/number-input';
import { SegmentedControl } from '../../src/components/ui/segmented-control';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../src/components/ui/select';

const meta = { title: 'Components/Pickers', parameters: { layout: 'padded' } } satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const EXERCISES = ['Bench press', 'Squat', 'Deadlift', 'Overhead press', 'Barbell row'];

function SegmentedDemo() {
  const [value, setValue] = useState('week');
  return (
    <SegmentedControl
      label="Range"
      value={value}
      onValueChange={setValue}
      options={[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
      ]}
    />
  );
}

export const Segmented: Story = { name: 'SegmentedControl', render: () => <SegmentedDemo /> };

export const NativeSelectDefault: Story = {
  name: 'NativeSelect',
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="unit">Unit</Label>
      <NativeSelect id="unit" defaultValue="kg">
        <option value="kg">Kilograms</option>
        <option value="lb">Pounds</option>
      </NativeSelect>
    </div>
  ),
};

export const SelectDefault: Story = {
  name: 'Select',
  render: () => (
    <Select defaultValue="squat">
      <SelectTrigger className="w-64" aria-label="Exercise">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Lower body</SelectLabel>
          <SelectItem value="squat">Squat</SelectItem>
          <SelectItem value="deadlift">Deadlift</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

function ComboboxDemo() {
  const [value, setValue] = useState('');
  return (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="combo">Exercise</Label>
      <Combobox
        id="combo"
        value={value}
        onValueChange={setValue}
        options={EXERCISES}
        listLabel="Suggested exercises"
        emptyMessage="No match. The typed name is saved as a new exercise."
      />
    </div>
  );
}

export const ComboboxDefault: Story = { name: 'Combobox', render: () => <ComboboxDemo /> };

function NumberDemo() {
  const [value, setValue] = useState('60');
  return (
    <NumberInput
      label="Weight"
      value={value}
      onValueChange={setValue}
      step={2.5}
      min={0}
      max={500}
    />
  );
}

export const NumberInputDefault: Story = { name: 'NumberInput', render: () => <NumberDemo /> };

function DateDemo() {
  const [value, setValue] = useState('2026-11-28');
  return (
    <div className="w-64">
      <DateField label="Date" value={value} onValueChange={setValue} today="2026-11-28" />
    </div>
  );
}

export const DateFieldDefault: Story = { name: 'DateField', render: () => <DateDemo /> };

function TimeDemo() {
  const [value, setValue] = useState('18:30');
  return (
    <div className="w-64">
      <TimeField label="Start time" value={value} onValueChange={setValue} />
    </div>
  );
}

export const TimeFieldDefault: Story = { name: 'TimeField', render: () => <TimeDemo /> };

function StepperDemo() {
  const [value, setValue] = useState('2026-11-28');
  return (
    <div>
      <DateStepper
        label="Week of"
        value={value}
        onValueChange={setValue}
        onMove={(direction) => setValue(direction === 1 ? '2026-12-05' : '2026-11-21')}
      />
      <RangeSummary from="2026-11-23" to="2026-11-29">
        4 sessions
      </RangeSummary>
    </div>
  );
}

export const DateStepperDefault: Story = { name: 'DateStepper', render: () => <StepperDemo /> };
