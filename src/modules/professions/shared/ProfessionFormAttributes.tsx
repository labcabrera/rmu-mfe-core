import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { CreateProfessionDto, UpdateProfessionDto } from '../../api/profession.dto';
import SelectProfessionArchetype from '../../shared/selects/SelectProfessionArchetype';

const ProfessionFormAttributes: FC<{
  formData: CreateProfessionDto | UpdateProfessionDto;
  setFormData: Dispatch<SetStateAction<CreateProfessionDto | UpdateProfessionDto | undefined>>;
  creationMode: boolean;
}> = ({ formData, setFormData, creationMode }) => {
  return (
    <Grid container spacing={1} columns={10}>
      {creationMode && (
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
      )}
      <Grid size={12}>
        <SelectProfessionArchetype
          label={t('Archetype')}
          name="archetype"
          value={formData.archetype}
          onChange={(archetype) => setFormData({ ...formData, archetype })}
        />
      </Grid>
    </Grid>
  );
};

export default ProfessionFormAttributes;
