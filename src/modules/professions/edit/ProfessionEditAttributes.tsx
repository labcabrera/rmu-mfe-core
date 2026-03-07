import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { UpdateProfessionDto } from '../../api/profession.dto';

const ProfessionEditAttributes: FC<{
  formData: UpdateProfessionDto;
  setFormData: Dispatch<SetStateAction<UpdateProfessionDto | undefined>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  if (!formData) return <div>Loading...</div>;

  return (
    <Grid container spacing={1} columns={10}>
      <Grid size={12}>
        <TextField
          label={t('Description')}
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default ProfessionEditAttributes;
