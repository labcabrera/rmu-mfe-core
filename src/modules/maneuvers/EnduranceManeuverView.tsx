import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Box, Checkbox, Chip, FormControlLabel, Grid, Stack, Typography } from '@mui/material';
import {
  EnduranceManeuverResult,
  fetchEnduranceManeuver,
  formatBonus,
  OPEN_D100,
  RollField,
  Section,
  useNotify,
  translated,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import ManeuverResultCard from './shared/ManeuverResultCard';
import { resultColor } from './shared/maneuver-colors';

const EnduranceManeuverView: FC = () => {
  const auth = useAuth();
  const { t, i18n } = useTranslation();
  const notify = useNotify();

  const [roll, setRoll] = useState<number | null>(null);
  const [result, setResult] = useState<EnduranceManeuverResult | null>(null);
  const [unusualEvent, setUnusualEvent] = useState<boolean>(false);

  useEffect(() => {
    if (roll === null) {
      setResult(null);
      return;
    }
    fetchEnduranceManeuver(roll, unusualEvent, auth)
      .then((data) => setResult(data))
      .catch((err) => notify.error(err));
  }, [roll, unusualEvent]);

  const effects = result
    ? [
        ...(result.fatigue ? [`${t('fatigue')} ${formatBonus(result.fatigue)}`] : []),
        ...(result.hitPoints ? [`${t('hit-points')} ${formatBonus(result.hitPoints)}`] : []),
        ...(result.bonus ? [`${t('bonus')} ${formatBonus(result.bonus)}`] : []),
      ]
    : [];

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 5 }}>
        <Section>
          <Stack spacing={2}>
            <RollField spec={OPEN_D100} value={roll} onChange={(value) => setRoll(value.total)} />
            <FormControlLabel
              control={<Checkbox checked={unusualEvent} onChange={(e) => setUnusualEvent(e.target.checked)} />}
              label={t('unusual-event')}
            />
          </Stack>
        </Section>
      </Grid>
      <Grid size={{ xs: 12, md: 7 }}>
        <Section>
          {result ? (
            <ManeuverResultCard
              title={t(result.result)}
              color={resultColor(result.result)}
              message={translated(result.message, result.messageTranslations, i18n.language)}
            >
              {effects.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 1.5 }}>
                  {effects.map((effect) => (
                    <Chip key={effect} size="small" label={effect} />
                  ))}
                </Box>
              )}
            </ManeuverResultCard>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {t('maneuver-roll-hint')}
            </Typography>
          )}
        </Section>
      </Grid>
    </Grid>
  );
};

export default EnduranceManeuverView;
