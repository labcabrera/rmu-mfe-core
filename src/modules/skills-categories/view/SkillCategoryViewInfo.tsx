import React, { FC } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { t } from 'i18next';
import { Skill } from '../../api/skill.dto';
import { imageBaseUrl } from '../../services/config';
import RmuTextCard from '../../shared/cards/RmuTextCard';

const SkillCategoryViewInfo: FC<{
  skillCategory: Skill;
}> = ({ skillCategory }) => {
  if (!skillCategory) return <p>Loading...</p>;

  function capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const getCategoryBonus = (): string => {
    if (!skillCategory.bonus || skillCategory.bonus.length === 0) return t('none');
    return skillCategory.bonus.map((bonus) => capitalize(bonus)).join('+');
  };

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t(skillCategory.id)}
        </Typography>
      </Grid>
      <Grid size={12}>
        {skillCategory.bonus && (
          <Grid size={{ xs: 12, md: 3 }}>
            <RmuTextCard
              subtitle={t('bonus')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
              value={getCategoryBonus()}
            />
          </Grid>
        )}
      </Grid>
      <Grid size={{ xs: 12, md: 8 }} mt={1}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body1" gutterBottom sx={{ whiteSpace: 'pre-wrap' }}>
            {t(`skill-category-${skillCategory.id}-description`)}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SkillCategoryViewInfo;
