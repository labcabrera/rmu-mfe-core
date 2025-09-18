import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { Race, stats } from '../../api/race.dto';
import NumericReadonlyInput from '../../shared/inputs/NumericReadonlyInput';

const RaceViewStats: FC<{
  race: Race;
}> = ({ race }) => {
  const { t } = useTranslation();

  return (
    <Grid container columns={12} spacing={1}>
      {stats.map((stat) => (
        <Grid key={stat} size={12}>
          <NumericReadonlyInput label={t(stat)} name={`stats.${stat}`} value={race.stats[stat]} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RaceViewStats;
