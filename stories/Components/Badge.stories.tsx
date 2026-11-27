import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from '../../src/components/ui/badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'Active' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'success', 'warning', 'outline'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Success: Story = { args: { variant: 'success', children: 'Done' } };
export const Warning: Story = { args: { variant: 'warning', children: 'Pending' } };
export const Destructive: Story = { args: { variant: 'destructive', children: 'Failed' } };
export const Outline: Story = { args: { variant: 'outline' } };
