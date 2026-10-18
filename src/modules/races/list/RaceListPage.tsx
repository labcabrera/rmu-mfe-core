import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  fetchRaces,
  ListPage,
  Race,
  RmuTextCard,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import NameRealmFilters from '../../shared/filters/NameRealmFilters';

/** Races are created from their realm's page (they need a realmId), so this list has no add button. */
export default function RaceListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
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
      renderItem={(race) => (
        <RmuTextCard
          value={race.name}
          subtitle={t(race.archetype || '-')}
          image={race.imageUrl || ''}
          lock={race.accessType === 'private'}
          onClick={() => navigate(`/core/races/view/${race.id}`, { state: { race } })}
        />
      )}
    />
  );
}
