import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@mui/material';
import { EnumPicker, NumericInput, Profession, ProfessionArchetype } from '@labcabrera-rmu/rmu-react-shared-lib';
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
      {/* Spec 064: Base lists of the profession a character develops as base; empty is no limit */}
      <Grid size={12}>
        <NumericInput
          label={t('base-list-limit')}
          name="baseListLimit"
          value={formData.baseListLimit ?? null}
          onChange={(value) => setFormData({ ...formData, baseListLimit: value && value >= 1 ? value : null })}
          placeholder={t('base-list-limit-none')}
          min={1}
          integer
        />
        <Typography variant="caption" color="text.secondary">
          {t('base-list-limit-hint')}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ProfessionFormAttributes;
