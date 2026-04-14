import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { fetchRaces, Race, Realm, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { gridSizeCard } from '../../services/display';

const RealmViewRaces: FC<{
  realm: Realm;
}> = ({ realm }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [races, setRaces] = useState<Race[]>([]);

  useEffect(() => {
    if (realm) {
      fetchRaces(`realm.id==${realm.id}`, 0, 100)
        .then((response) => setRaces(response.content))
        .catch((err) => showError(err.message));
    }
  }, [realm, showError]);

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
          No races added
        </Typography>
      )}
    </Grid>
  );
};

export default RealmViewRaces;
