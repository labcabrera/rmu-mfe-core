import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { Race, resistances } from '../../api/race.dto';
import NumericCard from '../../shared/cards/NumericCard';

const RaceViewResistances: FC<{
  race: Race;
}> = ({ race }) => {
  const { t } = useTranslation();

  const getImage = (resistance: string) => {
    switch (resistance) {
      case 'poison':
      case 'disease':
      case 'fear':
      case 'physical':
        return `/static/images/generic/${resistance}.png`;
      default:
        return `/static/images/generic/stat-st.png`;
    }
  };

  return (
    <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
      {resistances.map((resistance) => (
        <NumericCard value={race.resistances[resistance]} subtitle={t(resistance)} image={getImage(resistance)} />
      ))}
    </Box>
  );
};

export default RaceViewResistances;
