import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';

import { Button } from '../../src/components/ui/button';
import { PageHeader } from '../../src/components/ui/page-header';

const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,
  args: {
    title: 'Week',
    description: 'Your sessions from Monday to Sunday',
    eyebrow: 'Workout memo',
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithActions: Story = { args: { actions: <Button>Add session</Button> } };
export const TitleOnly: Story = { args: { description: undefined, eyebrow: undefined } };

export const WithBackLink: Story = {
  args: { backTo: { to: '/items', label: 'All items' } },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};
