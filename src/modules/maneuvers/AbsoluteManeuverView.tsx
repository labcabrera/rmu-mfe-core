import React, { FC, useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../ErrorContext';
import { AbsoluteManeuverResult, fetchAbsoluteManeuver } from '../api/maneuver';
import { NumericInput } from '../shared/inputs/NumericInput';
import SelectManeuverTable from '../shared/selects/SelectManeuverTable';

const AbsoluteManeuverView: FC = () => {
  const { showError } = useError();

  const [roll, setRoll] = useState<number | null>(null);
  const [result, setResult] = useState<AbsoluteManeuverResult | null>(null);
  const [unusualEvent, setUnusualEvent] = useState<boolean>(false);
  const [table, setTable] = useState<string | null>(null);

  useEffect(() => {
    if (roll !== null) {
      fetchAbsoluteManeuver(roll, table, unusualEvent)
        .then((data) => setResult(data))
        .catch((err) => showError(err));
    } else {
      setResult(null);
    }
  }, [roll, unusualEvent, table, showError]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={2}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <NumericInput label={t('roll')} value={roll} onChange={(e) => setRoll(e)} integer />
            </Grid>
            <Grid size={12}>
              <SelectManeuverTable
                value={table}
                label={t('maneuver-table')}
                onChange={(event) => setTable(event.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <FormControlLabel
                control={<Checkbox checked={unusualEvent} onChange={(e) => setUnusualEvent(e.target.checked)} />}
                label={t('unusual-event')}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={1}></Grid>
        {result && (
          <Grid size={8}>
            <Typography variant="body1" color="primary" gutterBottom>
              {t(result.result)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {result.message}
            </Typography>
            {result.penaltyUntilAbsoluteSuccess && (
              <Typography variant="body1" gutterBottom>
                Penalty until absolute success: {result.penaltyUntilAbsoluteSuccess}
              </Typography>
            )}
            {result.bonusUntilAbsoluteFailure && (
              <Typography variant="body1" gutterBottom>
                Bonus until absolute failure: {result.bonusUntilAbsoluteFailure}
              </Typography>
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default AbsoluteManeuverView;
