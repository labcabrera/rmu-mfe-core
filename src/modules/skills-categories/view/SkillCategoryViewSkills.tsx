import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { Skill } from '../../api/skill.dto';
import RmuTextCard from '../../shared/cards/RmuTextCard';

const SkillCategoryViewSkills: FC<{
  skills: Skill[];
}> = ({ skills }) => {
  const navigate = useNavigate();

  const handleSkillClick = async (skill: Skill) => {
    navigate(`/core/skills/view/${skill.id}`, { state: { skill } });
  };

  return (
    <>
      <Grid container spacing={1} mt={5}>
        <Grid size={12}>
          <Typography variant="h6" gutterBottom>
            {t('skills')}
          </Typography>
        </Grid>
        <Grid size={12}>
          <Grid container spacing={1}>
            {skills.map((skill) => (
              <Grid size={{ xs: 12, md: 3 }} key={skill.id}>
                <RmuTextCard value={t(skill.id)} subtitle={t('skill')} onClick={() => handleSkillClick(skill)} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      {skills.length === 0 ? <p>No skills found.</p> : null}
    </>
  );
};

export default SkillCategoryViewSkills;
