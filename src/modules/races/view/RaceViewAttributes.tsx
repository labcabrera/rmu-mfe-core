import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Race } from '../../api/race.dto';
import NumericReadonlyInput from '../../shared/inputs/NumericReadonlyInput';

const RaceViewAttributes: FC<{
  race: Race;
}> = ({ race }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <TextField label={t('race-size')} name="sizeId" value={t(race.sizeId)} variant="standard" fullWidth />
      </Grid>
      <Grid size={4}>
        <NumericReadonlyInput label={t('base-hit-points')} name="baseHitsMale" value={race.baseHits} />
      </Grid>
      <Grid size={4}>
        <NumericReadonlyInput label={t('stride-bonus')} name="strideBonusMale" value={race.strideBonus} />
      </Grid>
      <Grid size={4}>
        <NumericReadonlyInput label={t('endurance-bonus')} name="enduranceBonusMale" value={race.enduranceBonus} />
      </Grid>
      <Grid size={4}>
        <NumericReadonlyInput label={t('recovery-multiplier')} name="recoveryMultiplierMale" value={race.recoveryMultiplier} />
      </Grid>
      <Grid size={4}>
        <NumericReadonlyInput label={t('base-at')} name="baseAtMale" value={race.baseAt} />
      </Grid>
      <Grid size={4}>
        <NumericReadonlyInput label={t('base-dev-points')} name="baseDevPointsMale" value={race.baseDevPoints} />
      </Grid>
      <Grid size={4}>
        <TextField label={t('default-language')} variant="standard" name="defaultLanguage" value={race.defaultLanguage} fullWidth />
      </Grid>
      <Grid size={4}>
        <NumericReadonlyInput label={t('average-height-male')} name="averageHeightMale" value={race.averageHeight.male} />
      </Grid>
      <Grid size={4}>
        <NumericReadonlyInput label={t('average-height-female')} name="averageHeightFemale" value={race.averageHeight.female} />
      </Grid>
      <Grid size={4}>
        <NumericReadonlyInput label={t('average-weight-male')} name="averageWeightMale" value={race.averageWeight.male} />
      </Grid>
      <Grid size={4}>
        <NumericReadonlyInput label={t('average-weight-female')} name="averageWeightFemale" value={race.averageWeight.female} />
      </Grid>
    </Grid>
  );
};

export default RaceViewAttributes;
