import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid } from '@mui/material';
import { NumericInput, CreateRaceDto, stats, UpdateRaceDto } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';

const RaceFormStats: FC<{
  formData: CreateRaceDto | UpdateRaceDto;
  setFormData: Dispatch<SetStateAction<CreateRaceDto | UpdateRaceDto | undefined>>;
}> = ({ formData, setFormData }) => {
  return (
    <Grid container columns={10} spacing={1}>
      {stats.map((stat) => (
        <Grid key={stat} size={{ xs: 5, md: 2 }}>
          <NumericInput
            label={t(stat)}
            name={`stats.${stat}`}
            value={formData.stats[stat]}
            onChange={(value) => setFormData({ ...formData, stats: { ...formData.stats, [stat]: value } })}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RaceFormStats;
