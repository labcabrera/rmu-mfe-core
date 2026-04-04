/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { RmuPagination, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchPagedProfessions } from '../../api/profession';
import { Profession } from '../../api/profession.dto';
import { gridSizeResume, gridSizeMain, gridSizeCard } from '../../services/display';
import ProfessionListActions from './ProfessionListActions';
import ProfessionListSearch from './ProfessionListSearch';

const ProfessionList: FC = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [queryString, setQueryString] = useState('');
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(24);
  const [totalPages, setTotalPages] = useState(1);

  const bindProfessions = () => {
    fetchPagedProfessions(queryString, page, pageSize)
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
    <>
      <ProfessionListActions onRefresh={bindProfessions} />
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <ProfessionListSearch setQueryString={setQueryString} />
            </Grid>
            <Grid size={12}>
              <Grid container spacing={1}>
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
                {professions.length === 0 && <p>No professions found.</p>}
              </Grid>
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
      </Grid>
    </>
  );
};

export default ProfessionList;
