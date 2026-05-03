import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { NumericInput, resistances, Race } from '@labcabrera-rmu/rmu-react-shared-lib';

const RaceFormResistances: FC<{
  formData: Race;
  setFormData: Dispatch<SetStateAction<Race>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  if (!formData.resistances) return <p>Loading...</p>;

  return (
    <Grid container spacing={2} columns={10}>
      {resistances.map((resistance) => (
        <Grid key={resistance} size={{ xs: 5, md: 2 }}>
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
