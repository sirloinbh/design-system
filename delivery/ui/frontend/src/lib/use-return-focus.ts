import { type MouseEvent, type RefObject, useCallback, useEffect, useRef, useState } from 'react';

/**
 * Sends keyboard focus back to the button that opened a dialog once the dialog closes (#76).
 * A dialog opened without a Radix `DialogTrigger` (a button that sets state, or an address such as `?day=`)
 * gives Radix nothing to return to, so focus would drop to <body>. When the opener is gone, for example after a
 * save redraws the list, focus goes to `fallback` (the add button or the section heading, which needs tabIndex={-1}).
 *
 * Call `remember` when a button opens the dialog, and pass `onCloseAutoFocus` to the dialog content.
 * Call the hook from the component that draws the list, so a redraw runs the check below.
 */
export function useReturnFocus(fallback: RefObject<HTMLElement | null>) {
  const opener = useRef<HTMLElement | null>(null);
  // Set from closing until the opener is gone, focus has moved on from it, or a new dialog opens.
  const watching = useRef(false);
  // Whether focus has been handed back since the last close.
  const returned = useRef(false);
  const [returns, setReturns] = useState(0);

  // The closing dialog moves focus on a timer of its own first.
  useEffect(() => {
    if (!returns) return;
    const timer = setTimeout(() => {
      const target = opener.current?.isConnected ? opener.current : fallback.current;
      target?.focus();
      returned.current = true;
    }, 0);
    return () => clearTimeout(timer);
  }, [fallback, returns]);

  // After every redraw: a list read again after a save may have removed the opener while it had focus,
  // which drops focus to <body>. No dependencies, as the redraw can come from any state.
  useEffect(() => {
    if (!watching.current) return;
    const active = document.activeElement;
    if (!opener.current?.isConnected) {
      watching.current = false;
      if (active === document.body) fallback.current?.focus();
      return;
    }
    // Focus went elsewhere after it was handed back: later redraws are none of this hook's business.
    if (returned.current && active !== opener.current && active !== document.body) {
      watching.current = false;
    }
  });

  /** Call when the dialog opens: with the opening element, or with the click event of the opening button. */
  const remember = useCallback((openerOrEvent: HTMLElement | MouseEvent<HTMLElement>) => {
    opener.current = 'currentTarget' in openerOrEvent ? openerOrEvent.currentTarget : openerOrEvent;
    watching.current = false;
  }, []);

  /** Call when the dialog closes, if you do not pass `onCloseAutoFocus` to the dialog content. */
  const returnFocus = useCallback(() => {
    watching.current = true;
    returned.current = false;
    setReturns((count) => count + 1);
  }, []);

  /** Pass to the dialog content's `onCloseAutoFocus`: it stops Radix from focusing <body> and returns focus here. */
  const onCloseAutoFocus = useCallback(
    (event: Event) => {
      event.preventDefault();
      returnFocus();
    },
    [returnFocus],
  );

  return { remember, returnFocus, onCloseAutoFocus };
}
