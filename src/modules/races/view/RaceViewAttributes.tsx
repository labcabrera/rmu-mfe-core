import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import { Race } from '../../api/race.dto';
import { imageBaseUrl } from '../../services/config';
import RmuTextCard from '../../shared/cards/RmuTextCard';

const grayscale = 0.7;

const RaceViewAttributes: FC<{
  race: Race;
}> = ({ race }) => {
  return (
    <Grid container spacing={1} columns={10}>
      <Grid size={{ xs: 5, md: 2 }}>
        <RmuTextCard
          value={t(race.sizeId)}
          subtitle={t('race-size')}
          image={`${imageBaseUrl}images/generic/race-size.png`}
          grayscale={grayscale}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <RmuTextCard
          value={race.baseHits}
          subtitle={t('base-hit-points')}
          image={`${imageBaseUrl}images/generic/hp.png`}
          applyColor={false}
          grayscale={grayscale}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <RmuTextCard
          value={race.strideBonus}
          subtitle={t('stride-bonus')}
          image={`${imageBaseUrl}images/generic/stride-bonus.png`}
          grayscale={grayscale}
          applyColor={true}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <RmuTextCard
          value={race.enduranceBonus}
          subtitle={t('endurance-bonus')}
          image={`${imageBaseUrl}images/generic/stat-co.png`}
          grayscale={grayscale}
          applyColor={true}
        />
      </Grid>

      <Grid size={{ xs: 5, md: 2 }}>
        <RmuTextCard
          value={race.recoveryMultiplier}
          subtitle={t('recovery-multiplier')}
          image={`${imageBaseUrl}images/generic/physical.png`}
          grayscale={grayscale}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <RmuTextCard
          value={race.baseAt}
          subtitle={t('base-at')}
          image={`${imageBaseUrl}images/generic/trait-racial.png`}
          grayscale={grayscale}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <RmuTextCard
          value={race.baseDevPoints}
          subtitle={t('base-dev-points')}
          image={`${imageBaseUrl}images/generic/trait-combat.png`}
          grayscale={grayscale}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <RmuTextCard
          value={`${race.averageHeight.male} / ${race.averageHeight.female}`}
          subtitle={t('average-height')}
          image={`${imageBaseUrl}images/generic/race-size.png`}
          grayscale={grayscale}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <RmuTextCard
          value={`${race.averageWeight.male} / ${race.averageWeight.female}`}
          subtitle={t('average-weight')}
          image={`${imageBaseUrl}images/generic/race-size.png`}
          grayscale={grayscale}
        />
      </Grid>
    </Grid>
  );
};

export default RaceViewAttributes;
