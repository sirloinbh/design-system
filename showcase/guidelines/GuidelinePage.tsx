import { Markdown } from '@storybook/addon-docs/blocks';
import { type MouseEvent, useEffect, useRef } from 'react';

import { GUIDELINE_DOCS, rewriteLinks } from './docs';

// Renders one guideline document. Links between documents are rewritten to showcase pages and open in the
// Storybook window, not inside the preview frame. Markdown task list boxes get the text of their line as
// their accessible name.
export function GuidelinePage({ id }: { id: string }) {
  const doc = GUIDELINE_DOCS.find((d) => d.id === id);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    container.current
      ?.querySelectorAll<HTMLInputElement>('li > input[type="checkbox"]')
      .forEach((box) => {
        const text = box.parentElement?.textContent?.trim();
        if (text && !box.getAttribute('aria-label')) box.setAttribute('aria-label', text);
      });
  });
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
    <div ref={container} onClick={open} style={{ maxWidth: 960, width: '100%', padding: 16 }}>
      <Markdown>{rewriteLinks(doc.source, GUIDELINE_DOCS)}</Markdown>
    </div>
  );
}
