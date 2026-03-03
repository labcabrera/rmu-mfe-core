import React, { FC, useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, Grid, Paper, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../ErrorContext';
import { EnduranceManeuverResult, fetchEnduranceManeuver } from '../api/maneuver';
import { NumericInput } from '../shared/inputs/NumericInput';

const EnduranceManeuverView: FC = () => {
  const { showError } = useError();

  const [roll, setRoll] = useState<number | null>(null);
  const [result, setResult] = useState<EnduranceManeuverResult | null>(null);
  const [unusualEvent, setUnusualEvent] = useState<boolean>(false);

  useEffect(() => {
    if (roll !== null) {
      fetchEnduranceManeuver(roll, unusualEvent)
        .then((data) => setResult(data))
        .catch((err) => showError(err));
    } else {
      setResult(null);
    }
  }, [roll, unusualEvent, showError]);

  return (
    <Paper sx={{ p: 1, m: 1 }}>
      <Grid container spacing={1}>
        <Grid size={12} mt={3}>
          <Typography variant="h6" color="primary" gutterBottom>
            {t('endurance-maneuver')}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <NumericInput label={t('roll')} value={roll} onChange={(e) => setRoll(e)} integer />
        </Grid>

        <Grid size={{ xs: 12, md: 12 }}>
          <FormControlLabel
            control={<Checkbox checked={unusualEvent} onChange={(e) => setUnusualEvent(e.target.checked)} />}
            label={t('unusual-event')}
          />
          {result && (
            <Grid size={12}>
              <Typography variant="body1" color="primary" gutterBottom>
                {t(result.result)}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {result.message}
              </Typography>
              {result.fatigue !== undefined && (
                <Typography variant="body1" gutterBottom>
                  Fatigue: {result.fatigue}
                </Typography>
              )}
              {result.hitPoints !== undefined && (
                <Typography variant="body1" gutterBottom>
                  Hit Points: {result.hitPoints}
                </Typography>
              )}
              {result.bonus !== undefined && (
                <Typography variant="body1" gutterBottom>
                  Bonus: {result.bonus}
                </Typography>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EnduranceManeuverView;
