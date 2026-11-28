import type * as React from 'react';

import { cn } from '../../lib/utils';

// A grid of label and value pairs on the native <dl>, <dt> and <dd> (#75). The apps wrote this markup by hand in
// 28 files: a muted label over a normal value, in 1, 2 or 3 columns. `columns` is the count from the `sm` width up;
// a phone always gets one column. Put each pair in a DescriptionItem.

const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-3',
} as const;

function DescriptionList({
  columns = 2,
  className,
  ...props
}: React.ComponentProps<'dl'> & { columns?: keyof typeof columnClasses }) {
  return (
    <dl
      data-slot="description-list"
      className={cn('grid gap-x-4 gap-y-3 text-body-sm', columnClasses[columns], className)}
      {...props}
    />
  );
}

function DescriptionItem({
  label,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<'div'>, 'children'> & {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div data-slot="description-item" className={cn('min-w-0', className)} {...props}>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="m-0 break-words">{children}</dd>
    </div>
  );
}

export { DescriptionItem, DescriptionList };
