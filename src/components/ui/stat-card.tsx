import type { ReactNode } from 'react';

import { cn } from '../../lib/utils';
import { Card } from './card';

// One summary number in a row of cards: a label, the value with its unit, and a short note.
export function StatCard({
  label,
  value,
  unit,
  icon,
  foot,
  className,
}: {
  label: string;
  value: string;
  unit: string;
  icon: ReactNode;
  foot: string;
  className?: string;
}) {
  return (
    <Card data-slot="stat" className={cn('gap-3 p-4 shadow-none xl:p-5', className)}>
      <div className="flex items-center justify-between gap-2 text-caption text-muted-foreground">
        {label}
        <span className="flex rounded-md bg-muted p-1.5 text-foreground">{icon}</span>
      </div>
      <div
        data-slot="stat-value"
        className="text-stat break-words"
      >
        {value}
        <small className="ml-1.5 text-caption tracking-normal text-muted-foreground">{unit}</small>
      </div>
      <div className="text-meta text-muted-foreground">{foot}</div>
    </Card>
  );
}
