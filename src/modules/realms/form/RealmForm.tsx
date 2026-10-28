import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { AccessType, EnumPicker, MagicPresence, Realm } from '@labcabrera-rmu/rmu-react-shared-lib';
import { ACCESS_TYPES, MAGIC_PRESENCES } from '../../shared/enums';

const RealmForm: FC<{
  formData: Realm;
  setFormData: (data: Realm) => void;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <EnumPicker
          label={t('access-type')}
          values={ACCESS_TYPES}
          value={formData.accessType}
          onChange={(value) => value && setFormData({ ...formData, accessType: value as AccessType })}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('name')}
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={!formData.name}
          fullWidth
        />
      </Grid>
      <Grid size={12}>
        <EnumPicker
          label={t('magic-presence')}
          values={MAGIC_PRESENCES}
          value={formData.magicPresence}
          onChange={(value) => value && setFormData({ ...formData, magicPresence: value as MagicPresence })}
          required
        />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('short-description')}
          name="shortDescription"
          value={formData.shortDescription}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('description')}
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          fullWidth
          multiline
          rows={10}
        />
      </Grid>
    </Grid>
  );
};

export default RealmForm;
