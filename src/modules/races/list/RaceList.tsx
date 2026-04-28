/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { RmuPagination, RmuTextCard, Race, Realm, fetchRaces, fetchRealms } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { gridSizeResume, gridSizeMain, gridSizeCard } from '../../services/display';
import RaceListActions from './RaceListActions';
import RaceListSearch from './RaceListSearch';
import { useAuth } from 'react-oidc-context';
import { useTranslation } from 'react-i18next';

const RaceList: FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { t} = useTranslation();
  const { showError } = useError();
  const [queryString, setQueryString] = useState('');
  const [realms, setRealms] = useState<Realm[]>([]);
  const [races, setRaces] = useState<Race[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(24);
  const [totalPages, setTotalPages] = useState(1);

  const bindRaces = () => {
    fetchRaces(queryString, page, pageSize, auth)
      .then((response) => {
        setRaces(response.content);
        setTotalPages(response.pagination.totalPages || 1);
      })
      .catch((err) => showError(err.message));
  };

  const bindRealms = () => {
    fetchRealms('', 0, 100, auth)
      .then((response) => setRealms(response.content))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    bindRaces();
  }, [queryString, page, pageSize]);

  useEffect(() => {
    bindRealms();
  }, []);

  if (!races) return <p>Loading...</p>;

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <RaceListActions onRefresh={bindRaces} />
          <Grid container spacing={1}>
            <Grid size={12}>
              <RaceListSearch setQueryString={setQueryString} realms={realms} />
            </Grid>
            {races.map((race) => (
              <Grid size={gridSizeCard} key={race.id}>
                <RmuTextCard
                  value={race.name}
                  subtitle={t(race.archetype || "-")}
                  image={race.imageUrl || ''}
                  onClick={() => navigate(`/core/races/view/${race.id}`, { state: { race } })}
                />
              </Grid>
            ))}
            {races.length === 0 && <Grid size={12}>No races found.</Grid>}
          </Grid>
          <Grid size={12}>
            <RmuPagination
              page={page}
              pageSize={pageSize}
              totalPages={totalPages}
              setPage={setPage}
              setPageSize={setPageSize}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RaceList;
