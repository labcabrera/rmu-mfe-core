import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { NumericInput, STATS, Race } from '@labcabrera-rmu/rmu-react-shared-lib';

const RaceFormStats: FC<{
  formData: Race;
  setFormData: Dispatch<SetStateAction<Race>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  if (!formData.stats) return <p>Loading...</p>;

  return (
    <Grid container columns={10} spacing={1}>
      {STATS.map((stat) => (
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
