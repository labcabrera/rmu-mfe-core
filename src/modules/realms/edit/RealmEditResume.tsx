import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { UpdateRealmDto } from '../../api/realm.dto';

const RealmEditResume: FC<{
  formData: UpdateRealmDto;
  setFormData: Dispatch<SetStateAction<UpdateRealmDto>>;
}> = ({ formData, setFormData }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Grid container spacing={2} mt={3}>
      <Grid size={12}>
        <TextField
          label={t('name')}
          name="name"
          value={formData.name}
          onChange={onChange}
          variant="standard"
          fullWidth
        />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('short-description')}
          name="shortDescription"
          value={formData.shortDescription}
          onChange={onChange}
          variant="standard"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default RealmEditResume;
