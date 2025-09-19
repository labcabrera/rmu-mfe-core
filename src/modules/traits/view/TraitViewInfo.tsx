import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, FormControlLabel, Grid, Switch, TextField, Typography } from '@mui/material';
import { Trait } from '../../api/trait.dto';
import NumericReadonlyInput from '../../shared/inputs/NumericReadonlyInput';

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
        <TextField label={t('category')} name="category" value={t(trait.category)} variant="standard" fullWidth />
      </Grid>
      <Grid size={12}>
        <NumericReadonlyInput label={t('cost')} name="cost" value={trait.cost} />
      </Grid>
      <Grid size={12}>
        <NumericReadonlyInput label={t('max-tier')} name="max-tier" value={trait.maxTier} />
      </Grid>
      <Grid size={12}>
        <FormControl>
          <FormControlLabel
            control={<Switch value={trait.isTalent} defaultChecked={trait.isTalent} />}
            label={t('is-talent')}
            labelPlacement="start"
            disabled
          />
          <FormControlLabel
            control={<Switch value={trait.requiresSpecialization} defaultChecked={trait.requiresSpecialization} />}
            label={t('requires-specialization')}
            labelPlacement="start"
            disabled
          />
          <FormControlLabel
            control={<Switch value={trait.isTierBased} defaultChecked={trait.isTierBased} />}
            label={t('is-tier-based')}
            labelPlacement="start"
            disabled
          />
        </FormControl>
      </Grid>
      <Grid size={12}>
        <TextField label={t('description')} name="description" value={trait.description || ''} multiline maxRows={6} variant="standard" fullWidth />
      </Grid>
    </Grid>
  );
};

export default TraitViewInfo;
