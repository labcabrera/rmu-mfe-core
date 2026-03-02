import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { CreateRaceDto } from '../../api/race.dto';
import SelectRaceArchetype from '../../shared/selects/SelectRaceArchetype';

const RaceCreationResume: FC<{
  formData: CreateRaceDto;
  setFormData: Dispatch<SetStateAction<CreateRaceDto>>;
}> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid size={12}>
        <TextField
          label={t('name')}
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
          error={!formData.name}
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
          variant="standard"
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

export default RaceCreationResume;
