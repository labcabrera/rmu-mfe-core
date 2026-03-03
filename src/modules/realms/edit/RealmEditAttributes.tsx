import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { UpdateRealmDto } from '../../api/realm.dto';

const RealmEditAttributes: FC<{
  formData: UpdateRealmDto;
  setFormData: Dispatch<SetStateAction<UpdateRealmDto>>;
}> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <TextField
          label={t('name')}
          name="name"
          value={formData.name}
          onChange={(v) => setFormData({ ...formData, name: v.target.value })}
          fullWidth
        />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('short-description')}
          name="shortDescription"
          value={formData.shortDescription}
          onChange={(v) => setFormData({ ...formData, shortDescription: v.target.value })}
          fullWidth
        />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('description')}
          name="description"
          multiline
          rows={10}
          value={formData.description}
          onChange={(v) => setFormData({ ...formData, description: v.target.value })}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default RealmEditAttributes;
