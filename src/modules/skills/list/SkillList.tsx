/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import {
  AddButton,
  fetchSkillCategories,
  fetchSkills,
  LayoutBase,
  RefreshButton,
  RmuPagination,
  RmuTextCard,
  Skill,
  SkillCategory,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { imageBaseUrl } from '../../services/config';
import { gridSizeCard } from '../../services/display';
import SkillListSearch from './SkillListSearch';

const SkillList: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useAuth();
  const { showError } = useError();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(24);
  const [totalPages, setTotalPages] = useState(1);
  const [queryString, setQueryString] = useState<string>('');

  const bindSkills = (queryString: string, pageNumber: number = 0) => {
    fetchSkills(queryString, pageNumber, pageSize, auth)
      .then((response) => {
        setSkills(response.content);
        setTotalPages(response.pagination.totalPages || 1);
      })
      .catch((err) => showError(err.message));
  };

  const bindSkillCategories = () => {
    fetchSkillCategories('', 0, 100, auth)
      .then((data) => setSkillCategories(data.content))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    setPage(0);
  }, [pageSize]);

  useEffect(() => {
    bindSkills(queryString, page);
    bindSkillCategories();
  }, [queryString, page, pageSize]);

  if (!skills) return <p>Loading...</p>;

  return (
    <LayoutBase
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('skills') }]}
      actions={[
        <RefreshButton onClick={() => bindSkills(queryString)} />,
        <AddButton onClick={() => navigate('/core/skills/create')} />,
      ]}
    >
      <SkillListSearch setQueryString={setQueryString} categories={skillCategories} />

      <Grid container spacing={1}>
        <Grid size={12}></Grid>
        {skills.map((skill) => (
          <Grid size={gridSizeCard} key={skill.id}>
            <RmuTextCard
              value={`${t(skill.id)}${skill.specialization ? ' *' : ''}`}
              subtitle={t(skill.categoryId)}
              image={`${imageBaseUrl}images/generic/configuration.png`}
              onClick={() => navigate(`/core/skills/view/${skill.id}`, { state: { skill } })}
            />
          </Grid>
        ))}
        {skills.length === 0 ? <p>No skills found.</p> : null}
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
};

export default SkillList;
