import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Chip, Typography } from '@mui/material';
import { formatBonus } from '@labcabrera-rmu/rmu-react-shared-lib';

/** The total of the maneuver as a sum: roll + each modifier = total. Parts at 0 are left out (not the roll). */
const ManeuverTotal: FC<{ roll: number | null; parts: { label: string; value: number }[] }> = ({ roll, parts }) => {
  const { t } = useTranslation();
  const shown = parts.filter((part) => part.value !== 0);
  const total = roll === null ? null : roll + shown.reduce((sum, part) => sum + part.value, 0);
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 0.75 }} aria-label={t('total-roll')}>
      <Chip size="small" variant="outlined" label={`${t('roll')} ${roll ?? '—'}`} />
      {shown.map((part) => (
        <Chip
          key={part.label}
          size="small"
          variant="outlined"
          color={part.value < 0 ? 'error' : 'success'}
          label={`${part.label} ${formatBonus(part.value)}`}
        />
      ))}
      <Typography component="span" color="text.secondary">
        =
      </Typography>
      <Chip color="primary" label={`${t('total-roll')} ${total ?? '—'}`} sx={{ fontWeight: 700 }} />
    </Box>
  );
};

export default ManeuverTotal;
