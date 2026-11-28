import type { Meta, StoryObj } from '@storybook/react-vite';

import { BusyButton } from '../../src/components/busy-button/busy-button';

const meta = {
  title: 'Components/BusyButton',
  component: BusyButton,
  args: { children: 'Save entry' },
} satisfies Meta<typeof BusyButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Idle: Story = {};

export const Busy: Story = { args: { busy: true } };

export const BusyOutline: Story = { args: { busy: true, variant: 'outline' } };
