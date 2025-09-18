import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { CreateRaceDto, stats } from '../../api/race.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';

const RaceCreationStats: FC<{
  formData: CreateRaceDto;
  setFormData: Dispatch<SetStateAction<CreateRaceDto>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  return (
    <Grid container columns={12} spacing={1}>
      {stats.map((stat) => (
        <Grid key={stat} size={12}>
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
