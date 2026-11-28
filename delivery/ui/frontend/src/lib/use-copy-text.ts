import { useCallback } from 'react';

import { useNotice } from './use-notice';

// Copies text to the clipboard and says whether it worked (#77). Show the message with <Notice notice={notice} />.
// Where the browser has no clipboard (an older browser, an insecure page) or refuses the permission, the message tells
// the person to copy by hand, so keep the text on screen, selectable.

type Messages = { success?: string; failure?: string };

const defaultMessages = {
  success: 'Copied',
  failure: 'Could not copy. Select the text and copy it by hand.',
};

/**
 * `copy(text)` resolves to true when the text was copied, false when it was not. The `notice` it sets holds the
 * message (kind "status" or "error"). Pass messages to the hook for the page default, or to one `copy` call to word
 * that one ("Link copied.").
 */
export function useCopyText(defaults: Messages = {}) {
  const { notice, status, error, clear } = useNotice();
  const { success: defaultSuccess, failure: defaultFailure } = { ...defaultMessages, ...defaults };

  const copy = useCallback(
    async (text: string, messages: Messages = {}) => {
      try {
        const clipboard = globalThis.navigator?.clipboard;
        if (!clipboard) throw new Error('no clipboard');
        await clipboard.writeText(text);
        status(messages.success ?? defaultSuccess);
        return true;
      } catch {
        error(messages.failure ?? defaultFailure);
        return false;
      }
    },
    [defaultFailure, defaultSuccess, error, status],
  );

  return { copy, notice, clear };
}
