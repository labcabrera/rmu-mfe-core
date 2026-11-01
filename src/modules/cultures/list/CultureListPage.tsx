import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  Culture,
  defaultImages,
  EntityCard,
  EntitySourceChip,
  fetchCultures,
  ListPage,
  useListFilters,
  useNotify,
  usePagedQuery,
  useRealms,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import NameRealmFilters, { nameRealmSchema } from '../../shared/filters/NameRealmFilters';

export default function CultureListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const realms = useRealms();
  const filters = useListFilters(nameRealmSchema<Culture>(t, realms, 'realm.id'));
  const query = usePagedQuery<Culture>({
    fetcher: (q, page, size) => fetchCultures(q, page, size, auth),
    rsql: filters.rsql,
    onError: notify.error,
  });

  return (
    <ListPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('cultures') }]}
      query={query}
      onAdd={() => navigate('/core/cultures/create')}
      filtersLayout="side"
      filterState={filters}
      filtersStorageKey="core.cultures"
      filters={<NameRealmFilters filters={filters} realms={realms} />}
      collection={{ modes: ['cards'], storageKey: 'core.cultures' }}
      renderItem={(culture) => (
        <EntityCard
          title={t(culture.name)}
          image={culture.imageUrl || defaultImages.culture}
          chips={<EntitySourceChip entity={culture} />}
          description={culture.description}
          metrics={[{ label: t('skills'), value: culture.skillRanks?.length ?? 0 }]}
          onClick={() => navigate(`/core/cultures/view/${culture.id}`, { state: { culture } })}
        />
      )}
    />
  );
}
