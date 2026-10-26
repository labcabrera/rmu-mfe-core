import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { alpha, Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { AbsoluteManeuverTable, translated } from '@labcabrera-rmu/rmu-react-shared-lib';
import { resultColor } from './shared/maneuver-colors';

const rangeText = (min: number | null, max: number | null) => {
  if (min === null) return `< ${max}`;
  if (max === null) return `${min}+`;
  return `${min} - ${max}`;
};

/** The absolute maneuver table, each row in the color of its result and the row of the current total marked. */
const AbsoluteManeuverTableView: FC<{ table: AbsoluteManeuverTable; total: number | null }> = ({ table, total }) => {
  const { t, i18n } = useTranslation();
  // The last row (absolute success) has no min and an infinite max, which arrives as null: it starts after the
  // previous row.
  const rows = table.table.map((entry, index) => ({
    entry,
    min: entry.min ?? (index > 0 && table.table[index - 1].max !== null ? table.table[index - 1].max! + 1 : null),
    max: entry.max,
  }));
  const current = (min: number | null, max: number | null) =>
    total !== null && (min === null || total >= min) && (max === null || total <= max);

  return (
    <Box>
      <Table size="small" aria-label={t('maneuver-table')}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: { sm: 90 } }}>{t('roll')}</TableCell>
            <TableCell sx={{ width: { sm: 150 } }}>{t('result')}</TableCell>
            <TableCell>{t('description')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ entry, min, max }) => {
            const color = resultColor(entry.result.result);
            const selected = current(min, max);
            return (
              <TableRow
                key={`${min}-${max}`}
                selected={selected}
                sx={{
                  boxShadow: (theme) => `inset 3px 0 0 ${theme.palette[color].main}`,
                  ...(selected && { bgcolor: (theme) => `${alpha(theme.palette[color].main, 0.16)} !important` }),
                }}
              >
                <TableCell sx={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                  {rangeText(min, max)}
                </TableCell>
                <TableCell sx={{ color: `${color}.main`, fontWeight: selected ? 700 : 500 }}>
                  {t(entry.result.result)}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color={selected ? 'text.primary' : 'text.secondary'}>
                    {translated(entry.result.message, entry.result.messageTranslations, i18n.language)}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {table.unusualEvent && (
        <Typography variant="caption" color="text.secondary" component="div" sx={{ mt: 1 }}>
          {`${t('unusual-event')}: ${translated(table.unusualEvent, table.unusualEventTranslations, i18n.language)}`}
        </Typography>
      )}
    </Box>
  );
};

export default AbsoluteManeuverTableView;
