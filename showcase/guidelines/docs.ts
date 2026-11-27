// The guideline documents rendered as showcase pages. Their Markdown files stay the single source.
import designSystem from '../../docs/design-system.md?raw';
import guidelines from '../../docs/guidelines.md?raw';
import layout from '../../docs/layout.md?raw';
import reviewChecklist from '../../docs/review-checklist.md?raw';
import uiComponents from '../../docs/ui-components.md?raw';
import type { DocSource } from '../search';

export const GUIDELINE_DOCS: (DocSource & { file: string })[] = [
  {
    id: 'design-guidelines',
    title: 'Design guidelines',
    file: 'guidelines.md',
    source: guidelines,
  },
  {
    id: 'review-checklist',
    title: 'Review checklist',
    file: 'review-checklist.md',
    source: reviewChecklist,
  },
  { id: 'design-system', title: 'Design system', file: 'design-system.md', source: designSystem },
  { id: 'layout', title: 'Layout', file: 'layout.md', source: layout },
  { id: 'ui-components', title: 'UI components', file: 'ui-components.md', source: uiComponents },
];

// A relative link to another guideline document becomes a link to its showcase page.
export function rewriteLinks(source: string, docs: { id: string; file: string }[]): string {
  return source.replace(/\]\(([\w-]+\.md)(#[^)]*)?\)/g, (match, file: string) => {
    const doc = docs.find((d) => d.file === file);
    return doc ? `](?path=/docs/guidelines-${doc.id}--docs)` : match;
  });
}
