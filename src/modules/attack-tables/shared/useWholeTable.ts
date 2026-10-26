import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import type { AuthContextProps } from 'react-oidc-context';
import { isApiError, useNotify } from '@labcabrera-rmu/rmu-react-shared-lib';

export type WholeTable<T> = { data?: T; loading: boolean; forbidden: boolean };

/**
 * Loads a whole table (rulebook content). A 403 means the user has no Core Law access: the page shows a notice instead
 * of an error.
 */
export const useWholeTable = <T>(
  key: string | null | undefined,
  loader: (key: string, auth: AuthContextProps) => Promise<T>
): WholeTable<T> => {
  const auth = useAuth();
  const notify = useNotify();
  const [state, setState] = useState<WholeTable<T>>({ loading: false, forbidden: false });

  useEffect(() => {
    if (!key) return;
    let current = true;
    setState({ loading: true, forbidden: false });
    loader(key, auth)
      .then((data) => current && setState({ data, loading: false, forbidden: false }))
      .catch((err) => {
        if (!current) return;
        const forbidden = isApiError(err) && err.status === 403;
        if (!forbidden) notify.error(err);
        setState({ loading: false, forbidden });
      });
    return () => {
      current = false;
    };
  }, [key]);

  return state;
};
