import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Pagination } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchPagedRaces } from '../../api/race';
import { Race } from '../../api/race.dto';
import { fetchRealms } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
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
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const bindRaces = () => {
    fetchPagedRaces(queryString, page, PAGE_SIZE)
      .then((response) => {
        console.log(response);
        setRaces(response.content);
        setTotalPages(response.pagination.totalPages || 1);
      })
      .catch((err: Error) => showError(err.message));
  };

  const bindRealms = () => {
    fetchRealms('', 0, 100)
      .then((response) => setRealms(response))
      .catch((err: Error) => showError(err.message));
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  useEffect(() => {
    bindRaces();
  }, [queryString, page]);

  useEffect(() => {
    bindRealms();
  }, []);

  if (!races) return <p>Loading...</p>;

  return (
    <>
      <RaceListActions onRefresh={bindRealms} />
      <Grid container spacing={1}>
        <Grid size={12}>
          <RaceListSearch setQueryString={setQueryString} realms={realms} />
        </Grid>
        {races.map((race) => (
          <Grid size={{ xs: 12, md: 3 }} key={race.id}>
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
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} color="primary" />
      </Box>
    </>
  );
};

export default RaceList;
