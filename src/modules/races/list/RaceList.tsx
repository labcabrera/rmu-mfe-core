import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Link } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchRaces } from '../../api/race';
import { Race } from '../../api/race.dto';
import { resolveRaceImage } from '../../services/race-avatar-service';
import RaceCard from '../../shared/cards/RaceCard';
import RmuTextCard from '../../shared/cards/RmuTextCard';
import RaceListActions from './RaceListActions';

const RaceList: FC = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [races, setRaces] = useState<Race[]>([]);

  const bindRaces = () => {
    fetchRaces('', 0, 20)
      .then((response) => setRaces(response))
      .catch((err: Error) => showError('err' + err.message));
  };

  const handleNewRace = () => {
    navigate('/core/races/create');
  };

  useEffect(() => {
    bindRaces();
  }, [showError]);

  return (
    <>
      <RaceListActions />
      <Grid container spacing={1}>
        {races.map((race) => (
          <Grid size={12} key={race.id}>
            <RmuTextCard
              value={race.name}
              subtitle={t(race.archetype || '')}
              image={resolveRaceImage(race.name)}
              onClick={() => navigate(`/core/races/view/${race.id}`, { state: { race } })}
            />
          </Grid>
        ))}
      </Grid>
      {races.length === 0 ? (
        <p>
          No races found.{' '}
          <Link component="button" onClick={handleNewRace}>
            {t('create-new')}
          </Link>
        </p>
      ) : null}
    </>
  );
};

export default RaceList;
