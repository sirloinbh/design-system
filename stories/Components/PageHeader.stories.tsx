import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';

import { PageHeader } from '../../src/components/ui/page-header';

const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,
  args: { title: 'Item details', description: 'Everything about this item.' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBackLink: Story = { args: { backTo: { to: '/items', label: 'All items' } } };
