import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Chip, Stack, Typography } from '@mui/material';
import { CULTURE_DEVELOPMENT_COST_LIMIT } from './culture-skill-ranks';

/** Indicative development cost of a culture, with a warning above the limit. It never blocks. */
const CultureDevelopmentCost: FC<{ cost: number | undefined }> = ({ cost }) => {
  const { t } = useTranslation();
  if (cost === undefined || cost === null) return null;
  const exceeded = cost > CULTURE_DEVELOPMENT_COST_LIMIT;
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip
        size="small"
        color={exceeded ? 'warning' : 'default'}
        variant={exceeded ? 'filled' : 'outlined'}
        icon={exceeded ? <WarningAmberIcon /> : undefined}
        label={t('culture-development-cost-value', { cost })}
      />
      {exceeded && (
        <Typography variant="caption" color="warning.main">
          {t('culture-development-cost-warning', { limit: CULTURE_DEVELOPMENT_COST_LIMIT })}
        </Typography>
      )}
    </Stack>
  );
};

export default CultureDevelopmentCost;
