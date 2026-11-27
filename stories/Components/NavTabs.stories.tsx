import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';

import { NavTabs } from '../../src/components/nav-tabs/nav-tabs';

const meta = {
  title: 'Components/NavTabs',
  component: NavTabs,
  args: {
    label: 'Categories',
    items: [
      { to: '/items', label: 'All', end: true },
      { to: '/items/books', label: 'Books' },
      { to: '/items/music', label: 'Music' },
    ],
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/items/books']}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof NavTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
