import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Pagination } from '@mui/material';
import { RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchPagedProfessions } from '../../api/profession';
import { Profession } from '../../api/profession.dto';
import { gridSizeResume, gridSizeMain, gridSizeCard } from '../../services/display';
import ProfessionListActions from './ProfessionListActions';
import ProfessionListSearch from './ProfessionListSearch';

const PAGE_SIZE = 24;

const ProfessionList: FC = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [queryString, setQueryString] = useState('');
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const bindProfessions = () => {
    fetchPagedProfessions(queryString, page, PAGE_SIZE)
      .then((response) => {
        setProfessions(response.content);
        setTotalPages(response.pagination.totalPages || 1);
      })
      .catch((err: Error) => showError(err.message));
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  useEffect(() => {
    bindProfessions();
  }, [queryString, page]);

  useEffect(() => {
    bindProfessions();
  }, []);

  if (!professions) return <p>Loading...</p>;

  return (
    <>
      <ProfessionListActions onRefresh={bindProfessions} />
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <ProfessionListSearch setQueryString={setQueryString} />
            </Grid>
            {professions.map((profession) => (
              <Grid size={gridSizeCard} key={profession.id}>
                <RmuTextCard
                  value={t(profession.id)}
                  subtitle={t('Profession')}
                  image={profession.imageUrl || ''}
                  onClick={() => navigate(`/core/professions/view/${profession.id}`, { state: { profession } })}
                />
              </Grid>
            ))}
          </Grid>
          <Grid size={12}>{professions.length === 0 && <p>No professions found.</p>}</Grid>
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} color="primary" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfessionList;
