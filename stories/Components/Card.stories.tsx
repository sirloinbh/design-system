import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../../src/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../src/components/ui/card';

const meta = { title: 'Components/Card', component: Card } satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Weekly summary</CardTitle>
        <CardDescription>Workouts logged this week</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>4 sessions, 3 hours 20 minutes in total.</p>
      </CardContent>
      <CardFooter>
        <Button>Open week</Button>
      </CardFooter>
    </Card>
  ),
};
