import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchSkills } from '../../api/skill';
import { fetchSkillCategory } from '../../api/skill-category';
import { Skill } from '../../api/skill.dto';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import SkillCategoryViewActions from './SkillCategoryViewActions';
import SkillCategoryViewInfo from './SkillCategoryViewInfo';
import SkillCategoryViewSkills from './SkillCategoryViewSkills';

const SkillCategoryView: FC = () => {
  const location = useLocation();
  const { skillCategoryId } = useParams<{ skillCategoryId?: string }>();
  const { showError } = useError();
  const [skillCategory, setSkillCategory] = useState<Skill | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);

  const bindSkillCategory = () => {
    fetchSkillCategory(skillCategoryId!)
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
      fetchSkills(`categoryId==${skillCategory.id}`, 0, 100)
        .then((response) => setSkills(response.content))
        .catch((err: unknown) => {
          if (err instanceof Error) showError(err.message);
          else showError(String(err));
        });
    }
  }, [skillCategory]);

  if (!skillCategory) return <p>Loading...</p>;

  return (
    <>
      <SkillCategoryViewActions skill={skillCategory} onRefresh={bindSkillCategory} />
      <Grid container spacing={2}>
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <SkillCategoryViewInfo skillCategory={skillCategory} />
          <SkillCategoryViewSkills skills={skills} />
        </Grid>
      </Grid>
    </>
  );
};

export default SkillCategoryView;
