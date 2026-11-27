import type { Meta, StoryObj } from '@storybook/react-vite';

import { GuidelinePage } from '../../showcase/guidelines/GuidelinePage';

const meta = {
  title: 'Guidelines/Review checklist',
  component: GuidelinePage,
  args: { id: 'review-checklist' },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof GuidelinePage>;

export default meta;

export const Page: StoryObj<typeof meta> = {};
