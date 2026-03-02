import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { UpdateLanguageDto } from '../../api/language.dto';

const LanguageEditResume: FC<{
  formData: UpdateLanguageDto;
  setFormData: Dispatch<SetStateAction<UpdateLanguageDto>>;
}> = ({ formData, setFormData }) => {
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
    </Grid>
  );
};

export default LanguageEditResume;
