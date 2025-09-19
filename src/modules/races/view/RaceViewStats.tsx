import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { Race, stats } from '../../api/race.dto';
import NumericCard from '../../shared/cards/NumericCard';

const RaceViewStats: FC<{
  race: Race;
}> = ({ race }) => {
  const { t } = useTranslation();

  return (
    <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
      {stats.map((stat) => (
        <NumericCard value={race.stats[stat]} subtitle={t(stat)} image={`/static/images/generic/stat-${stat}.png`} />
      ))}
    </Box>
  );
};

export default RaceViewStats;
