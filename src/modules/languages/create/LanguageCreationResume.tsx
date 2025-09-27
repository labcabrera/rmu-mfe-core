import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { CreateLanguageDto } from '../../api/language.dto';

const LanguageCreationResume: FC<{
  formData: CreateLanguageDto;
  setFormData: Dispatch<SetStateAction<CreateLanguageDto>>;
}> = ({ formData, setFormData }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <TextField
          label={t('name')}
          variant="standard"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          error={!formData.name}
          helperText={!formData.name ? t('name-is-required') : ''}
        />
      </Grid>
    </Grid>
  );
};

export default LanguageCreationResume;
