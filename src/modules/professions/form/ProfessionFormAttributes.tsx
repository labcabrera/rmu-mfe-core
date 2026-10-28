import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { EnumPicker, Profession, ProfessionArchetype } from '@labcabrera-rmu/rmu-react-shared-lib';
import { PROFESSION_ARCHETYPES } from '../../shared/enums';

const ProfessionFormAttributes: FC<{
  formData: Profession;
  setFormData: (data: Profession) => void;
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
        <EnumPicker
          label={t('archetype')}
          name="archetype"
          values={PROFESSION_ARCHETYPES}
          value={formData.archetype}
          onChange={(archetype) =>
            archetype && setFormData({ ...formData, archetype: archetype as ProfessionArchetype })
          }
          required
        />
      </Grid>
    </Grid>
  );
};

export default ProfessionFormAttributes;
