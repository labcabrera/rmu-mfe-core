import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import { CreateRaceDto, resistances, UpdateRaceDto } from '../../api/race.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';

const RaceFormResistances: FC<{
  formData: CreateRaceDto | UpdateRaceDto;
  setFormData: Dispatch<SetStateAction<CreateRaceDto | UpdateRaceDto>>;
}> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={2} columns={10}>
      {resistances.map((resistance) => (
        <Grid key={resistance} size={2}>
          <NumericInput
            label={t(resistance)}
            name={`resistances.${resistance}`}
            value={formData.resistances[resistance]}
            onChange={(value) =>
              setFormData({ ...formData, resistances: { ...formData.resistances, [resistance]: value } })
            }
            integer
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RaceFormResistances;
