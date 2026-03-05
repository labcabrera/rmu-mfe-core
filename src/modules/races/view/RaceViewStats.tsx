import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { Race, stats } from '../../api/race.dto';
import { imageBaseUrl } from '../../services/config';
import RmuTextCard from '../../shared/cards/RmuTextCard';

const RaceViewStats: FC<{
  race: Race;
}> = ({ race }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={1} columns={10}>
      {stats.map((stat, index) => (
        <Grid size={{ xs: 5, md: 2 }} key={`stat-${index}`}>
          <RmuTextCard
            value={race.stats[stat]}
            subtitle={t(stat)}
            image={`${imageBaseUrl}images/generic/stat-${stat}.png`}
            applyColor={true}
            size="small"
            grayscale={0.7}
            key={stat}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RaceViewStats;
