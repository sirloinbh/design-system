import type { Meta, StoryObj } from '@storybook/react-vite';

import { Markdown } from '../../src/components/markdown/markdown';

const sample = `# Morning notes

A paragraph with **bold**, *emphasis*, \`inline code\` and a [link](https://example.com).
A new line stays a line break.

- First item
- Second item

1. Step one
2. Step two

> A quoted thought

\`\`\`
const total = 1 + 2;
\`\`\`

---

<script>alert(1)</script> is shown as text.`;

const meta = {
  title: 'Components/Markdown',
  component: Markdown,
  args: { children: sample },
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Markdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HeadingsStartAtH3: Story = {
  args: { headingStart: 3, children: '# Section\n\nText' },
};

export const UnsafeLinkKeepsText: Story = {
  args: { children: 'A [bad link](javascript:alert(1)) shows only its text.' },
};
