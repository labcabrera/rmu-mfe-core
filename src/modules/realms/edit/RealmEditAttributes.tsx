import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Grid, TextField } from '@mui/material';
import { UpdateRealmDto } from '../../api/realm.dto';

const RealmEditAttributes: FC<{
  formData: UpdateRealmDto;
  setFormData: Dispatch<SetStateAction<UpdateRealmDto>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h6" color="primary">
          {t('realm-info')}
        </Typography>
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('description')}
          name="description"
          multiline
          rows={10}
          value={formData.description}
          onChange={handleChange}
          variant="standard"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default RealmEditAttributes;
