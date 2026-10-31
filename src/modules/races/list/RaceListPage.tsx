/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation } from 'react-router-dom';
import { Alert } from '@mui/material';
import {
  EntityCard,
  fetchRaces,
  ListPage,
  Race,
  useListFilters,
  useLocalPagedQuery,
  useNotify,
  useViewTransitionNavigate,
  viewTransitionName,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useRealms } from '../../shared/filters/list-filters';
import { archetypeLabel, RACE_ARCHETYPES, raceName } from '../race-format';
import RaceListFilters, { raceFilters } from './RaceListFilters';

/** The API limit of a catalog page: the list loads every race matching the filters at once. */
const RACE_LIST_MAX = 1000;

/**
 * The race list (spec 059). Races are created from their realm's page (they need a realmId), so it has no add button.
 * The RSQL filters go to the API with a catalog-sized page; the translated name is matched, sorted and paged on the
 * client.
 */
export default function RaceListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useViewTransitionNavigate();
  const location = useLocation();
  const notify = useNotify();
  const realms = useRealms();
  const [races, setRaces] = useState<Race[]>();
  const [truncated, setTruncated] = useState(false);
  const [error, setError] = useState<unknown>();
  const [reloads, setReloads] = useState(0);
  const filters = useListFilters(raceFilters(t, realms));

  useEffect(() => {
    let cancelled = false;
    setRaces(undefined);
    fetchRaces(filters.rsql, 0, RACE_LIST_MAX, auth)
      .then((page) => {
        if (cancelled) return;
        setRaces(page.content);
        setTruncated(page.pagination.totalElements > page.content.length);
        setError(undefined);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err);
        notify.error(err);
      });
    return () => {
      cancelled = true;
    };
  }, [filters.rsql, reloads]);

  const visible = useMemo(
    () =>
      races
        ?.filter(filters.match)
        .map((race) => ({ race, name: raceName(race, t) }))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(({ race }) => race),
    [races, filters.match, t]
  );
  const query = useLocalPagedQuery(visible, {
    pageSize: 48,
    resetKey: filters.key,
    error,
    refresh: () => setReloads((count) => count + 1),
  });

  // The known archetypes, the ones of the loaded races and the selected ones, by their text.
  const archetypes = useMemo(
    () =>
      [
        ...new Set([
          ...RACE_ARCHETYPES,
          ...(races ?? []).map((race) => race.archetype).filter((key): key is string => !!key),
          ...filters.getAll('archetype'),
        ]),
      ].sort((a, b) => archetypeLabel(a, t).localeCompare(archetypeLabel(b, t))),
    [races, filters, t]
  );

  return (
    <ListPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('races') }]}
      query={query}
      getKey={(race) => race.id}
      filtersLayout="side"
      filterState={filters}
      filtersStorageKey="core.races"
      filters={<RaceListFilters filters={filters} realms={realms} archetypes={archetypes} />}
      collection={{ modes: ['cards'], storageKey: 'core.races' }}
      renderItem={(race) => (
        <EntityCard
          title={raceName(race, t)}
          subtitle={race.archetype ? archetypeLabel(race.archetype, t) : undefined}
          image={race.imageUrl}
          imageTransitionName={viewTransitionName('race', race.id)}
          metrics={[
            { label: t('size'), value: t(`size-${race.sizeId}`) },
            { label: t('hit-points'), value: race.baseHits },
            { label: t('race-bonus-dev-points'), value: race.baseDevPoints },
          ]}
          locked={race.accessType === 'private'}
          lockedLabel={t('private')}
          onClick={() => navigate(`/core/races/view/${race.id}`, { state: { race, from: location.search } })}
        />
      )}
    >
      {truncated && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          {t('race-list-limit', { max: RACE_LIST_MAX })}
        </Alert>
      )}
    </ListPage>
  );
}
