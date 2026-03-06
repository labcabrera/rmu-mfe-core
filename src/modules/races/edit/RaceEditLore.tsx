import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { Language } from '../../api/language.dto';
import { fetchLanguages } from '../../api/languages';
import { Race, UpdateRaceDto } from '../../api/race.dto';
import SelectLanguage from '../../shared/selects/SelectLanguage';

const RaceEditAttributes: FC<{
  race: Race;
  formData: UpdateRaceDto;
  setFormData: Dispatch<SetStateAction<UpdateRaceDto>>;
}> = ({ race, formData, setFormData }) => {
  const [languages, setLanguages] = React.useState<Language[]>([]);

  if (!race || !formData) return <div>Loading...</div>;

  useEffect(() => {
    fetchLanguages(`realm.id==${race.realm.id}`, 0, 100)
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
          onChange={(language) => setFormData({ ...formData, defaultLanguageId: language ? language.id : undefined })}
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
