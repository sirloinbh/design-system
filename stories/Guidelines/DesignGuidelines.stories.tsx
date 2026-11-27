import type { Meta, StoryObj } from '@storybook/react-vite';

import { GuidelinePage } from '../../showcase/guidelines/GuidelinePage';

const meta = {
  title: 'Guidelines/Design guidelines',
  component: GuidelinePage,
  args: { id: 'design-guidelines' },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof GuidelinePage>;

export default meta;

export const Page: StoryObj<typeof meta> = {};
