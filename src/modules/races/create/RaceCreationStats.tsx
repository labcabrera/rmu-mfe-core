import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { CreateRaceDto, stats } from '../../api/race.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';

const RaceCreationStats: FC<{
  formData: CreateRaceDto;
  setFormData: Dispatch<SetStateAction<CreateRaceDto>>;
}> = ({ formData, setFormData }) => {
  return (
    <Grid container columns={12} spacing={1}>
      <Grid size={12}>
        <Typography variant="h6" color="primary">
          {t('statistics')}
        </Typography>
      </Grid>
      {stats.map((stat) => (
        <Grid key={stat} size={2}>
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

export default RaceCreationStats;
