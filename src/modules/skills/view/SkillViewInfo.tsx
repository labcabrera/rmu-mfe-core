import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';
import { RmuTextCard, Skill } from '@labcabrera-rmu/rmu-react-shared-lib';
import { imageBaseUrl } from '../../services/config';

const SkillViewInfo: FC<{
  skill: Skill;
}> = ({ skill }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  if (!skill) return <p>Loading...</p>;

  const descriptionKey = skill.id.includes('@')
    ? `skill-${skill.id.split('@')[0]}-description`
    : `skill-${skill.id}-description`;

  const onCategoryClick = () => {
    navigate(`/core/skill-categories/view/${skill.categoryId}`);
  };

  const getCategoryBonus = (): string => {
    if (!skill.bonus || skill.bonus.length === 0) return t('none');
    return skill.bonus.map((bonus) => t(bonus)).join('+');
  };

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          {t(skill.id)}
        </Typography>
      </Grid>
      <Grid size={12}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 3 }}>
            <RmuTextCard
              image={`${imageBaseUrl}images/generic/configuration.png`}
              onClick={onCategoryClick}
              value={t(skill.categoryId)}
              subtitle={t('category')}
            />
          </Grid>

          {skill.bonus && (
            <Grid size={{ xs: 12, md: 3 }}>
              <RmuTextCard
                subtitle={t('bonus')}
                image={`${imageBaseUrl}images/generic/configuration.png`}
                value={getCategoryBonus()}
              />
            </Grid>
          )}

          {skill.specialization && (
            <Grid size={{ xs: 12, md: 3 }}>
              <RmuTextCard
                subtitle="Specialization"
                image={`${imageBaseUrl}images/generic/configuration.png`}
                onClick={() => navigate(`/core/catalogs/view/${skill.specialization}`)}
                value={t(skill.specialization)}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid size={12} sx={{ mt: 1 }}>
        <Paper sx={{ p: 1 }}>
          <Typography variant="body1" gutterBottom sx={{ whiteSpace: 'pre-wrap' }}>
            {i18n.exists(descriptionKey) ? (
              <>{t(descriptionKey)}</>
            ) : (
              <>{t('This skill has no associated description.')}</>
            )}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SkillViewInfo;
