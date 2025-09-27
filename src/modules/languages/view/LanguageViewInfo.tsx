import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { Language } from '../../api/language.dto';

const LanguageViewInfo: FC<{
  language: Language;
}> = ({ language }) => {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="body1">{language.description}</Typography>
      </Grid>
    </Grid>
  );
};

export default LanguageViewInfo;
