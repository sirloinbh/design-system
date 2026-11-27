import type { Meta, StoryObj } from '@storybook/react-vite';

import { List, ListItem, ListItemActions } from '../../src/components/list/list';
import { Button } from '../../src/components/ui/button';

const meta = { title: 'Components/List', component: List } satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithActions: Story = {
  render: () => (
    <List aria-label="Workouts" className="max-w-md">
      {['Bench press', 'Squat', 'Deadlift'].map((name) => (
        <ListItem key={name}>
          {name}
          <ListItemActions>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </ListItemActions>
        </ListItem>
      ))}
    </List>
  ),
};
