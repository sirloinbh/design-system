import type { Meta, StoryObj } from '@storybook/react-vite';

import { GuidelinePage } from '../../showcase/guidelines/GuidelinePage';

const meta = {
  title: 'Guidelines/Design system',
  component: GuidelinePage,
  args: { id: 'design-system' },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof GuidelinePage>;

export default meta;

export const Page: StoryObj<typeof meta> = {};
