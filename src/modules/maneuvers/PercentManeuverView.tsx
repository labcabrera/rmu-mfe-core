import React, { FC, useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../ErrorContext';
import { fetchPercentManeuver } from '../api/maneuver';
import { ManeuverDifficulty, PercentManeuverResult } from '../api/maneuver.dto';
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
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Grid size={12}>
          <SelectDifficulty label={t('difficulty')} value={difficulty?.id || 'm'} onChange={(e) => setDifficulty(e)} />
        </Grid>
        <Grid size={12}>
          <NumericInput label={t('roll')} value={roll} onChange={(e) => setRoll(e)} integer />
        </Grid>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        {result && (
          <Paper sx={{ p: 2 }}>
            <Grid size={{ xs: 12, md: 12 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                {t(result.message)}
              </Typography>
              <Typography variant="body1" color="secondary" gutterBottom>
                Total roll: {totalRoll}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Percent: {result.percent}%
              </Typography>
              {result.critical && <Typography variant="body1">Critical: {result.critical}</Typography>}
            </Grid>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default PercentManeuverView;
