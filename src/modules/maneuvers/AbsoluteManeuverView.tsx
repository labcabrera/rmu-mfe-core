import React, { FC, useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, Grid, Paper, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../ErrorContext';
import { fetchAbsoluteManeuver, fetchAbsoluteManeuverTables } from '../api/maneuver';
import { AbsoluteManeuverResult } from '../api/maneuver.dto';
import { NumericInput } from '../shared/inputs/NumericInput';
import SelectManeuverTable from '../shared/selects/SelectManeuverTable';

const AbsoluteManeuverView: FC = () => {
  const { showError } = useError();

  const [roll, setRoll] = useState<number | null>(null);
  const [result, setResult] = useState<AbsoluteManeuverResult | null>(null);
  const [unusualEvent, setUnusualEvent] = useState<boolean>(false);
  const [table, setTable] = useState<string | null>(null);
  const [tables, setTables] = useState<string[]>([]);

  useEffect(() => {
    fetchAbsoluteManeuverTables()
      .then((data) => setTables(data))
      .catch((err) => showError(err));
  }, []);

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
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Grid size={12}>
          <SelectManeuverTable
            value={table}
            label={t('maneuver-table')}
            tables={tables}
            onChange={(value) => setTable(value)}
          />
        </Grid>
        <Grid size={12}>
          <NumericInput label={t('roll')} value={roll} onChange={(e) => setRoll(e)} integer />
        </Grid>
        <Grid size={12}>
          <FormControlLabel
            control={<Checkbox checked={unusualEvent} onChange={(e) => setUnusualEvent(e.target.checked)} />}
            label={t('unusual-event')}
          />
        </Grid>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        {result && (
          <Paper sx={{ p: 2 }}>
            <Grid size={{ xs: 12, md: 12 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                {t(result.result)}
              </Typography>
              <Typography variant="body1" color="secondary" gutterBottom>
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
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default AbsoluteManeuverView;
