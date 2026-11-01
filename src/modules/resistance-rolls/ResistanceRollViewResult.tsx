import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import { alpha, Box, Divider, Stack, Typography } from '@mui/material';
import {
  bonusColor,
  formatBonus,
  ResistanceRollResult,
  SectionLabel,
  StatPill,
} from '@labcabrera-rmu/rmu-react-shared-lib';

/** Total the roll must reach to resist; below it, the failure is the difference. */
const RESIST_AT = 50;

/** Degrees of the result by failure, as the API grades them, with their theme color. */
const BANDS = [
  { key: 'success', range: '0', color: 'success.main' },
  { key: 'mild-failure', range: '1–25', color: 'warning.light' },
  { key: 'moderate-failure', range: '26–50', color: 'warning.main' },
  { key: 'severe-failure', range: '51–100', color: 'error.main' },
  { key: 'extreme-failure', range: '101+', color: 'error.dark' },
] as const;

/** Grade of the result, the scale of grades with the current one marked, and the breakdown of the total. */
const ResistanceRollViewResult: FC<{ result: ResistanceRollResult | undefined }> = ({ result }) => {
  const { t } = useTranslation();

  if (!result) {
    return (
      <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center', py: 4, color: 'text.secondary' }}>
        <CasinoOutlinedIcon sx={{ fontSize: 48 }} />
        <Typography>{t('resistance-roll-empty')}</Typography>
      </Stack>
    );
  }

  const band = BANDS.find((each) => each.key === result.result) ?? BANDS[BANDS.length - 1];
  const resisted = result.failure <= 0;

  return (
    <Stack spacing={2.5}>
      <Box
        role="status"
        sx={(theme) => ({
          p: 2,
          borderRadius: `${theme.radius.md}px`,
          borderLeft: 4,
          borderColor: band.color,
          bgcolor: alpha(theme.palette.text.primary, 0.04),
        })}
      >
        <Typography variant="h4" component="p" sx={{ color: band.color }}>
          {t(result.result)}
        </Typography>
        <Typography color="text.secondary">
          {resisted
            ? t('resistance-roll-resisted', { total: RESIST_AT })
            : t('resistance-roll-failed', { failure: result.failure })}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
        <StatPill label={t('total-roll')} value={result.totalRoll} />
        <StatPill label={t('resistance-roll-needed')} value={RESIST_AT} />
        <StatPill label={t('failure')} value={result.failure} />
      </Stack>

      <Box>
        <SectionLabel>{t('resistance-roll-bands')}</SectionLabel>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(5, minmax(0, 1fr))' }, gap: 0.5 }}>
          {BANDS.map((each) => {
            const current = each.key === band.key;
            return (
              <Box
                key={each.key}
                aria-current={current || undefined}
                sx={(theme) => ({
                  px: 1,
                  py: 0.75,
                  borderRadius: `${theme.radius.sm}px`,
                  borderTop: 3,
                  borderColor: each.color,
                  bgcolor: current ? alpha(theme.palette.text.primary, 0.1) : 'transparent',
                  opacity: current ? 1 : 0.6,
                })}
              >
                <Typography variant="body2" sx={{ fontWeight: current ? 600 : 400 }}>
                  {t(each.key)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {each.range}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box>
        <SectionLabel>{t('modifiers')}</SectionLabel>
        <Stack divider={<Divider flexItem />} spacing={0.75}>
          {result.modifiers.map((modifier) => (
            <Stack key={modifier.key} direction="row" sx={{ justifyContent: 'space-between' }}>
              <Typography>{t(modifier.key)}</Typography>
              <Typography sx={{ color: bonusColor(modifier.value), fontVariantNumeric: 'tabular-nums' }}>
                {formatBonus(modifier.value)}
              </Typography>
            </Stack>
          ))}
          <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 600 }}>{t('total')}</Typography>
            <Typography sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{result.totalRoll}</Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ResistanceRollViewResult;
