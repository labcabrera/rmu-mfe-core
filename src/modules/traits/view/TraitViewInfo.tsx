import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Paper, Typography } from '@mui/material';
import { RmuTextCard, Trait } from '@labcabrera-rmu/rmu-react-shared-lib';
import { imageBaseUrl } from '../../services/config';

const TraitViewInfo: FC<{
  trait: Trait;
}> = ({ trait }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="h6" color="primary" gutterBottom>
          {t(trait.name)}
        </Typography>
      </Grid>

      <Grid size={12}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 4 }}>
            <RmuTextCard
              value={t(trait.category)}
              image={`${imageBaseUrl}images/generic/trait.png`}
              subtitle={t('category')}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <RmuTextCard
              value={t(trait.isTalent ? t('trait') : t('flaw'))}
              image={`${imageBaseUrl}images/generic/trait.png`}
              subtitle={t('type')}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <RmuTextCard
              value={trait.specialization ? t(trait.specialization) : t('None')}
              subtitle={t('specialization')}
              image={`${imageBaseUrl}images/generic/dev-points.png`}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <RmuTextCard
              value={trait.isTierBased ? `1 - ${trait.maxTier}` : t('No')}
              subtitle={t('tier-based')}
              image={`${imageBaseUrl}images/generic/dev-points.png`}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <RmuTextCard
              value={trait.adquisitionCost}
              subtitle={t('adquisition-cost')}
              image={`${imageBaseUrl}images/generic/dev-points.png`}
            />
          </Grid>
          {trait.tierCost && (
            <Grid size={{ xs: 12, md: 4 }}>
              <RmuTextCard
                value={trait.tierCost || ''}
                subtitle={t('tier-cost')}
                image={`${imageBaseUrl}images/generic/dev-points.png`}
              />
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid size={12}>
        <Grid container spacing={1}></Grid>
        <Grid size={12}>
          <Paper sx={{ padding: 2, mt: 1 }}>
            <Typography variant="body1">{trait.description}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TraitViewInfo;
