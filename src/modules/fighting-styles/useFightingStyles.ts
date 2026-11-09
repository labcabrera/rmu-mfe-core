import { useAuth } from 'react-oidc-context';
import { fetchFightingStyles, FightingStyles } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useQuery } from '@tanstack/react-query';

/** The catalog of fighting styles, one document that only changes on an import: the list and the detail share it. */
export const useFightingStyles = () => {
  const auth = useAuth();
  return useQuery<FightingStyles>({
    queryKey: ['fighting-styles'],
    queryFn: () => fetchFightingStyles(auth),
    staleTime: Infinity,
  });
};
