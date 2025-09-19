import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { Race, resistances } from '../../api/race.dto';
import CardListItem from '../../shared/cards/CardListItem';

const RaceViewResistances: FC<{
  race: Race;
}> = ({ race }) => {
  const { t } = useTranslation();

  return (
    <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
      {resistances.map((resistance) => (
        <CardListItem
          title={race.resistances[resistance]}
          subtitle={t(resistance)}
          image={`/static/images/generic/stat-st.png`}
          maxWidth={220}
          minWidth={220}
          height={80}
          imageSize={80}
        />
      ))}
    </Box>
  );
};

export default RaceViewResistances;
