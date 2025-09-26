import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { CreateRealmDto } from '../../api/realm.dto';

const RealmCreationResume: FC<{
  formData: CreateRealmDto;
  setFormData: Dispatch<SetStateAction<CreateRealmDto>>;
}> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid size={12}>
        <TextField
          label={t('name')}
          variant="standard"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={!formData.name}
          helperText={!formData.name ? t('name-is-required') : ''}
          fullWidth
        />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('short-description')}
          variant="standard"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default RealmCreationResume;
