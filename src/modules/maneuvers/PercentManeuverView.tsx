import React, { FC, useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../ErrorContext';
import { fetchPercentManeuver, ManeuverDifficulty, PercentManeuverResult } from '../api/maneuver';
import { NumericInput } from '../shared/inputs/NumericInput';
import SelectDifficulty from '../shared/selects/SelectDifficulty';

const PercentManeuverView: FC = () => {
  const { showError } = useError();
  const [roll, setRoll] = useState<number | null>(null);
  const [totalRoll, setTotalRoll] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<ManeuverDifficulty>({ id: 'm', modifier: 0 });
  const [result, setResult] = useState<PercentManeuverResult | null>(null);

  useEffect(() => {
    if (roll !== null && roll !== undefined) {
      const totalRoll = roll + (difficulty ? difficulty.modifier : 0);
      setTotalRoll(totalRoll);
      fetchPercentManeuver(totalRoll)
        .then((data) => setResult(data))
        .catch((err) => showError(err));
    } else {
      setResult(null);
    }
  }, [roll, difficulty, showError]);

  return (
    <Paper sx={{ p: 1, m: 1 }}>
      <Grid container spacing={1}>
        <Grid size={12}>
          <Typography variant="h6" color="primary" gutterBottom>
            {t('percent-maneuver')}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <NumericInput label={t('roll')} value={roll} onChange={(e) => setRoll(e)} integer />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <SelectDifficulty label={t('difficulty')} value={difficulty?.id || 'm'} onChange={(e) => setDifficulty(e)} />
        </Grid>

        {result && (
          <Grid size={{ xs: 12, md: 12 }}>
            <Typography variant="body1" color="primary" gutterBottom>
              {t(result.message)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total roll: {totalRoll}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Percent: {result.percent}%
            </Typography>
            {result.critical && <Typography variant="body1">Critical: {result.critical}</Typography>}
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default PercentManeuverView;
