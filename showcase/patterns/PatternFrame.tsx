import type { ReactNode } from 'react';

import { guidelineHref, type GuidelineId, GUIDELINES } from './guideline-links';

// Every pattern page names the guideline it follows and links to it (opens in the Storybook window).
export function PatternFrame({
  follows,
  children,
}: {
  follows: { id: GuidelineId; rule: string }[];
  children: ReactNode;
}) {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-4 p-4">
      <p className="text-caption text-muted-foreground" data-slot="pattern-guidelines">
        Follows:{' '}
        {follows.map((f, i) => (
          <span key={f.id + f.rule}>
            {i > 0 ? ', ' : ''}
            <a
              href={guidelineHref(f.id)}
              target="_top"
              className="cursor-pointer text-foreground underline underline-offset-4"
            >
              {GUIDELINES[f.id].label}
            </a>{' '}
            ({f.rule})
          </span>
        ))}
      </p>
      {children}
    </div>
  );
}
