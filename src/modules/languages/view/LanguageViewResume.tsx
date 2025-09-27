import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { Language } from '../../api/language.dto';

const LanguageViewResume: FC<{
  language: Language;
}> = ({ language }) => {
  if (!language) return <p>Loading...</p>;

  return (
    <Grid container spacing={2} mt={2}>
      <Grid size={12}>
        <Typography variant="h6" color="primary">
          {language.name}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LanguageViewResume;
