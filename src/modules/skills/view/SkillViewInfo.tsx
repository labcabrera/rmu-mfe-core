import React, { FC } from 'react';
import { Chip, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { Skill } from '../../api/skill.dto';

const SkillViewInfo: FC<{
  skill: Skill;
}> = ({ skill }) => {
  if (!skill) return <p>Loading...</p>;

  const getDescriptionKey = () => {
    return skill.id.includes('@') ? `skill-${skill.id.split('@')[0]}-description` : `skill-${skill.id}-description`;
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          {t(skill.id)}
        </Typography>
      </Grid>
      <Grid size={12}>
        <Chip label={`${t(skill.bonus)}`} />
      </Grid>
      {skill.specialization && (
        <Grid size={12}>
          <Typography variant="body1" gutterBottom>
            Specialization: {skill.specialization}
          </Typography>
        </Grid>
      )}
      <Typography variant="body1" gutterBottom sx={{ whiteSpace: 'pre-wrap' }}>
        {t(getDescriptionKey())}
      </Typography>
      <pre>{JSON.stringify(skill, null, 2)} </pre>
    </Grid>
  );
};

export default SkillViewInfo;
