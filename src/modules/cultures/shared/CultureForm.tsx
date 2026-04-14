import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid } from '@mui/material';
import { Culture } from '@labcabrera-rmu/rmu-react-shared-lib';
import CultureFormAttributes from './CultureFormAttributes';

const CultureForm: FC<{
  formData: Culture;
  setFormData: Dispatch<SetStateAction<Culture>>;
}> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 12 }}>
        <CultureFormAttributes formData={formData} setFormData={setFormData} />
      </Grid>
    </Grid>
  );
};

export default CultureForm;
