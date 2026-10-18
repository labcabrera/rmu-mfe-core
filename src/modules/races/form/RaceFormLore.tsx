/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Grid, TextField } from '@mui/material';
import { fetchEnumerations, Race, useNotify } from '@labcabrera-rmu/rmu-react-shared-lib';
import { RmuSelect, SelectOption } from '../../shared/selects/RmuSelect';

const RaceFormLore: FC<{
  realmId: string;
  formData: Race;
  setFormData: (data: Race) => void;
}> = ({ realmId, formData, setFormData }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [languages, setLanguages] = React.useState<SelectOption[]>([]);

  useEffect(() => {
    if (realmId) {
      fetchEnumerations(`realmId==${realmId};category==language`, 0, 100, auth)
        .then((data) => {
          const mapped = data.content.map((e) => ({ value: e.key, description: e.key }));
          setLanguages(mapped);
        })
        .catch((err) => notify.error(err));
    }
  }, [realmId]);

  return (
    <Grid container spacing={1} columns={10}>
      <Grid size={12}>
        <RmuSelect
          label={t('language')}
          value={formData.defaultLanguage}
          options={languages}
          onChange={(e) => setFormData({ ...formData, defaultLanguage: e })}
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
