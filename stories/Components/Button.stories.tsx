import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlusIcon } from 'lucide-react';

import { Button } from '../../src/components/ui/button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Save' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Link: Story = { args: { variant: 'link' } };
export const Destructive: Story = { args: { variant: 'destructive', children: 'Delete' } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
export const Disabled: Story = { args: { disabled: true } };
export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <PlusIcon aria-hidden /> Add workout
    </Button>
  ),
};
export const IconOnly: Story = {
  args: { size: 'icon', 'aria-label': 'Add', children: <PlusIcon aria-hidden /> },
};
