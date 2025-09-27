import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { CreateRealmDto } from '../../api/realm.dto';

const RealmCreationAttributes: FC<{
  formData: CreateRealmDto;
  setFormData: Dispatch<SetStateAction<CreateRealmDto>>;
}> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <TextField
          label={t('description')}
          variant="standard"
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          multiline
          rows={10}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default RealmCreationAttributes;
