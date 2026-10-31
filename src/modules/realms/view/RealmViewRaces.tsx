import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Typography } from '@mui/material';
import {
  EntityCard,
  fetchRaces,
  CardGrid,
  Race,
  Realm,
  useNotify,
  useViewTransitionNavigate,
  viewTransitionName,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { archetypeLabel, raceName } from '../../races/race-format';

const RealmViewRaces: FC<{
  realm: Realm;
}> = ({ realm }) => {
  const navigate = useViewTransitionNavigate();
  const { t } = useTranslation();
  const auth = useAuth();
  const notify = useNotify();
  const [races, setRaces] = useState<Race[]>([]);

  useEffect(() => {
    if (realm) {
      fetchRaces(`realmId==${realm.id}`, 0, 100, auth)
        .then((response) => setRaces(response.content))
        .catch((err) => notify.error(err));
    }
  }, [realm, auth, notify]);

  if (races.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        {t('no-results')}
      </Typography>
    );
  }

  return (
    <CardGrid
      items={races}
      getKey={(race) => race.id}
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
          onClick={() => navigate(`/core/races/view/${race.id}`, { state: { race } })}
        />
      )}
    />
  );
};

export default RealmViewRaces;
