import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { LoadingIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

// Spinner for short waits and buttons that are saving. Three sizes only (docs/design-system.md).
const spinnerVariants = cva('animate-spin motion-reduce:animate-none', {
  variants: { size: { sm: 'size-4', md: 'size-6', lg: 'size-8' } },
  defaultVariants: { size: 'md' },
});

function Spinner({
  className,
  size,
  label = 'Loading',
  ...props
}: Omit<React.ComponentProps<'svg'>, 'children'> & VariantProps<typeof spinnerVariants> & { label?: string }) {
  return (
    <LoadingIcon
      data-slot="spinner"
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- shadcn/ui exports the variants next to the component.
export { Spinner, spinnerVariants };
