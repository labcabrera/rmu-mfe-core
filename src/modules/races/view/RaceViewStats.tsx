import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { Race, stats } from '../../api/race.dto';
import CardListItem from '../../shared/cards/CardListItem';

const RaceViewStats: FC<{
  race: Race;
}> = ({ race }) => {
  const { t } = useTranslation();

  return (
    <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
      {stats.map((stat) => (
        <CardListItem
          title={race.stats[stat]}
          subtitle={t(stat)}
          image={`/static/images/generic/stat-${stat}.png`}
          maxWidth={220}
          minWidth={220}
          height={80}
          imageSize={80}
        />
      ))}
    </Box>
  );
};

export default RaceViewStats;
