import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { CreateRaceDto, resistances } from '../../api/race.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';

const RaceCreationResistances: FC<{
  formData: CreateRaceDto;
  setFormData: Dispatch<SetStateAction<CreateRaceDto>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={1}>
      {resistances.map((resistance) => (
        <Grid key={resistance} size={12}>
          <NumericInput
            label={t(resistance)}
            name={`resistances.${resistance}`}
            value={formData.resistances[resistance]}
            onChange={(value) => setFormData({ ...formData, resistances: { ...formData.resistances, [resistance]: value } })}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RaceCreationResistances;
