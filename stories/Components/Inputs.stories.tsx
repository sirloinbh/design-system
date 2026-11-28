import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from '../../src/components/ui/checkbox';
import { FieldError } from '../../src/components/ui/field';
import { Input } from '../../src/components/ui/input';
import { Label } from '../../src/components/ui/label';
import { Switch } from '../../src/components/ui/switch';
import { Textarea } from '../../src/components/ui/textarea';

const meta = { title: 'Components/Inputs', parameters: { layout: 'padded' } } satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextInput: Story = {
  name: 'Input',
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="exercise">Exercise</Label>
      <Input id="exercise" />
    </div>
  ),
};

export const InputDisabled: Story = {
  name: 'Input (disabled)',
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="locked">Locked</Label>
      <Input id="locked" value="Read only value" disabled readOnly />
    </div>
  ),
};

export const InputWithError: Story = {
  name: 'Input (error)',
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="weight">Weight</Label>
      <Input id="weight" defaultValue="-5" aria-invalid="true" aria-describedby="weight-error" />
      <FieldError name="weight">Enter a weight of 0 or more.</FieldError>
    </div>
  ),
};

export const TextareaWithLimit: Story = {
  name: 'Textarea',
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="memo">Memo</Label>
      <Textarea id="memo" limit={200} defaultValue="Felt strong today." />
    </div>
  ),
};

export const CheckboxStates: Story = {
  name: 'Checkbox',
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="c1" defaultChecked />
        <Label htmlFor="c1">Warm-up done</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c2" />
        <Label htmlFor="c2">Stretch</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c3" disabled />
        <Label htmlFor="c3">Not available</Label>
      </div>
    </div>
  ),
};

export const SwitchStates: Story = {
  name: 'Switch',
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Switch id="s1" defaultChecked aria-label="Reminders" />
        <Label htmlFor="s1">Reminders</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="s2" aria-label="Weekly email" />
        <Label htmlFor="s2">Weekly email</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="s3" disabled aria-label="Locked" />
        <Label htmlFor="s3">Locked</Label>
      </div>
    </div>
  ),
};
