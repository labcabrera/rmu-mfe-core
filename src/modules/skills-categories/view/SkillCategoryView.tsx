import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchPagedSkills } from '../../api/skill';
import { fetchSkillCategory } from '../../api/skill-category';
import { Skill } from '../../api/skill.dto';
import { imageBaseUrl } from '../../services/config';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import SkillCategoryViewActions from './SkillCategoryViewActions';
import SkillCategoryViewInfo from './SkillCategoryViewInfo';
import SkillCategoryViewSkills from './SkillCategoryViewSkills';

const SkillCategoryView: FC = () => {
  const location = useLocation();
  const { skillCategoryId } = useParams<{ skillCategoryId?: string }>();
  const { showError } = useError();
  const [skillCategory, setSkillCategory] = useState<Skill | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    if (location.state && location.state.skillCategory) {
      setSkillCategory(location.state.skillCategory);
    } else if (skillCategoryId) {
      fetchSkillCategory(skillCategoryId)
        .then((response) => setSkillCategory(response))
        .catch((err: unknown) => {
          if (err instanceof Error) showError(err.message);
          else showError(String(err));
        });
    }
  }, [location.state, skillCategoryId, showError]);

  useEffect(() => {
    if (skillCategory) {
      fetchPagedSkills(`categoryId==${skillCategory.id}`, 0, 100)
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
      <SkillCategoryViewActions skill={skillCategory} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 2 }}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/configuration.png`} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <SkillCategoryViewInfo skillCategory={skillCategory} />
          <SkillCategoryViewSkills skills={skills} />
        </Grid>
      </Grid>
    </>
  );
};

export default SkillCategoryView;
