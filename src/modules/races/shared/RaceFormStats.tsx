import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import { CreateRaceDto, stats, UpdateRaceDto } from '../../api/race.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';

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
