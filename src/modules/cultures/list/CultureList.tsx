/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import {
  RmuPagination,
  RmuTextCard,
  Realm,
  fetchRealms,
  Culture,
  fetchCultures,
  LayoutBase,
  AddButton,
  RefreshButton,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { gridSizeCard } from '../../services/display';
import CultureListSearch from './CultureListSearch';

export default function CultureList() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useAuth();
  const { showError } = useError();
  const [queryString, setQueryString] = useState('');
  const [realms, setRealms] = useState<Realm[]>([]);
  const [cultures, setCultures] = useState<Culture[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(24);
  const [totalPages, setTotalPages] = useState(1);

  const bindCultures = () => {
    fetchCultures(queryString, page, pageSize, auth)
      .then((response) => {
        setCultures(response.content);
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
    bindCultures();
  }, [queryString, page, pageSize]);

  useEffect(() => {
    bindRealms();
  }, []);

  if (!cultures) return <p>Loading...</p>;

  return (
    <LayoutBase
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('cultures') }]}
      actions={[
        <RefreshButton onClick={() => bindCultures()} />,
        <AddButton onClick={() => navigate('/core/cultures/create')} />,
      ]}
    >
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
      <RmuPagination
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </LayoutBase>
  );
}
