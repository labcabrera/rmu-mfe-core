import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { UpdateLanguageDto } from '../../api/language.dto';

const LanguageEditResume: FC<{
  formData: UpdateLanguageDto;
  setFormData: Dispatch<SetStateAction<UpdateLanguageDto>>;
}> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          variant="standard"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default LanguageEditResume;
