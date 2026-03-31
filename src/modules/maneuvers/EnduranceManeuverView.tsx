import React, { FC, useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, Grid, Paper, Typography } from '@mui/material';
import { NumericInput } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../ErrorContext';
import { fetchEnduranceManeuver } from '../api/maneuver';
import { EnduranceManeuverResult } from '../api/maneuver.dto';

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
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 4 }}>
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
            <Grid size={12}>
              <Typography variant="h6" color="primary" gutterBottom>
                {t(result.result)}
              </Typography>
              <Typography variant="body1" color="secondary" gutterBottom>
                {result.message}
              </Typography>
              {result.fatigue !== undefined && (
                <Typography variant="body1" gutterBottom mt={2}>
                  Fatigue: {result.fatigue}
                </Typography>
              )}
              {result.hitPoints !== undefined && result.hitPoints !== 0 && (
                <Typography variant="body1" gutterBottom mt={2}>
                  Hit Points: {result.hitPoints}
                </Typography>
              )}
              {result.bonus !== undefined && result.bonus !== 0 && (
                <Typography variant="body1" gutterBottom mt={2}>
                  Bonus: {result.bonus}
                </Typography>
              )}
            </Grid>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default EnduranceManeuverView;
