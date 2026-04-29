import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { RmuTextCard, Race, STATS } from '@labcabrera-rmu/rmu-react-shared-lib';
import { imageBaseUrl } from '../../services/config';

const RaceViewStats: FC<{
  race: Race;
}> = ({ race }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={1} columns={10}>
      {STATS.map((stat, index) => (
        <Grid size={{ xs: 5, md: 2 }} key={index}>
          <RmuTextCard
            value={race.stats[stat]}
            subtitle={t(stat)}
            image={`${imageBaseUrl}images/generic/stat-${stat}.png`}
            applyColor={true}
            grayscale={0.7}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RaceViewStats;
