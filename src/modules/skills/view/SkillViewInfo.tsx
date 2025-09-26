import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { Skill } from '../../api/skill.dto';

const SkillViewInfo: FC<{
  skill: Skill;
}> = ({ skill }) => {
  if (!skill) return <p>Loading...</p>;

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="body1" gutterBottom>
          Stat bonus: {skill.bonus}
        </Typography>
      </Grid>
      <Grid size={12}>
        <Typography variant="body1" gutterBottom>
          Specialization: {skill.specialization}
        </Typography>
      </Grid>
      <Typography variant="body1" gutterBottom>
        {t(`skill-${skill.id}-description`)}
      </Typography>
    </Grid>
  );
};

export default SkillViewInfo;
