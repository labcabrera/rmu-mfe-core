import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Culture } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';

const CultureFormAttributes: FC<{
  formData: Culture;
  setFormData: Dispatch<SetStateAction<Culture>>;
}> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={1} columns={10}>
      <Grid size={12}>
        <TextField
          label={t('Name')}
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
          error={!formData.name}
        />
      </Grid>
      <Grid size={12}>
        <ToggleButtonGroup
          color={formData.accessType === 'private' ? 'error' : 'success'}
          value={formData.accessType}
          exclusive
          onChange={(_e, v) => setFormData({ ...formData, accessType: v })}
          size="small"
        >
          <ToggleButton value="public">Public</ToggleButton>
          <ToggleButton value="private">Private</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('Description')}
          variant="outlined"
          name="name"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          fullWidth
          multiline
          rows={5}
        />
      </Grid>
    </Grid>
  );
};

export default CultureFormAttributes;
