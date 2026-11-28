import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

// One filter, tab or date kept in the address (`?q=`, `?status=`), so a reload, the back button and a shared link find
// the same view (#78). It needs a React Router context. For a date use `readDateParam` and `writeDateParam` from the
// period helpers.

type Options = {
  /** Replace the history entry instead of adding one. Use it for a field the person types into. */
  replace?: boolean;
  /** Other parameters to remove when this one changes, for example `['page']` so a new filter starts on page one. */
  resetKeys?: string[];
};

/**
 * `[value, setValue]` for `?key=`. The value is `fallback` (an empty string by default) when the parameter is absent.
 * Setting the fallback or an empty string removes the parameter, so the default view keeps a short address. Other
 * parameters stay as they are.
 */
export function useUrlParam(
  key: string,
  fallback = '',
  { replace = false, resetKeys = [] }: Options = {},
) {
  const [params, setParams] = useSearchParams();
  const value = params.get(key) ?? fallback;
  const reset = resetKeys.join('\n');

  const setValue = useCallback(
    (next: string) => {
      setParams(
        (previous) => {
          const updated = new URLSearchParams(previous);
          if (next === fallback || next === '') updated.delete(key);
          else updated.set(key, next);
          for (const other of reset ? reset.split('\n') : []) updated.delete(other);
          return updated;
        },
        { replace },
      );
    },
    [fallback, key, replace, reset, setParams],
  );

  return [value, setValue] as const;
}
