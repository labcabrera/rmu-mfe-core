import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@mui/material';
import { Language } from '../../api/language.dto';

const LanguageViewInfo: FC<{
  language: Language;
}> = ({ language }) => {
  const { t } = useTranslation();

  if (!language) return <p>Loading...</p>;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="h6" color="primary">
          {t('language-information')}
        </Typography>
      </Grid>
      <Grid size={12}>
        <TextField label={t('name')} name="name" value={language.name || ''} variant="standard" fullWidth />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('description')}
          name="description"
          value={language.description || ''}
          multiline
          maxRows={4}
          variant="standard"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default LanguageViewInfo;
