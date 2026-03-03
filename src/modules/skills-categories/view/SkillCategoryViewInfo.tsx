import React, { FC } from 'react';
import { Chip, Grid, Stack, Typography } from '@mui/material';
import { t } from 'i18next';
import { Skill } from '../../api/skill.dto';

const SkillCategoryViewInfo: FC<{
  skillCategory: Skill;
}> = ({ skillCategory }) => {
  if (!skillCategory) return <p>Loading...</p>;

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          {t(skillCategory.id)}
        </Typography>
        {skillCategory.bonus && (
          <Stack direction="row" spacing={1}>
            {skillCategory.bonus.map((bonus) => (
              <Chip key={bonus} label={t(bonus)} />
            ))}
          </Stack>
        )}
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body1">{t(`skill-category-${skillCategory.id}-description`)}</Typography>
      </Grid>
    </Grid>
  );
};

export default SkillCategoryViewInfo;
