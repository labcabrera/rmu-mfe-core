/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Grid, TextField } from '@mui/material';
import { EnumPicker, fetchEnumerations, Race, useNotify } from '@labcabrera-rmu/rmu-react-shared-lib';

const RaceFormLore: FC<{
  realmId: string;
  formData: Race;
  setFormData: (data: Race) => void;
}> = ({ realmId, formData, setFormData }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [languages, setLanguages] = React.useState<string[]>([]);

  useEffect(() => {
    if (realmId) {
      fetchEnumerations(`realmId==${realmId};category==language`, 0, 100, auth)
        .then((data) => {
          setLanguages(data.content.map((e) => e.key));
        })
        .catch((err) => notify.error(err));
    }
  }, [realmId]);

  return (
    <Grid container spacing={1} columns={10}>
      <Grid size={12}>
        <EnumPicker
          label={t('language')}
          values={languages}
          value={formData.defaultLanguage || null}
          allowAll
          allLabel={t('none')}
          onChange={(language) => setFormData({ ...formData, defaultLanguage: language ?? '' })}
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
          rows={12}
        />
      </Grid>
    </Grid>
  );
};

export default RaceFormLore;
