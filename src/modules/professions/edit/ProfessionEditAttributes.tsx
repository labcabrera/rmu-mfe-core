import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { UpdateProfessionDto } from '../../api/profession.dto';

const ProfessionEditAttributes: FC<{
  formData: UpdateProfessionDto;
  setFormData: Dispatch<SetStateAction<UpdateProfessionDto | undefined>>;
}> = ({ formData, setFormData }) => {
  if (!formData) return <div>Loading...</div>;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <TextField
          label={t('Description')}
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          fullWidth
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
};

export default ProfessionEditAttributes;
