import type { Meta, StoryObj } from '@storybook/react-vite';

function SampleButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="sample-button"
      style={{ minHeight: 40, padding: '0 16px', cursor: 'pointer' }}
    >
      {label}
    </button>
  );
}

const meta = {
  title: 'Components/Sample',
  component: SampleButton,
  args: { label: 'Save' },
} satisfies Meta<typeof SampleButton>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
