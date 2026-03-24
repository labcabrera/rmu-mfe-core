import React, { FC, useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, Paper, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../ErrorContext';
import { fetchAbsoluteManeuver, fetchAbsoluteManeuverTable, fetchAbsoluteManeuverTables } from '../api/maneuver';
import { AbsoluteManeuverResult, AbsoluteManeuverTable } from '../api/maneuver.dto';
import { openEndedRoll } from '../services/random-service';
import { NumericInput } from '../shared/inputs/NumericInput';
import SelectManeuverTable from '../shared/selects/SelectManeuverTable';
import AbsoluteManeuverTableView from './AbsoluteManeuverTableView';

const AbsoluteManeuverView: FC = () => {
  const { showError } = useError();

  const [roll, setRoll] = useState<number | null>(null);
  const [modifier, setModifier] = useState<number>(0);
  const [totalRoll, setTotalRoll] = useState<number | null>(null);
  const [result, setResult] = useState<AbsoluteManeuverResult | null>(null);
  const [unusualEvent, setUnusualEvent] = useState<boolean>(false);
  const [tableName, setTableName] = useState<string>('generic');
  const [tableNames, setTableNames] = useState<string[]>([]);
  const [table, setTable] = useState<AbsoluteManeuverTable>();

  useEffect(() => {
    fetchAbsoluteManeuverTables()
      .then((data) => setTableNames(data))
      .catch((err: Error) => showError(err.message));
  }, []);

  useEffect(() => {
    setTotalRoll(roll !== null ? roll + modifier : null);
  }, [roll, modifier]);

  useEffect(() => {
    if (tableName) {
      fetchAbsoluteManeuverTable(tableName)
        .then((data) => setTable(data))
        .catch((err: Error) => showError(err.message));
    } else {
      setTable(undefined);
    }
  }, [tableName]);

  useEffect(() => {
    if (totalRoll !== null) {
      fetchAbsoluteManeuver(totalRoll, tableName, unusualEvent)
        .then((data) => setResult(data))
        .catch((err: Error) => showError(err.message));
    } else {
      setResult(null);
    }
  }, [totalRoll, unusualEvent, tableName, showError]);

  if (!table) return <p>Loading...</p>;

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Grid container spacing={1}>
          <Grid size={12}>
            <SelectManeuverTable
              value={tableName}
              label={t('maneuver-table')}
              tables={tableNames}
              onChange={(value) => setTableName(value ?? 'generic')}
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
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        {table && <AbsoluteManeuverTableView table={table} result={result?.result} />}
        {result && (
          <Paper sx={{ p: 2, mt: 2 }}>
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
