import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Grid, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Culture, fetchEnumerations, useNotify, useSpecializationLabel } from '@labcabrera-rmu/rmu-react-shared-lib';
import MultiIdSelect from '../shared/MultiIdSelect';

const CultureFormAttributes: FC<{
  formData: Culture;
  setFormData: (data: Culture) => void;
}> = ({ formData, setFormData }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  // Spec 050: catalog keys shown by their name
  const specializationLabel = useSpecializationLabel();
  const [languageOptions, setLanguageOptions] = useState<string[]>([]);

  useEffect(() => {
    fetchEnumerations('category==language', 0, 1000, auth)
      .then((page) => setLanguageOptions(Array.from(new Set(page.content.map((e) => e.key)))))
      .catch(notify.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={1} columns={10}>
      <Grid size={12}>
        <TextField
          label={t('name')}
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
          <ToggleButton value="public">{t('public')}</ToggleButton>
          <ToggleButton value="private">{t('private')}</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid size={12}>
        <MultiIdSelect
          label={t('languages')}
          options={languageOptions}
          value={formData.languages || []}
          onChange={(languages) => setFormData({ ...formData, languages })}
          getLabel={specializationLabel}
          helperText={t('culture-languages-help')}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <TextField
          label={t('suggested-crafts')}
          name="suggestedCrafts"
          value={formData.suggestedCrafts || ''}
          onChange={(e) => setFormData({ ...formData, suggestedCrafts: e.target.value })}
          fullWidth
          multiline
          rows={2}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <TextField
          label={t('suggested-vocations')}
          name="suggestedVocations"
          value={formData.suggestedVocations || ''}
          onChange={(e) => setFormData({ ...formData, suggestedVocations: e.target.value })}
          fullWidth
          multiline
          rows={2}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('description')}
          variant="outlined"
          name="description"
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
