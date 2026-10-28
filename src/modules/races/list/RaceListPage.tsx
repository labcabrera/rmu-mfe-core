import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import {
  fetchRaces,
  ListPage,
  Race,
  EntityCard,
  gridSizeShowcase,
  useNotify,
  useListFilters,
  usePagedQuery,
  useViewTransitionNavigate,
  viewTransitionName,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import NameRealmFilters, { nameRealmSchema } from '../../shared/filters/NameRealmFilters';
import { useRealms } from '../../shared/filters/list-filters';

/** Races are created from their realm's page (they need a realmId), so this list has no add button. */
export default function RaceListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useViewTransitionNavigate();
  const notify = useNotify();
  const realms = useRealms();
  const filters = useListFilters(nameRealmSchema<Race>(t, realms));
  const query = usePagedQuery<Race>({
    fetcher: (q, page, size) => fetchRaces(q, page, size, auth),
    rsql: filters.rsql,
    onError: notify.error,
  });

  return (
    <ListPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('races') }]}
      query={query}
      filters={<NameRealmFilters filters={filters} realms={realms} />}
      filterState={filters}
      collection={{ modes: ['cards'], storageKey: 'core.races', cardSize: gridSizeShowcase }}
      renderItem={(race) => (
        <EntityCard
          title={race.name}
          subtitle={race.archetype ? t(race.archetype) : undefined}
          image={race.imageUrl}
          imageRatio="square"
          imageTransitionName={viewTransitionName('race', race.id)}
          metrics={[
            { label: t('size'), value: t(`size-${race.sizeId}`) },
            { label: t('hit-points'), value: race.baseHits },
            { label: t('race-bonus-dev-points'), value: race.baseDevPoints },
          ]}
          locked={race.accessType === 'private'}
          lockedLabel={t('private')}
          onClick={() => navigate(`/core/races/view/${race.id}`, { state: { race } })}
        />
      )}
    />
  );
}
