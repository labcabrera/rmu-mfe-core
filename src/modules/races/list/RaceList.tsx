import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchRaces } from '../../api/race';
import { Race } from '../../api/race.dto';
import { fetchRealms } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import { resolveRaceImage } from '../../services/race-avatar-service';
import RmuTextCard from '../../shared/cards/RmuTextCard';
import RaceListActions from './RaceListActions';
import RaceListSearch from './RaceListSearch';

const PAGE_SIZE = 24;

const RaceList: FC = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [queryString, setQueryString] = useState('');
  const [realms, setRealms] = useState<Realm[]>([]);
  const [races, setRaces] = useState<Race[]>([]);

  const bindRaces = () => {
    fetchRaces(queryString, 0, PAGE_SIZE)
      .then((response) => setRaces(response))
      .catch((err: Error) => showError('err' + err.message));
  };

  const bindRealms = () => {
    fetchRealms('', 0, 100)
      .then((response) => setRealms(response))
      .catch((err: Error) => showError('err' + err.message));
  };

  useEffect(() => {
    bindRaces();
  }, [queryString]);

  useEffect(() => {
    bindRealms();
  }, []);

  return (
    <>
      <RaceListActions onRefresh={bindRealms} />
      <Grid container spacing={1}>
        <Grid size={12}>
          <RaceListSearch setQueryString={setQueryString} realms={realms} />
        </Grid>
        {races.map((race) => (
          <Grid size={{ xs: 12, md: 4 }} key={race.id}>
            <RmuTextCard
              value={race.name}
              subtitle={t(race.archetype || '')}
              image={race.imageUrl || ''}
              onClick={() => navigate(`/core/races/view/${race.id}`, { state: { race } })}
            />
          </Grid>
        ))}
      </Grid>
      <Grid size={12}>{races.length === 0 && <p>No races found.</p>}</Grid>
    </>
  );
};

export default RaceList;
