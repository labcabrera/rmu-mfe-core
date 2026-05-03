/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import {
  LayoutBase,
  RmuPagination,
  RmuTextCard,
  SkillCategory,
  fetchSkillCategories,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { imageBaseUrl } from '../../services/config';
import { gridSizeResume, gridSizeMain, gridSizeCard } from '../../services/display';
import SkillCategoryListActions from './SkillCategoryListActions';
import SkillCategoryListSearch from './SkillCategoryListSearch';

const SkillCategoryList: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useAuth();
  const { showError } = useError();
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(48);
  const [totalPages, setTotalPages] = useState(1);
  const [queryString, setQueryString] = useState<string>('');

  const bindSkillCategories = () => {
    fetchSkillCategories(queryString, page, pageSize, auth)
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
      <LayoutBase
        breadcrumbs={[
          { name: t('home'), link: '/' },
          { name: t('core'), link: '/core' },
          { name: t('skill-categories') },
        ]}
      >
        <SkillCategoryListSearch setQueryString={setQueryString} />
        <Grid container spacing={1} sx={{ mt: 1 }}>
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
        <RmuPagination
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      </LayoutBase>
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <SkillCategoryListActions onRefresh={() => bindSkillCategories()} />

          <Grid size={12}></Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SkillCategoryList;
