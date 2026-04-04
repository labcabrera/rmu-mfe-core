/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { RmuPagination, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchPagedSkillCategories } from '../../api/skill-category';
import { SkillCategory } from '../../api/skill-category.dto';
import { imageBaseUrl } from '../../services/config';
import { gridSizeResume, gridSizeMain, gridSizeCard } from '../../services/display';
import SkillCategoryListActions from './SkillCategoryListActions';
import SkillCategoryListSearch from './SkillCategoryListSearch';

const SkillCategoryList: FC = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(48);
  const [totalPages, setTotalPages] = useState(1);
  const [queryString, setQueryString] = useState<string>('');

  const bindSkillCategories = () => {
    fetchPagedSkillCategories(queryString, page, pageSize)
      .then((response) => {
        setSkillCategories(response.content);
        setTotalPages(response.pagination.totalPages || 1);
      })
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    bindSkillCategories();
  }, [queryString, page, pageSize]);

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
            {skillCategories.length === 0 ? <p>No skill categories found.</p> : null}
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

export default SkillCategoryList;
