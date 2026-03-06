import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { Language } from '../../api/language.dto';
import { fetchLanguages } from '../../api/languages';
import { UpdateRaceDto } from '../../api/race.dto';
import SelectLanguage from '../../shared/selects/SelectLanguage';

const RaceEditAttributes: FC<{
  formData: UpdateRaceDto;
  setFormData: Dispatch<SetStateAction<UpdateRaceDto>>;
}> = ({ formData, setFormData }) => {
  const [languages, setLanguages] = React.useState<Language[]>([]);

  useState(() => {
    fetchLanguages(`realm.id==${formData.realmId}`, 0, 100)
      .then((data) => setLanguages(data))
      .catch((err: Error) => console.error(err.message));
  }, []);

  if (!formData) return <div>Loading...</div>;

  return (
    <Grid container spacing={1} columns={10}>
      <Grid size={12}>
        <SelectLanguage
          label={t('default-language')}
          value={undefined}
          name={''}
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

export default RaceEditAttributes;
