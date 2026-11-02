import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  EntityCard,
  EntitySourceChip,
  fetchRealms,
  FilterBar,
  FilterSearchField,
  ListPage,
  Realm,
  regexFilter,
  useListFilters,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { DEFAULT_REALM_IMAGE } from '../../services/image-service';

export default function RealmListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const filters = useListFilters<Realm>({ q: regexFilter(t('name'), 'name') });
  const query = usePagedQuery<Realm>({
    fetcher: (q, page, size) => fetchRealms(q, page, size, auth),
    rsql: filters.rsql,
    onError: notify.error,
  });

  return (
    <ListPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('realms') }]}
      query={query}
      onAdd={() => navigate('/core/realms/create')}
      filters={
        <FilterBar>
          <FilterSearchField filters={filters} filter="q" label={t('name')} />
        </FilterBar>
      }
      filterState={filters}
      collection={{ modes: ['cards'], storageKey: 'core.realms' }}
      renderItem={(realm) => (
        <EntityCard
          title={realm.name}
          image={realm.imageUrl || DEFAULT_REALM_IMAGE}
          chips={<EntitySourceChip entity={realm} />}
          description={realm.shortDescription || t('no-description')}
          metrics={[{ label: t('magic-presence'), value: t(realm.magicPresence) }]}
          locked={realm.accessType === 'private'}
          lockedLabel={t('private')}
          onClick={() => navigate(`/core/realms/view/${realm.id}`, { state: { realm } })}
        />
      )}
    />
  );
}
