import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { UpdateRaceDto } from '../../api/race.dto';
import SelectRaceArchetype from '../../shared/selects/SelectRaceArchetype';

const RaceEditResume: FC<{
  formData: UpdateRaceDto;
  setFormData: Dispatch<SetStateAction<UpdateRaceDto>>;
}> = ({ formData, setFormData }) => {
  if (!formData) return <div>Loading...</div>;

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <TextField
          label={t('name')}
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid size={12}>
        <SelectRaceArchetype
          label={t('race-archetype')}
          name="archetype"
          value={formData.archetype}
          onChange={(e) => setFormData({ ...formData, archetype: e.target.value })}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('description')}
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          fullWidth
          multiline
          rows={12}
        />
      </Grid>
    </Grid>
  );
};

export default RaceEditResume;
