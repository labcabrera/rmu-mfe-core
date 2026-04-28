/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import { Race, fetchEnumerations } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { RmuSelect, SelectOption } from '../../shared/selects/RmuSelect';
import { useAuth } from 'react-oidc-context';

const RaceFormLore: FC<{
  realmId: string;
  formData: Race;
  setFormData: Dispatch<SetStateAction<Race>>;
}> = ({ realmId, formData, setFormData }) => {
  const auth = useAuth();
  const { showError } = useError();
  const [languages, setLanguages] = React.useState<SelectOption[]>([]);

  useEffect(() => {
    if (realmId) {
      fetchEnumerations(`realmId==${realmId};category==language`, 0, 100, auth)
        .then((data) => {
          const mapped = data.content.map((e) => ({ value: e.key, description: e.key }));
          setLanguages(mapped);
        })
        .catch((err) => showError(err.message));
    }
  }, [realmId]);

  return (
    <Grid container spacing={1} columns={10}>
      <Grid size={12}>
        <RmuSelect
          label={t('Language')}
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
