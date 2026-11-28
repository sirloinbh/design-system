import type { Meta, StoryObj } from '@storybook/react-vite';

import { ResponsiveModal } from '../../src/components/responsive-modal/responsive-modal';
import { Button } from '../../src/components/ui/button';
import { Input } from '../../src/components/ui/input';

const meta = {
  title: 'Components/ResponsiveModal',
  component: ResponsiveModal,
  args: {
    title: 'Edit workout',
    description: 'Below 640px this is a sheet at the bottom of the screen.',
    open: true,
    children: <Input aria-label="Name" defaultValue="Bench press" />,
    footer: <Button>Save</Button>,
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ResponsiveModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sheet: Story = {};

export const Full: Story = { args: { layout: 'full', title: 'Edit routine' } };
