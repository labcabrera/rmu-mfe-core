import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@mui/material';
import { Realm } from '../../api/realm';

const RealmViewInfo: FC<{
  realm: Realm;
}> = ({ realm }) => {
  const { t } = useTranslation();

  if (!realm) {
    return <p>Loading...</p>;
  }

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="h6" color="primary">
          {t('realm-information')}
        </Typography>
      </Grid>
      <Grid size={12}>
        <TextField label={t('name')} name="name" value={realm.name || ''} variant="standard" fullWidth />
      </Grid>
      <Grid size={12}>
        <TextField label={t('description')} name="description" value={realm.description || ''} multiline maxRows={4} variant="standard" fullWidth />
      </Grid>
    </Grid>
  );
};

export default RealmViewInfo;
