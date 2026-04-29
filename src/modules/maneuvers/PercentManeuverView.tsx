import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Button, Grid, Paper, Typography } from '@mui/material';
import {
  fetchPercentManeuver,
  KeyValue,
  NumericInput,
  PercentManeuverResult,
  SelectDifficulty,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../ErrorContext';
import { openEndedRoll } from '../services/random-service';

const PercentManeuverView: FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const [roll, setRoll] = useState<number | null>(null);
  const [modifier, setModifier] = useState<number>(0);
  const [totalRoll, setTotalRoll] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<KeyValue>({ key: 'm', value: 0 });
  const [result, setResult] = useState<PercentManeuverResult | null>(null);

  useEffect(() => {
    if (roll !== null && roll !== undefined) {
      const totalRoll = roll + (difficulty?.value || 0) + modifier;
      setTotalRoll(totalRoll);
      fetchPercentManeuver(totalRoll, auth)
        .then((data) => setResult(data))
        .catch((err) => showError(err));
    } else {
      setResult(null);
    }
  }, [roll, difficulty, modifier]);

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container>
        <Grid size={{ xs: 12, md: 4 }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <SelectDifficulty
                label={t('difficulty')}
                value={difficulty?.key || 'm'}
                onChange={(e) => setDifficulty(e)}
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
              <NumericInput label={t('roll')} value={roll} onChange={(e) => setRoll(e)} integer />
            </Grid>
            <Grid size={12} sx={{ mt: 1 }}>
              <Button variant="contained" color="primary" onClick={() => setRoll(openEndedRoll())}>
                {t('Random')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          {result && (
            <Paper sx={{ p: 2 }}>
              <Grid size={{ xs: 12, md: 12 }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  {t(result.message)}
                </Typography>
                <Typography variant="body1" color="secondary" gutterBottom>
                  {t('roll-total')}: {totalRoll}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {t('percent')}: {result.percent}%
                </Typography>
                {result.critical && <Typography variant="body1">Critical: {result.critical}</Typography>}
              </Grid>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PercentManeuverView;
