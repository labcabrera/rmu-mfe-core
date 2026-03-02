import React, { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { Trait } from '../../api/trait.dto';
import { imageBaseUrl } from '../../services/config';
import NumericCard from '../../shared/cards/NumericCard';
import TextCard from '../../shared/cards/TextCard';

const TraitViewInfo: FC<{
  trait: Trait;
}> = ({ trait }) => {
  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="body1">{trait.description}</Typography>
      </Grid>
      <Grid size={12} mt={5}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextCard
            value={t(trait.specialization)}
            subtitle={t('specialization')}
            image={`${imageBaseUrl}images/generic/dev-points.png`}
            minWidth={400}
            maxWidth={400}
          />
        </Box>
      </Grid>
      <Grid size={12} mt={5}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextCard
            value={trait.isTierBased ? t('Yes') : t('No')}
            subtitle={t('tier-based')}
            image={`${imageBaseUrl}images/generic/dev-points.png`}
          />
          <NumericCard
            value={trait.adquisitionCost}
            subtitle={t('adquisition-cost')}
            image={`${imageBaseUrl}images/generic/dev-points.png`}
          />
          {trait.isTierBased && (
            <>
              <NumericCard
                value={trait.tierCost}
                subtitle={t('tier-cost')}
                image={`${imageBaseUrl}images/generic/dev-points.png`}
              />
              <NumericCard
                value={trait.maxTier}
                subtitle={t('max-tier')}
                image={`${imageBaseUrl}images/generic/dev-points.png`}
                applyColor={false}
              />
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default TraitViewInfo;
