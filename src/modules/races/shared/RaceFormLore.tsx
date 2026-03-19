import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchEnumerations } from '../../api/enumerations';
import { CreateRaceDto, UpdateRaceDto } from '../../api/race.dto';
import { RmuSelect, SelectOption } from '../../shared/selects/RmuSelect';

const RaceFormLore: FC<{
  realmId: string;
  formData: CreateRaceDto | UpdateRaceDto;
  setFormData: Dispatch<SetStateAction<CreateRaceDto | UpdateRaceDto | undefined>>;
}> = ({ realmId, formData, setFormData }) => {
  const { showError } = useError();
  const [languages, setLanguages] = React.useState<SelectOption[]>([]);

  useEffect(() => {
    if (realmId) {
      fetchEnumerations(`realmId==${realmId};category==language`, 0, 100)
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
