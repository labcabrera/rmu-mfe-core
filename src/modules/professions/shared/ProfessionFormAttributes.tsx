import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Profession } from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectProfessionArchetype from '../../shared/selects/SelectProfessionArchetype';

const ProfessionFormAttributes: FC<{
  formData: Profession;
  setFormData: Dispatch<SetStateAction<Profession>>;
  creationMode: boolean;
}> = ({ formData, setFormData, creationMode }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={1} columns={10}>
      {creationMode && (
        <Grid size={12}>
          <TextField
            label={t('name')}
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
          label={t('archetype')}
          name="archetype"
          value={formData.archetype}
          onChange={(archetype) => setFormData({ ...formData, archetype })}
        />
      </Grid>
    </Grid>
  );
};

export default ProfessionFormAttributes;
