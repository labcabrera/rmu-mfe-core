import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { Language } from '../../api/language.dto';
import { fetchLanguages } from '../../api/languages';
import { CreateRaceDto } from '../../api/race.dto';
import SelectLanguage from '../../shared/selects/SelectLanguage';

const RaceCreationLore: FC<{
  formData: CreateRaceDto;
  setFormData: Dispatch<SetStateAction<CreateRaceDto | undefined>>;
}> = ({ formData, setFormData }) => {
  const { showError } = useError();
  const [languages, setLanguages] = React.useState<Language[]>([]);

  useEffect(() => {
    fetchLanguages(`realmId==${formData.realmId}`, 0, 100)
      .then((data) => setLanguages(data))
      .catch((err: Error) => showError(err.message));
  }, [formData.realmId]);

  return (
    <Grid container spacing={1} columns={10}>
      <Grid size={12}>
        <SelectLanguage
          label={t('default-language')}
          value={formData.defaultLanguage}
          name="default-language"
          onChange={(language) => setFormData({ ...formData, defaultLanguage: language ? language.id : undefined })}
          languages={languages}
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

export default RaceCreationLore;
