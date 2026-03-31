import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Box, Grid } from '@mui/material';
import { RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchPagedSkillCategories } from '../../api/skill-category';
import { SkillCategory } from '../../api/skill-category.dto';
import { imageBaseUrl } from '../../services/config';
import { gridSizeResume, gridSizeMain, gridSizeCard } from '../../services/display';
import SkillCategoryListActions from './SkillCategoryListActions';
import SkillCategoryListSearch from './SkillCategoryListSearch';

const PAGE_SIZE = 24;

const SkillCategoryList: FC = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [queryString, setQueryString] = useState<string>('');

  const bindSkillCategories = () => {
    fetchPagedSkillCategories(queryString, page, PAGE_SIZE)
      .then((response) => {
        setSkillCategories(response.content);
        setTotalPages(response.pagination.totalPages || 1);
      })
      .catch((err: Error) => showError(err.message));
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  useEffect(() => {
    bindSkillCategories();
  }, [queryString, page]);

  if (!skillCategories) return <p>Loading...</p>;

  return (
    <>
      <SkillCategoryListActions onRefresh={() => bindSkillCategories()} />
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <SkillCategoryListSearch setQueryString={setQueryString} />
            </Grid>
            {skillCategories.map((category) => (
              <Grid size={gridSizeCard} key={category.id}>
                <RmuTextCard
                  value={t(category.id)}
                  subtitle={t('Skill category')}
                  image={`${imageBaseUrl}images/generic/configuration.png`}
                  onClick={() => navigate(`/core/skill-categories/view/${category.id}`, { state: { category } })}
                />
              </Grid>
            ))}
          </Grid>
          {skillCategories.length === 0 ? <p>No skill categories found.</p> : null}
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} color="primary" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SkillCategoryList;
