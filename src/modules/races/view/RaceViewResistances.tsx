import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { Race, resistances } from '../../api/race.dto';
import { imageBaseUrl } from '../../services/config';
import RmuTextCard from '../../shared/cards/RmuTextCard';

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
        return `${imageBaseUrl}images/generic/${resistance}.png`;
      default:
        return `${imageBaseUrl}images/generic/stat-st.png`;
    }
  };

  return (
    <Grid container spacing={1} columns={10}>
      {resistances.map((resistance, index) => (
        <Grid size={{ xs: 5, md: 2 }} key={`resistance-${index}`}>
          <RmuTextCard
            value={race.resistances[resistance]}
            subtitle={t(resistance)}
            image={getImage(resistance)}
            grayscale={0.7}
            applyColor={true}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RaceViewResistances;
