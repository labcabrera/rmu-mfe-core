/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { RmuPagination, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchSkills } from '../../api/skill';
import { fetchSkillCategories } from '../../api/skill-category';
import { SkillCategory } from '../../api/skill-category.dto';
import { Skill } from '../../api/skill.dto';
import { imageBaseUrl } from '../../services/config';
import { gridSizeResume, gridSizeMain, gridSizeCard } from '../../services/display';
import SkillListActions from './SkillListActions';
import SkillListSearch from './SkillListSearch';

const SkillList: FC = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(24);
  const [totalPages, setTotalPages] = useState(1);
  const [queryString, setQueryString] = useState<string>('');

  const bindSkills = (queryString: string, pageNumber: number = 0) => {
    fetchSkills(queryString, pageNumber, pageSize)
      .then((response) => {
        setSkills(response.content);
        setTotalPages(response.pagination.totalPages || 1);
      })
      .catch((err) => showError(err.message));
  };

  const bindSkillCategories = () => {
    fetchSkillCategories()
      .then((data) => setSkillCategories(data))
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
    <>
      <SkillListActions />
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <SkillListSearch setQueryString={setQueryString} categories={skillCategories} />
            </Grid>
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

export default SkillList;
