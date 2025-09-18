import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@mui/material';
import { Trait } from '../../api/trait.dto';

const TraitViewInfo: FC<{
  trait: Trait;
}> = ({ trait }) => {
  const { t } = useTranslation();

  if (!trait) {
    return <p>Loading...</p>;
  }

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="h6" color="primary">
          {t(trait.id)}
        </Typography>
      </Grid>
      <Grid size={12}>
        <TextField label={t('is-talent')} name="isTalent" value={trait.isTalent || ''} variant="standard" fullWidth />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('requires-specialization')}
          name="requiresSpecialization"
          value={trait.requiresSpecialization || ''}
          variant="standard"
          fullWidth
        />
      </Grid>
      <Grid size={12}>
        <TextField label={t('cost')} name="cost" value={trait.cost || ''} variant="standard" fullWidth />
      </Grid>
      <Grid size={12}>
        <TextField label={t('description')} name="description" value={trait.description || ''} multiline maxRows={4} variant="standard" fullWidth />
      </Grid>
    </Grid>
  );
};

export default TraitViewInfo;
