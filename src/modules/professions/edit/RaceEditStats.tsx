import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import { CreateRaceDto as UpdateRaceDto, stats } from '../../api/race.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';

const RaceEditStats: FC<{
  formData: UpdateRaceDto;
  setFormData: Dispatch<SetStateAction<UpdateRaceDto>>;
}> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={1} mt={1} columns={10}>
      {stats.map((stat) => (
        <Grid key={stat} size={{ xs: 12, md: 2 }}>
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

export default RaceEditStats;
