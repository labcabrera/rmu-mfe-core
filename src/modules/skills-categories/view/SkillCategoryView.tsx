/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { fetchSkillCategory, fetchSkills, Skill, SkillCategory } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import SkillCategoryViewActions from './SkillCategoryViewActions';
import SkillCategoryViewInfo from './SkillCategoryViewInfo';
import SkillCategoryViewSkills from './SkillCategoryViewSkills';
import { useAuth } from 'react-oidc-context';

const SkillCategoryView: FC = () => {
  const location = useLocation();
  const auth = useAuth();
  const { skillCategoryId } = useParams<{ skillCategoryId?: string }>();
  const { showError } = useError();
  const [skillCategory, setSkillCategory] = useState<SkillCategory | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);

  const bindSkillCategory = () => {
    fetchSkillCategory(skillCategoryId!, auth)
      .then((response) => setSkillCategory(response))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    if (location.state && location.state.skillCategory) {
      setSkillCategory(location.state.skillCategory);
    } else if (skillCategoryId) {
      bindSkillCategory();
    }
  }, [location.state, skillCategoryId, showError]);

  useEffect(() => {
    if (skillCategory) {
      fetchSkills(`categoryId==${skillCategory.id}`, 0, 100, auth)
        .then((response) => setSkills(response.content))
        .catch((err: unknown) => {
          if (err instanceof Error) showError(err.message);
          else showError(String(err));
        });
    }
  }, [skillCategory]);

  if (!skillCategory) return <p>Loading...</p>;

  return (
    <Grid container spacing={2}>
      <Grid size={gridSizeResume}></Grid>
      <Grid size={gridSizeMain}>
        <SkillCategoryViewActions skillCategory={skillCategory} onRefresh={bindSkillCategory} />
        <SkillCategoryViewInfo skillCategory={skillCategory} />
        <SkillCategoryViewSkills skills={skills} />
      </Grid>
    </Grid>
  );
};

export default SkillCategoryView;
