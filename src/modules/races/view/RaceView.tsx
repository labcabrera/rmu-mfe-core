import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { Race, fetchRace } from '../../api/race';
import RaceViewActions from './RaceViewActions';
import RaceViewInfo from './RaceViewInfo';

const RaceView: FC = () => {
  const location = useLocation();
  const { gameId: raceId } = useParams<{ gameId?: string }>();
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={4}>
            <Typography variant="h6" color="primary">
              {t('game-info')}
            </Typography>
            <RaceViewInfo race={race} />
          </Grid>
          <Grid size={4}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RaceView;
