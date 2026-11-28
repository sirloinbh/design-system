import type { Meta, StoryObj } from '@storybook/react-vite';

import { BackupSection } from '../../src/components/backup-section/backup-section';

const meta = {
  title: 'Components/BackupSection',
  component: BackupSection,
  args: {
    description: 'Download your data, or load a copy you saved earlier.',
    fileName: 'backup.json',
    onExport: (): BlobPart | Promise<BlobPart> => JSON.stringify({ items: [] }),
    onImport: () => new Promise((resolve) => setTimeout(resolve, 600)),
  },
} satisfies Meta<typeof BackupSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ExportFails: Story = {
  args: { onExport: () => Promise.reject(new Error('Could not read the data')) },
};
