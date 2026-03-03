import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { Skill } from '../../api/skill.dto';

const SkillViewResume: FC<{
  skill: Skill;
}> = ({ skill }) => {
  if (!skill) return <p>Loading...</p>;

  return (
    <Grid container spacing={1} mt={3}>
      <Grid size={12}>
        <Typography variant="body1" gutterBottom>
          {t(skill.categoryId)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SkillViewResume;
