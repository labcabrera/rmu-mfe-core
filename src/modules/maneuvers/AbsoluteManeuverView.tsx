import React, { FC, useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, Paper, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../ErrorContext';
import { fetchAbsoluteManeuver, fetchAbsoluteManeuverTables } from '../api/maneuver';
import { AbsoluteManeuverResult } from '../api/maneuver.dto';
import { openEndedRoll } from '../services/random-service';
import { NumericInput } from '../shared/inputs/NumericInput';
import SelectManeuverTable from '../shared/selects/SelectManeuverTable';

const AbsoluteManeuverView: FC = () => {
  const { showError } = useError();

  const [roll, setRoll] = useState<number | null>(null);
  const [modifier, setModifier] = useState<number>(0);
  const [totalRoll, setTotalRoll] = useState<number | null>(null);
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
    setTotalRoll(roll !== null ? roll + modifier : null);
  }, [roll, modifier]);

  useEffect(() => {
    if (totalRoll !== null) {
      fetchAbsoluteManeuver(totalRoll, table, unusualEvent)
        .then((data) => setResult(data))
        .catch((err) => showError(err));
    } else {
      setResult(null);
    }
  }, [totalRoll, unusualEvent, table, showError]);

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
          <NumericInput
            label={t('Modifier')}
            value={modifier}
            onChange={(e) => setModifier(e)}
            integer
            min={-1000}
            max={1000}
          />
        </Grid>
        <Grid size={12}>
          <NumericInput label={t('Roll')} value={roll} onChange={(e) => setRoll(e)} integer min={-1000} max={1000} />
        </Grid>
        <Grid size={12}>
          <FormControlLabel
            control={<Checkbox checked={unusualEvent} onChange={(e) => setUnusualEvent(e.target.checked)} />}
            label={t('Unusual Event')}
          />
        </Grid>
        <Grid size={12}>
          <Button variant="contained" color="primary" onClick={() => setRoll(openEndedRoll())}>
            {t('Random')}
          </Button>
        </Grid>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        {result && (
          <Paper sx={{ p: 2 }}>
            <Grid size={{ xs: 12, md: 12 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                {t(result.result)} {totalRoll !== null ? `(${totalRoll})` : ''}
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
