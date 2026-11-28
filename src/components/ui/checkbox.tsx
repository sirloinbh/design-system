import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import type * as React from 'react';

import { ConfirmIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';

// The box stays 16px; an invisible ::after area makes it 44×44px to tap.
// The inset is measured from inside the 1px border: (16 - 2) + 15 × 2 = 44px (#415).
function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer relative size-4 shrink-0 cursor-pointer rounded-sm border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:data-[state=checked]:bg-primary',
        "after:absolute after:-inset-[15px] after:content-['']",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="flex items-center justify-center text-current">
        <ConfirmIcon className="size-3.5" aria-hidden />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
