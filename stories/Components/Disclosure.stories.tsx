import type { Meta, StoryObj } from '@storybook/react-vite';

import { Disclosure } from '../../src/components/disclosure/disclosure';

const meta = {
  title: 'Components/Disclosure',
  component: Disclosure,
  args: {
    summary: 'Advanced options',
    children: 'These settings are rarely needed. The block is a native details element.',
  },
} satisfies Meta<typeof Disclosure>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const Open: Story = { args: { open: true } };

export const Group: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-2">
      <Disclosure summary="First question">Answer one.</Disclosure>
      <Disclosure summary="Second question">Answer two.</Disclosure>
    </div>
  ),
};
