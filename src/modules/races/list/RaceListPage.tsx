import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import {
  fetchRaces,
  ListPage,
  Race,
  EntityCard,
  gridSizeShowcase,
  useNotify,
  usePagedQuery,
  useViewTransitionNavigate,
  viewTransitionName,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import NameRealmFilters from '../../shared/filters/NameRealmFilters';

/** Races are created from their realm's page (they need a realmId), so this list has no add button. */
export default function RaceListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useViewTransitionNavigate();
  const notify = useNotify();
  const [rsql, setRsql] = useState('');
  const query = usePagedQuery<Race>({
    fetcher: (q, page, size) => fetchRaces(q, page, size, auth),
    rsql,
    onError: notify.error,
  });

  return (
    <ListPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('races') }]}
      query={query}
      filters={<NameRealmFilters onChange={setRsql} />}
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
