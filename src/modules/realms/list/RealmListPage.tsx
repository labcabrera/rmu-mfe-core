import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  EntityAccessChip,
  EntityCard,
  EntitySourceChip,
  EnumPicker,
  fetchRealms,
  FilterBar,
  FilterSearchField,
  ListPage,
  Realm,
  REALM_SCOPES,
  RealmScope,
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
  const filters = useListFilters<Realm>({
    q: regexFilter(t('name'), 'name'),
    // Spec 069: the API takes the scope outside the RSQL, so it has no toRsql and goes as the query key.
    scope: {
      kind: 'single',
      label: t('realm-scope'),
      options: REALM_SCOPES,
      format: (value) => t(`realm-scope-${value}`),
    },
  });
  const scope = (filters.get('scope') || undefined) as RealmScope | undefined;
  const bindScope = {
    value: filters.get('scope') || null,
    onChange: (value: string | null) => filters.set('scope', value),
    allowAll: true,
  };
  const query = usePagedQuery<Realm>({
    fetcher: (q, page, size) => fetchRealms(q, page, size, auth, scope),
    rsql: filters.rsql,
    key: scope,
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
          <EnumPicker
            {...bindScope}
            variant="select"
            label={t('realm-scope')}
            values={REALM_SCOPES}
            labelPrefix="realm-scope-"
          />
        </FilterBar>
      }
      filterState={filters}
      collection={{ modes: ['cards'], storageKey: 'core.realms' }}
      renderItem={(realm) => (
        <EntityCard
          title={realm.name}
          image={realm.imageUrl || DEFAULT_REALM_IMAGE}
          chips={
            <>
              <EntitySourceChip entity={realm} />
              <EntityAccessChip entity={realm} />
            </>
          }
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
