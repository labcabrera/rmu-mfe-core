import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchRace } from '../../api/race';
import { Race } from '../../api/race.dto';
import RaceAvatarByName from '../../shared/avatars/RaceAvatarByName';
import RaceViewActions from './RaceViewActions';
import RaceViewAttributes from './RaceViewAttributes';
import RaceViewResistances from './RaceViewResistances';
import RaceViewStats from './RaceViewStats';

const RaceView: FC = () => {
  const location = useLocation();
  const { raceId: raceId } = useParams<{ raceId?: string }>();
  const { showError } = useError();
  const [race, setRace] = useState<Race | null>(null);

  useEffect(() => {
    if (location.state && location.state.race) {
      setRace(location.state.race);
    } else if (raceId) {
      fetchRace(raceId)
        .then((response) => setRace(response))
        .catch((err) => showError(err.message));
    }
  }, [location.state, raceId, showError]);

  if (!race) return <p>Loading race...</p>;

  return (
    <>
      <RaceViewActions race={race} setRace={setRace} />
      <Grid container spacing={2}>
        <Grid size={2}>
          <RaceAvatarByName raceName={race.name} size={300} />
          <Typography variant="h6" color="primary">
            {t(race.name)}
          </Typography>
          {race.archetype && <Typography variant="h6">{t(race.archetype)}</Typography>}
          <Typography variant="body1" color="textSecondary" sx={{ mt: 2, whiteSpace: 'pre-line' }}>
            {race.description}
          </Typography>
        </Grid>
        <Grid size={10}>
          <Typography variant="h6" color="primary">
            {t('statistics')}
          </Typography>
          <RaceViewStats race={race} />
          <Typography variant="h6" color="primary">
            {t('resistances')}
          </Typography>
          <RaceViewResistances race={race} />
          <Typography variant="h6" color="primary">
            {t('race-features')}
          </Typography>
          <RaceViewAttributes race={race} />
        </Grid>
      </Grid>
    </>
  );
};

export default RaceView;
