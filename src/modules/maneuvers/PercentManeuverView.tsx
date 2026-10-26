import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Grid, LinearProgress, Stack, Typography } from '@mui/material';
import {
  DifficultyPicker,
  fetchPercentManeuver,
  MANEUVER_DIFFICULTIES,
  NumericInput,
  OPEN_D100,
  PercentManeuverResult,
  RollField,
  Section,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import ManeuverResultCard from './shared/ManeuverResultCard';
import ManeuverTotal from './shared/ManeuverTotal';
import { percentColor } from './shared/maneuver-colors';
import { ManeuverTabProps } from './shared/maneuver-tab';

const PercentManeuverView: FC<ManeuverTabProps> = ({
  difficulty,
  onDifficultyChange,
  guide,
  skillModifiers,
  modifiersPanel,
}) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [roll, setRoll] = useState<number | null>(null);
  const [modifier, setModifier] = useState<number>(0);
  const [result, setResult] = useState<PercentManeuverResult | null>(null);

  const difficultyValue = MANEUVER_DIFFICULTIES.find((each) => each.key === difficulty)?.value ?? 0;
  const parts = [
    { label: t(`difficulty-${difficulty}`), value: difficultyValue },
    { label: t('skill-modifiers'), value: skillModifiers },
    { label: t('modifier'), value: modifier },
  ];
  const total = roll === null ? null : roll + difficultyValue + skillModifiers + modifier;

  useEffect(() => {
    if (total === null) {
      setResult(null);
      return;
    }
    fetchPercentManeuver(total, auth)
      .then((data) => setResult(data))
      .catch((err) => notify.error(err));
  }, [total]);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 5 }}>
        <Stack spacing={2}>
          <Section>
            <DifficultyPicker value={difficulty} onChange={onDifficultyChange} guide={guide} />
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
            </Stack>
          </Section>
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, md: 7 }}>
        <Section>
          <Stack spacing={2}>
            <ManeuverTotal roll={roll} parts={parts} />
            {result ? (
              <ManeuverResultCard
                title={`${result.percent}%`}
                color={percentColor(result.percent)}
                message={t(result.message)}
              >
                <LinearProgress
                  variant="determinate"
                  value={Math.max(0, Math.min(100, result.percent))}
                  color={percentColor(result.percent)}
                  sx={{ mt: 1.5, height: 8, borderRadius: 4 }}
                />
                {result.critical && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {`${t('critical')}: ${result.critical}`}
                  </Typography>
                )}
              </ManeuverResultCard>
            ) : (
              <Typography variant="body2" color="text.secondary">
                {t('maneuver-roll-hint')}
              </Typography>
            )}
          </Stack>
        </Section>
      </Grid>
    </Grid>
  );
};

export default PercentManeuverView;
