import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { CreateProfessionDto } from '../../api/profession.dto';

const ProfessionCreationAttributes: FC<{
  formData: CreateProfessionDto;
  setFormData: Dispatch<SetStateAction<CreateProfessionDto | undefined>>;
}> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={1} columns={10}>
      <Grid size={12}>
        <TextField
          label={t('Name')}
          name="id"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          fullWidth
          error={!formData.id}
        />
      </Grid>
    </Grid>
  );
};

export default ProfessionCreationAttributes;
