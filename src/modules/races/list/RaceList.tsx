import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Grid } from '@mui/material';
import {
  RmuPagination,
  RmuTextCard,
  Race,
  Realm,
  fetchRaces,
  fetchRealms,
  LayoutBase,
  RefreshButton,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { gridSizeCard } from '../../services/display';
import RaceListSearch from './RaceListSearch';

const RaceList: FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const [queryString, setQueryString] = useState('');
  const [realms, setRealms] = useState<Realm[]>([]);
  const [races, setRaces] = useState<Race[]>();
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

  return (
    <LayoutBase
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('races') }]}
      actions={<RefreshButton onClick={() => bindRaces()} />}
    >
      <RaceListSearch setQueryString={setQueryString} realms={realms} />
      {!races ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            {races.map((race) => (
              <Grid size={gridSizeCard} key={race.id}>
                <RmuTextCard
                  value={race.name}
                  subtitle={t(race.archetype || '-')}
                  image={race.imageUrl || ''}
                  lock={race.accessType === 'private'}
                  onClick={() => navigate(`/core/races/view/${race.id}`, { state: { race } })}
                />
              </Grid>
            ))}
          </Grid>
          <RmuPagination
            page={page}
            pageSize={pageSize}
            totalPages={totalPages}
            setPage={setPage}
            setPageSize={setPageSize}
          />
        </>
      )}
    </LayoutBase>
  );
};

export default RaceList;
