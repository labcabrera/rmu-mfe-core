import React, { FC, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../ErrorContext';
import { AbsoluteManeuverResult, fetchAbsoluteManeuver } from '../api/maneuver';
import { NumericInput } from '../shared/inputs/NumericInput';

const AbsoluteManeuverView: FC = () => {
  const { showError } = useError();

  const [roll, setRoll] = useState<number | null>(null);
  const [result, setResult] = useState<AbsoluteManeuverResult | null>(null);

  const onRollChange = (value: number | null) => {
    setRoll(value);
    if (value) {
      fetchAbsoluteManeuver(value)
        .then((data) => setResult(data))
        .catch((err) => showError(err));
    } else {
      setResult(null);
    }
  };

  useEffect(() => {
    // Reset result when roll is cleared
    if (roll === null) {
      setResult(null);
    }
  }, [roll]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={2}>
          <NumericInput label={t('roll')} value={roll} onChange={onRollChange} integer />
        </Grid>
        <Grid size={1}></Grid>
        {result && (
          <Grid size={8}>
            <Typography variant="body1" color="primary" gutterBottom>
              {t(result.result)}
            </Typography>
            <Typography variant="body1">{result.message}</Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default AbsoluteManeuverView;
