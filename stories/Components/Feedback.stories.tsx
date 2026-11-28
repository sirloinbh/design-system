import type { Meta, StoryObj } from '@storybook/react-vite';
import { InboxIcon } from 'lucide-react';
import { toast } from 'sonner';

import { AlertBanner } from '../../src/components/ui/alert-banner';
import { Button } from '../../src/components/ui/button';
import { EmptyState } from '../../src/components/ui/empty-state';
import { Notice } from '../../src/components/ui/notice';
import {
  Skeleton,
  SkeletonCard,
  SkeletonList,
  SkeletonText,
} from '../../src/components/ui/skeleton';
import { Toaster } from '../../src/components/ui/sonner';
import { Spinner } from '../../src/components/ui/spinner';

const meta = { title: 'Components/Feedback', parameters: { layout: 'padded' } } satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AlertBannerDefault: Story = {
  name: 'AlertBanner',
  render: () => (
    <AlertBanner
      action={
        <Button size="sm" variant="outline">
          Retry
        </Button>
      }
    >
      Saving failed. Check your connection and try again.
    </AlertBanner>
  ),
};

export const NoticeStatus: Story = {
  name: 'Notice (status)',
  render: () => <Notice notice={{ kind: 'status', text: 'Saved.' }} />,
};

export const NoticeError: Story = {
  name: 'Notice (error)',
  render: () => <Notice notice={{ kind: 'error', text: 'Could not save the session.' }} />,
};

export const Spinners: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const Skeletons: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-6">
      <Skeleton className="h-10 w-full" />
      <SkeletonText lines={3} />
      <SkeletonCard />
      <SkeletonList rows={3} />
    </div>
  ),
};

export const EmptyStateDefault: Story = {
  name: 'EmptyState',
  render: () => (
    <EmptyState
      icon={<InboxIcon />}
      title="No sessions yet"
      action={<Button>Add session</Button>}
    />
  ),
};

export const Toast: Story = {
  render: () => (
    <>
      <Toaster />
      <Button onClick={() => toast('Session saved')}>Show a toast</Button>
    </>
  ),
};
