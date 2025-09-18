import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { Grid, TextField, Typography } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchRace } from '../../api/race';
import { Race } from '../../api/race.dto';
import RaceAvatarByName from '../../shared/avatars/RaceAvatar';
import RaceViewActions from './RaceViewActions';
import RaceViewAttributes from './RaceViewAttributes';
import RaceViewResistances from './RaceViewResistances';
import RaceViewStats from './RaceViewStats';

const RaceView: FC = () => {
  const location = useLocation();
  const { raceId: raceId } = useParams<{ raceId?: string }>();
  const { t } = useTranslation();
  const { showError } = useError();
  const [race, setRace] = useState<Race | null>(null);

  const bindRace = async (raceId?: string) => {
    if (!raceId) return;
    fetchRace(raceId)
      .then((response) => {
        setRace(response);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError(String(err));
      });
  };

  useEffect(() => {
    if (location.state && location.state.race) {
      setRace(location.state.race);
    } else {
      bindRace(raceId);
    }
  }, [location.state, raceId]);

  if (!race) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <RaceViewActions race={race} />
      <Grid container spacing={2}>
        <Grid size={5}>
          <RaceAvatarByName raceName={race.name} size={120} />
          <Typography variant="h6" color="primary">
            {t('create-race')}
          </Typography>
          <RaceViewAttributes race={race} />
        </Grid>
        <Grid size={2}>
          <Typography variant="h6" color="primary">
            {t('statistics')}
          </Typography>
          <RaceViewStats race={race} />
        </Grid>
        <Grid size={2}>
          <Typography variant="h6" color="primary">
            {t('resistances')}
          </Typography>
          <RaceViewResistances race={race} />
        </Grid>
        <Grid size={4}>
          <TextField label={t('description')} variant="standard" name="description" value={race.description} fullWidth />
        </Grid>
      </Grid>
    </>
  );
};

export default RaceView;
