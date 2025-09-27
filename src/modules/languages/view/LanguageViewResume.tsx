import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { Language } from '../../api/language.dto';
import { Realm } from '../../api/realm.dto';

const LanguageViewResume: FC<{
  language: Language;
  realm: Realm;
}> = ({ language, realm }) => {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid size={12}>
        <Typography variant="h6" color="primary">
          {language.name}
        </Typography>
        <Typography variant="body1">{realm?.name || ''}</Typography>
      </Grid>
    </Grid>
  );
};

export default LanguageViewResume;
