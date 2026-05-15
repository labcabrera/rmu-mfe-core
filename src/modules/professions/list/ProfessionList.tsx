/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import {
  RmuPagination,
  RmuTextCard,
  Profession,
  fetchProfessions,
  LayoutBase,
  RefreshButton,
  AddButton,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { gridSizeCard } from '../../services/display';
import ProfessionListSearch from './ProfessionListSearch';

const ProfessionList: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useAuth();
  const { showError } = useError();
  const [queryString, setQueryString] = useState('');
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(24);
  const [totalPages, setTotalPages] = useState(1);

  const bindProfessions = () => {
    fetchProfessions(queryString, page, pageSize, auth)
      .then((response) => {
        setProfessions(response.content);
        setTotalPages(response.pagination.totalPages || 1);
      })
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    bindProfessions();
  }, [queryString, page]);

  useEffect(() => {
    bindProfessions();
  }, []);

  if (!professions) return <p>Loading...</p>;

  return (
    <LayoutBase
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('professions') }]}
      actions={[
        <RefreshButton onClick={bindProfessions} />,
        <AddButton onClick={() => navigate('/core/professions/create')} />,
      ]}
    >
      <ProfessionListSearch setQueryString={setQueryString} />
      <Grid container spacing={1} sx={{ mt: 1 }}>
        {professions.map((profession) => (
          <Grid size={gridSizeCard} key={profession.id}>
            <RmuTextCard
              value={t(profession.id)}
              subtitle={t('Profession')}
              image={profession.imageUrl || ''}
              grayscale={0.8}
              lock={profession.accessType === 'private'}
              onClick={() => navigate(`/core/professions/view/${profession.id}`, { state: { profession } })}
            />
          </Grid>
        ))}
      </Grid>
      {professions.length === 0 && <p>No professions found.</p>}
      <RmuPagination
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </LayoutBase>
  );
};

export default ProfessionList;
