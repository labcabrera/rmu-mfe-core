import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { Race, resistances } from '../../api/race.dto';
import NumericReadonlyInput from '../../shared/inputs/NumericReadonlyInput';

const RaceViewResistances: FC<{
  race: Race;
}> = ({ race }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={1}>
      {resistances.map((resistance) => (
        <Grid key={resistance} size={12}>
          <NumericReadonlyInput label={t(resistance)} name={`resistances.${resistance}`} value={race.resistances[resistance]} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RaceViewResistances;
