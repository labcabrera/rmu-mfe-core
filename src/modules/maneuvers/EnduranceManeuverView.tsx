import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Checkbox, FormControlLabel, Grid, Paper, Typography } from '@mui/material';
import {
  EnduranceManeuverResult,
  fetchEnduranceManeuver,
  OPEN_D100,
  RollField,
  Section,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';

const EnduranceManeuverView: FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();

  const [roll, setRoll] = useState<number | null>(null);
  const [result, setResult] = useState<EnduranceManeuverResult | null>(null);
  const [unusualEvent, setUnusualEvent] = useState<boolean>(false);

  useEffect(() => {
    if (roll !== null) {
      fetchEnduranceManeuver(roll, unusualEvent, auth)
        .then((data) => setResult(data))
        .catch((err) => notify.error(err));
    } else {
      setResult(null);
    }
  }, [roll]);

  return (
    <Section>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <RollField spec={OPEN_D100} value={roll} onChange={(value) => setRoll(value.total)} />
            </Grid>
            <Grid size={12}>
              <FormControlLabel
                control={<Checkbox checked={unusualEvent} onChange={(e) => setUnusualEvent(e.target.checked)} />}
                label={t('unusual-event')}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
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
                  <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                    {t('fatigue')}: {result.fatigue}
                  </Typography>
                )}
                {result.hitPoints !== undefined && result.hitPoints !== 0 && (
                  <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                    {t('hit-points')}: {result.hitPoints}
                  </Typography>
                )}
                {result.bonus !== undefined && result.bonus !== 0 && (
                  <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                    {t('bonus')}: {result.bonus}
                  </Typography>
                )}
              </Grid>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Section>
  );
};

export default EnduranceManeuverView;
