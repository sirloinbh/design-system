import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { ListToolbar } from '../../src/components/list-toolbar/list-toolbar';

const status = [
  { value: '', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'done', label: 'Done' },
];
const order = [
  { value: 'newest', label: 'Newest first' },
  { value: 'name', label: 'Name' },
];

function Demo({
  initialSearch = '',
  initialStatus = '',
}: {
  initialSearch?: string;
  initialStatus?: string;
}) {
  const [q, setQ] = useState(initialSearch);
  const [state, setState] = useState(initialStatus);
  const [by, setBy] = useState('newest');
  return (
    <ListToolbar
      search={{ label: 'Search', value: q, onChange: setQ, placeholder: 'Title or note' }}
      filters={[{ label: 'Status', value: state, options: status, onChange: setState }]}
      sort={{ label: 'Sort by', value: by, options: order, onChange: setBy }}
      resultCount={q || state ? 3 : 12}
      onReset={() => {
        setQ('');
        setState('');
      }}
    />
  );
}

const meta = {
  title: 'Components/ListToolbar',
  component: ListToolbar,
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ListToolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Demo /> };

export const WithActiveFilters: Story = {
  render: () => <Demo initialSearch="bench" initialStatus="open" />,
};

export const SearchOnly: Story = {
  render: () => (
    <ListToolbar search={{ label: 'Search', value: '', onChange: () => {} }} resultCount={1} />
  ),
};
