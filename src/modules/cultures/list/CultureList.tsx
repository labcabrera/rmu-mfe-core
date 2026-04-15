/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import {
  RmuPagination,
  RmuTextCard,
  Realm,
  fetchRealms,
  Culture,
  fetchCultures,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { gridSizeResume, gridSizeMain, gridSizeCard } from '../../services/display';
import CultureListActions from './CultureListActions';
import CultureListSearch from './CultureListSearch';

const CultureList: FC = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [queryString, setQueryString] = useState('');
  const [realms, setRealms] = useState<Realm[]>([]);
  const [cultures, setCultures] = useState<Culture[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(24);
  const [totalPages, setTotalPages] = useState(1);

  const bindCultures = () => {
    fetchCultures(queryString, page, pageSize)
      .then((response) => {
        setCultures(response.content);
        setTotalPages(response.pagination.totalPages || 1);
      })
      .catch((err) => showError(err.message));
  };

  const bindRealms = () => {
    fetchRealms('', 0, 100)
      .then((response) => setRealms(response.content))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    bindCultures();
  }, [queryString, page, pageSize]);

  useEffect(() => {
    bindRealms();
  }, []);

  if (!cultures) return <p>Loading...</p>;

  return (
    <Grid container spacing={1}>
      <Grid size={gridSizeResume}></Grid>
      <Grid size={gridSizeMain}>
        <CultureListActions onRefresh={bindCultures} />
        <Grid container spacing={1}>
          <Grid size={12}>
            <CultureListSearch setQueryString={setQueryString} realms={realms} />
          </Grid>
          {cultures.map((culture) => (
            <Grid size={gridSizeCard} key={culture.id}>
              <RmuTextCard
                value={culture.name}
                subtitle={t('Culture')}
                image={culture.imageUrl || ''}
                onClick={() => navigate(`/core/cultures/view/${culture.id}`, { state: { race: culture } })}
              />
            </Grid>
          ))}
          {cultures.length === 0 && <Grid size={12}>No cultures found.</Grid>}
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
  );
};

export default CultureList;
