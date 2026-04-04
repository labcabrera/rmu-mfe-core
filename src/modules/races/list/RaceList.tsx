/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Pagination } from '@mui/material';
import { RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { fetchPagedRaces } from '../../api/race';
import { Race } from '../../api/race.dto';
import { fetchRealms } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import { gridSizeResume, gridSizeMain, gridSizeCard } from '../../services/display';
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
        setRaces(response.content);
        setTotalPages(response.pagination.totalPages || 1);
      })
      .catch((err) => showError(err.message));
  };

  const bindRealms = () => {
    fetchRealms('', 0, 100)
      .then((response) => setRealms(response.content))
      .catch((err) => showError(err.message));
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
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <RaceListSearch setQueryString={setQueryString} realms={realms} />
            </Grid>
            {races.map((race) => (
              <Grid size={gridSizeCard} key={race.id}>
                <RmuTextCard
                  value={race.name}
                  subtitle={race.realm.name}
                  image={race.imageUrl || ''}
                  onClick={() => navigate(`/core/races/view/${race.id}`, { state: { race } })}
                />
              </Grid>
            ))}
          </Grid>
          {races.length === 0 && <Grid size={12}>No races found.</Grid>}
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} color="primary" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default RaceList;
