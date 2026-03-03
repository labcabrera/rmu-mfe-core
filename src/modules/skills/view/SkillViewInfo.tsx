import React, { FC } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { t } from 'i18next';
import { Skill } from '../../api/skill.dto';
import { imageBaseUrl } from '../../services/config';
import CardListItem from '../../shared/cards/CardListItem';
import TextCard from '../../shared/cards/TextCard';

const SkillViewInfo: FC<{
  skill: Skill;
}> = ({ skill }) => {
  if (!skill) return <p>Loading...</p>;

  const getDescriptionKey = () => {
    return skill.id.includes('@') ? `skill-${skill.id.split('@')[0]}-description` : `skill-${skill.id}-description`;
  };

  const onCategoryClick = () => {
    // Implement navigation to category view
    console.log('Navigate to category:', skill.categoryId);
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          {t(skill.id)}
        </Typography>
      </Grid>
      <Grid size={12}>
        <CardListItem
          subtitle="Category"
          image={`${imageBaseUrl}images/generic/configuration.png`}
          title={t(skill.categoryId)}
          onClick={onCategoryClick}
        />
      </Grid>
      {skill.bonus && (
        <Grid size={12}>
          <Stack direction="row" spacing={1} alignItems="center">
            {skill.bonus.map((bonus) => (
              <TextCard
                key={bonus}
                subtitle="Bonus"
                image={`${imageBaseUrl}images/generic/configuration.png`}
                value={t(bonus)}
              />
            ))}
          </Stack>
        </Grid>
      )}
      {skill.specialization && (
        <Grid size={12}>
          <TextCard
            subtitle="Specialization"
            image={`${imageBaseUrl}images/generic/configuration.png`}
            value={t(skill.specialization)}
          />
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
