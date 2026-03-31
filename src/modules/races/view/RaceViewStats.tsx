import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { Race, stats } from '../../api/race.dto';
import { imageBaseUrl } from '../../services/config';

const RaceViewStats: FC<{
  race: Race;
}> = ({ race }) => {
  return (
    <Grid container spacing={1} columns={10}>
      {stats.map((stat, index) => (
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
