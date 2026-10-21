import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Chip, Tooltip } from '@mui/material';

/** Roman numeral of a trait tier (I to X; larger tiers as digits). */
export const romanNumeral = (value: number) =>
  ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][value - 1] ?? `${value}`;

/**
 * The stats of a skill or a skill category as small chips (`AG`, `QU`), with the full name as a tooltip, and the
 * realm bonus as one chip with its count. `inline` renders spans, to place them inside text (group headers).
 */
const StatChips: FC<{
  stats?: string[] | null;
  realmBonus?: number | null;
  inline?: boolean;
}> = ({ stats, realmBonus, inline = false }) => {
  const { t } = useTranslation();
  const items = [
    ...(stats ?? []).map((stat) => ({ key: stat, label: stat.toUpperCase(), hint: t(stat) })),
    ...(realmBonus && realmBonus > 0
      ? [{ key: 'realm', label: realmBonus > 1 ? `${t('realm')} ×${realmBonus}` : t('realm'), hint: t('realm-stat') }]
      : []),
  ];
  if (items.length === 0) return null;
  if (inline) {
    return (
      <>
        {items.map((item) => (
          <Tooltip key={item.key} title={item.hint}>
            <Box
              component="span"
              sx={{
                px: 0.75,
                py: 0.125,
                borderRadius: 1,
                border: 1,
                borderColor: 'divider',
                fontSize: '0.7rem',
                fontWeight: 600,
                lineHeight: 1.6,
                letterSpacing: '0.04em',
              }}
            >
              {item.label}
            </Box>
          </Tooltip>
        ))}
      </>
    );
  }
  return (
    <>
      {items.map((item) => (
        <Tooltip key={item.key} title={item.hint}>
          <Chip size="small" variant="outlined" label={item.label} sx={{ height: 22, fontWeight: 600 }} />
        </Tooltip>
      ))}
    </>
  );
};

export default StatChips;
