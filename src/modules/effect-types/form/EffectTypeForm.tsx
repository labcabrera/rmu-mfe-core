import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, FormControlLabel, Grid, MenuItem, Switch, TextField } from '@mui/material';
import {
  effectPropertyRequirements,
  EffectPropertyRequirement,
  EffectType,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectAccessType from '../../shared/selects/SelectAccessType';

const EffectRequirementSelect: FC<{
  label: string;
  value: EffectPropertyRequirement;
  onChange: (value: EffectPropertyRequirement) => void;
}> = ({ label, value, onChange }) => {
  const { t } = useTranslation();

  return (
    <TextField
      select
      label={label}
      value={value || ''}
      onChange={(e) => onChange(e.target.value as EffectPropertyRequirement)}
      fullWidth
      required
      error={!value}
    >
      {effectPropertyRequirements.map((requirement) => (
        <MenuItem key={requirement} value={requirement}>
          {t(requirement)}
        </MenuItem>
      ))}
    </TextField>
  );
};

const EffectTypeForm: FC<{
  formData: EffectType;
  setFormData: Dispatch<SetStateAction<EffectType>>;
  create: boolean;
}> = ({ formData, setFormData, create }) => {
  const { t } = useTranslation();

  const onIdChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, id: e.target.value });
  };

  if (!formData || !setFormData) return <p>Loading...</p>;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <SelectAccessType
          value={formData.accessType}
          onChange={(value) => setFormData({ ...formData, accessType: value })}
        />
      </Grid>
      {create && (
        <Grid size={12}>
          <TextField
            label={t('id')}
            name="id"
            value={formData.id || ''}
            onChange={onIdChange}
            error={!formData.id}
            fullWidth
            required
          />
        </Grid>
      )}
      <Grid size={12}>
        <FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={formData.isPersistent}
                onChange={(e) => setFormData({ ...formData, isPersistent: e.target.checked })}
              />
            }
            label={t('is-persistent')}
            labelPlacement="start"
          />
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <EffectRequirementSelect
          label={t('value')}
          value={formData.value}
          onChange={(value) => setFormData({ ...formData, value })}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <EffectRequirementSelect
          label={t('modifier')}
          value={formData.modifier}
          onChange={(modifier) => setFormData({ ...formData, modifier })}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <EffectRequirementSelect
          label={t('rounds')}
          value={formData.rounds}
          onChange={(rounds) => setFormData({ ...formData, rounds })}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <EffectRequirementSelect
          label={t('text')}
          value={formData.text}
          onChange={(text) => setFormData({ ...formData, text })}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <EffectRequirementSelect
          label={t('location')}
          value={formData.location}
          onChange={(location) => setFormData({ ...formData, location })}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <EffectRequirementSelect
          label={t('delay')}
          value={formData.delay}
          onChange={(delay) => setFormData({ ...formData, delay })}
        />
      </Grid>
    </Grid>
  );
};

export default EffectTypeForm;
