import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Button, Checkbox, FormControlLabel, Grid, Paper, Typography } from '@mui/material';
import {
  AbsoluteManeuverResult,
  AbsoluteManeuverTable,
  fetchAbsoluteManeuver,
  fetchAbsoluteManeuverTable,
  fetchAbsoluteManeuverTables,
  LoadingState,
  NumericInput,
  OpenEndedRollDialog,
  Section,
  TechnicalInfo,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectManeuverTable from '../shared/selects/SelectManeuverTable';
import AbsoluteManeuverTableView from './AbsoluteManeuverTableView';

export default function AbsoluteManeuverView() {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();

  const [rollDialogOpen, setRollDialogOpen] = useState<boolean>(false);
  const [roll, setRoll] = useState<number | null>(null);
  const [modifier, setModifier] = useState<number>(0);
  const [totalRoll, setTotalRoll] = useState<number | null>(null);
  const [result, setResult] = useState<AbsoluteManeuverResult | null>(null);
  const [unusualEvent, setUnusualEvent] = useState<boolean>(false);
  const [tableName, setTableName] = useState<string>('generic');
  const [tableNames, setTableNames] = useState<string[]>([]);
  const [table, setTable] = useState<AbsoluteManeuverTable>();

  useEffect(() => {
    fetchAbsoluteManeuverTables(auth)
      .then((data) => setTableNames(data))
      .catch((err) => notify.error(err));
  }, []);

  useEffect(() => {
    setTotalRoll(roll !== null ? roll + modifier : null);
  }, [roll, modifier]);

  useEffect(() => {
    if (tableName) {
      fetchAbsoluteManeuverTable(tableName, auth)
        .then((data) => setTable(data))
        .catch((err: Error) => notify.error(err));
    } else {
      setTable(undefined);
    }
  }, [tableName]);

  useEffect(() => {
    if (totalRoll !== null) {
      fetchAbsoluteManeuver(totalRoll, tableName, unusualEvent, auth)
        .then((data) => setResult(data))
        .catch((err: Error) => notify.error(err));
    } else {
      setResult(null);
    }
  }, [totalRoll, unusualEvent, tableName]);

  if (!table) return <LoadingState />;

  return (
    <Section>
      <Grid container spacing={1} sx={{ p: 1 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Grid container spacing={1} sx={{ p: 2 }}>
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
                label={t('modifier')}
                value={modifier}
                onChange={(e) => setModifier(e || 0)}
                integer
                min={-1000}
                max={1000}
              />
            </Grid>
            <Grid size={12}>
              <NumericInput
                label={t('roll')}
                value={roll}
                onChange={(e) => setRoll(e)}
                integer
                min={-1000}
                max={1000}
              />
            </Grid>
            <Grid size={12}>
              <FormControlLabel
                control={<Checkbox checked={unusualEvent} onChange={(e) => setUnusualEvent(e.target.checked)} />}
                label={t('unusual-event')}
              />
            </Grid>
            <Grid size={12}>
              <Button variant="contained" color="primary" onClick={() => setRollDialogOpen(true)}>
                {t('roll')}
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
                    {t('penalty-until-absolute-success')}: {result.penaltyUntilAbsoluteSuccess}
                  </Typography>
                )}
                {result.bonusUntilAbsoluteFailure && (
                  <Typography variant="body1" gutterBottom>
                    {t('bonus-until-absolute-failure')}: {result.bonusUntilAbsoluteFailure}
                  </Typography>
                )}
              </Grid>
            </Paper>
          )}
          <TechnicalInfo>
            <pre>{JSON.stringify({ tableNames }, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
      <OpenEndedRollDialog
        open={rollDialogOpen}
        title={t('absolute-maneuver')}
        onClose={() => setRollDialogOpen(false)}
        onConfirm={(v) => {
          setRoll(v);
          setRollDialogOpen(false);
        }}
      />
    </Section>
  );
}
