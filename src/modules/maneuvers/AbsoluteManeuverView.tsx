import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Checkbox, FormControlLabel, Grid, Stack, Typography } from '@mui/material';
import {
  AbsoluteManeuverResult,
  AbsoluteManeuverTable,
  DifficultyPicker,
  fetchAbsoluteManeuver,
  fetchAbsoluteManeuverTable,
  fetchAbsoluteManeuverTables,
  LoadingState,
  MANEUVER_DIFFICULTIES,
  NumericInput,
  OPEN_D100,
  RollField,
  Section,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectManeuverTable from '../shared/selects/SelectManeuverTable';
import AbsoluteManeuverTableView from './AbsoluteManeuverTableView';
import ManeuverResultCard from './shared/ManeuverResultCard';
import ManeuverTotal from './shared/ManeuverTotal';
import { resultColor } from './shared/maneuver-colors';
import { ManeuverTabProps } from './shared/maneuver-tab';

const AbsoluteManeuverView: FC<ManeuverTabProps> = ({
  difficulty,
  onDifficultyChange,
  guide,
  resultTable,
  skillModifiers,
  modifiersPanel,
}) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();

  const [roll, setRoll] = useState<number | null>(null);
  const [modifier, setModifier] = useState<number>(0);
  const [result, setResult] = useState<AbsoluteManeuverResult | null>(null);
  const [unusualEvent, setUnusualEvent] = useState<boolean>(false);
  const [tableName, setTableName] = useState<string>(resultTable ?? 'generic');
  const [tableNames, setTableNames] = useState<string[]>([]);
  const [table, setTable] = useState<AbsoluteManeuverTable>();

  const difficultyValue = MANEUVER_DIFFICULTIES.find((each) => each.key === difficulty)?.value ?? 0;
  const parts = [
    { label: t(`difficulty-${difficulty}`), value: difficultyValue },
    { label: t('skill-modifiers'), value: skillModifiers },
    { label: t('modifier'), value: modifier },
  ];
  const total = roll === null ? null : roll + difficultyValue + skillModifiers + modifier;

  useEffect(() => {
    fetchAbsoluteManeuverTables(auth)
      .then((data) => setTableNames(data))
      .catch((err) => notify.error(err));
  }, []);

  // The skill's profile chooses the table; the user can still change it.
  useEffect(() => {
    if (resultTable) setTableName(resultTable);
  }, [resultTable]);

  useEffect(() => {
    fetchAbsoluteManeuverTable(tableName, auth)
      .then((data) => setTable(data))
      .catch((err: Error) => notify.error(err));
  }, [tableName]);

  useEffect(() => {
    if (total === null) {
      setResult(null);
      return;
    }
    fetchAbsoluteManeuver(total, tableName, unusualEvent, auth)
      .then((data) => setResult(data))
      .catch((err: Error) => notify.error(err));
  }, [total, unusualEvent, tableName]);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 5 }}>
        <Stack spacing={2}>
          <Section>
            <Stack spacing={2}>
              <SelectManeuverTable
                value={tableName}
                label={t('maneuver-table')}
                tables={tableNames}
                onChange={(value) => setTableName(value ?? 'generic')}
              />
              <DifficultyPicker value={difficulty} onChange={onDifficultyChange} guide={guide} />
            </Stack>
          </Section>
          {modifiersPanel}
          <Section>
            <Stack spacing={2}>
              <NumericInput
                label={t('modifier')}
                value={modifier}
                onChange={(e) => setModifier(e || 0)}
                integer
                min={-1000}
                max={1000}
              />
              <RollField spec={OPEN_D100} value={roll} onChange={(value) => setRoll(value.total)} />
              <FormControlLabel
                control={<Checkbox checked={unusualEvent} onChange={(e) => setUnusualEvent(e.target.checked)} />}
                label={t('unusual-event')}
              />
            </Stack>
          </Section>
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 7 }}>
        <Section>
          <Stack spacing={2}>
            <ManeuverTotal roll={roll} parts={parts} />
            {result ? (
              <ManeuverResultCard title={t(result.result)} color={resultColor(result.result)} message={result.message}>
                {!!result.penaltyUntilAbsoluteSuccess && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {`${t('penalty-until-absolute-success')}: ${result.penaltyUntilAbsoluteSuccess}`}
                  </Typography>
                )}
                {!!result.bonusUntilAbsoluteFailure && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {`${t('bonus-until-absolute-failure')}: ${result.bonusUntilAbsoluteFailure}`}
                  </Typography>
                )}
              </ManeuverResultCard>
            ) : (
              <Typography variant="body2" color="text.secondary">
                {t('maneuver-roll-hint')}
              </Typography>
            )}
            {table ? <AbsoluteManeuverTableView table={table} total={total} /> : <LoadingState />}
          </Stack>
        </Section>
      </Grid>
    </Grid>
  );
};

export default AbsoluteManeuverView;
