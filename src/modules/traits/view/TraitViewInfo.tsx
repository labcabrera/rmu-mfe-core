import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Chip, Grid, Paper, Stack, Typography } from '@mui/material';
import { imageBaseUrl, RmuTextCard, Trait } from '@labcabrera-rmu/rmu-react-shared-lib';

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
              value={trait.specialization ? t(trait.specialization) : t('none')}
              subtitle={t('specialization')}
              image={`${imageBaseUrl}images/generic/dev-points.png`}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <RmuTextCard
              value={trait.isTierBased ? `1 - ${trait.maxTier}` : t('no')}
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
          {trait.talentCategory && (
            <Grid size={{ xs: 12, md: 4 }}>
              <RmuTextCard
                value={t(trait.talentCategory)}
                subtitle={t('talent-category')}
                image={`${imageBaseUrl}images/generic/trait.png`}
              />
            </Grid>
          )}
          {trait.source && (
            <Grid size={{ xs: 12, md: 4 }}>
              <RmuTextCard
                value={t(trait.source)}
                subtitle={t('source')}
                image={`${imageBaseUrl}images/generic/trait.png`}
              />
            </Grid>
          )}
        </Grid>
      </Grid>

      {!!trait.prerequisites?.length && (
        <Grid size={12}>
          <Typography variant="subtitle2" color="primary">
            {t('trait-prerequisites')}
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mt: 0.5 }}>
            {trait.prerequisites.map((prerequisite, index) => (
              <Chip
                key={index}
                size="small"
                title={prerequisite.description || undefined}
                label={[
                  t(`trait-prerequisite-${prerequisite.type}`),
                  ...(prerequisite.value || []).map((value) => t(value, { defaultValue: value })),
                ].join(': ')}
              />
            ))}
          </Stack>
        </Grid>
      )}

      {!!trait.possibleFlaws?.length && (
        <Grid size={12}>
          <Typography variant="subtitle2" color="primary">
            {t('trait-possible-flaws')}
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mt: 0.5 }}>
            {trait.possibleFlaws.map((flaw) => (
              <Chip key={flaw} size="small" variant="outlined" label={t(flaw, { defaultValue: flaw })} />
            ))}
          </Stack>
        </Grid>
      )}

      <Grid size={12}>
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
