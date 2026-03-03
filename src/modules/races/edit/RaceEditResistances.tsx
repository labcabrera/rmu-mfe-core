import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { CreateRaceDto as UpdateRaceDto, resistances } from '../../api/race.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';

const RaceEditResistances: FC<{
  formData: UpdateRaceDto;
  setFormData: Dispatch<SetStateAction<UpdateRaceDto>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={1} columns={10}>
      {resistances.map((resistance) => (
        <Grid key={resistance} size={{ xs: 12, md: 2 }}>
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

export default RaceEditResistances;
