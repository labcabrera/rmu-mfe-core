import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { Realm } from '../../api/realm.dto';

const LanguageViewResume: FC<{
  realm: Realm;
}> = ({ realm }) => {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid size={12}>
        <Typography variant="body1">{realm?.name || ''}</Typography>
      </Grid>
    </Grid>
  );
};

export default LanguageViewResume;
