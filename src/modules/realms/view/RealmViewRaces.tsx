import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { fetchRaces, gridSizeCard, Race, Realm, RmuTextCard, useNotify } from '@labcabrera-rmu/rmu-react-shared-lib';

const RealmViewRaces: FC<{
  realm: Realm;
}> = ({ realm }) => {
  const navigate = useNavigate();
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

  return (
    <Grid container spacing={1}>
      {races.map((race) => (
        <Grid size={gridSizeCard} key={race.id}>
          <RmuTextCard
            key={race.id}
            image={race.imageUrl || ''}
            value={race.name}
            subtitle={t(race.archetype || '')}
            onClick={() => navigate(`/core/races/view/${race.id}`, { state: { race: race } })}
          />
        </Grid>
      ))}
      {races.length === 0 && (
        <Typography variant="body1" color="textSecondary">
          {t('no-results')}
        </Typography>
      )}
    </Grid>
  );
};

export default RealmViewRaces;
