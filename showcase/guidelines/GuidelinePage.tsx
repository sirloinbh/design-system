import { Markdown } from '@storybook/addon-docs/blocks';
import type { MouseEvent } from 'react';

import { GUIDELINE_DOCS, rewriteLinks } from './docs';

// Renders one guideline document. Links between documents are rewritten to showcase pages and open in the
// Storybook window, not inside the preview frame.
export function GuidelinePage({ id }: { id: string }) {
  const doc = GUIDELINE_DOCS.find((d) => d.id === id);
  if (!doc) return <p>Unknown guideline document: {id}</p>;
  const open = (event: MouseEvent<HTMLDivElement>) => {
    const link = (event.target as HTMLElement).closest('a');
    const href = link?.getAttribute('href');
    if (href?.startsWith('?path=')) {
      event.preventDefault();
      window.top?.location.assign(href);
    }
  };
  return (
    // The wrapper only catches clicks that bubble up from links.
    // eslint-disable-next-line jsx-a11y-x/click-events-have-key-events, jsx-a11y-x/no-static-element-interactions
    <div onClick={open} style={{ maxWidth: 960, width: '100%', padding: 16 }}>
      <Markdown>{rewriteLinks(doc.source, GUIDELINE_DOCS)}</Markdown>
    </div>
  );
}
