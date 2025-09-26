import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { Trait } from '../../api/trait.dto';

const TraitViewResume: FC<{
  trait: Trait;
}> = ({ trait }) => {
  if (!trait) return <p>Loading...</p>;

  return (
    <Grid container spacing={1} mt={3}>
      <Grid size={12}>
        <Typography variant="h6" color="primary" gutterBottom>
          {t(trait.name)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t(trait.category)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t(trait.isTalent ? t('trait') : t('flaw'))}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TraitViewResume;
