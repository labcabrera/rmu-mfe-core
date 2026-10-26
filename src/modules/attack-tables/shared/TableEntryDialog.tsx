import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { TableEffect, TableInjury, TechnicalInfo } from '@labcabrera-rmu/rmu-react-shared-lib';
import { rollBand } from './table-labels';

/** The row of a critical or fumble table, as the API serves it. */
export type TableEntry = {
  rollMin: number;
  rollMax: number;
  dmg?: number;
  location?: string | null;
  message?: string;
  text?: string;
  effects?: TableEffect[];
  injury?: TableInjury | null;
};

const fieldValue = (value: unknown): string => (typeof value === 'object' ? JSON.stringify(value) : String(value));

/** The technical model of a critical or fumble row: band, location, hits, every field of its effects and the injury. */
const TableEntryDialog: FC<{ title: string; entry: TableEntry | undefined; onClose: () => void }> = ({
  title,
  entry,
  onClose,
}) => {
  const { t } = useTranslation();
  if (!entry) return null;
  const effects = entry.effects ?? [];
  const summary: [string, string][] = [[t('roll'), rollBand(entry.rollMin, entry.rollMax)]];
  if (entry.location !== undefined) summary.push([t('location'), entry.location ? t(entry.location) : '-']);
  if (entry.dmg !== undefined) summary.push([t('hits'), `+${entry.dmg}`]);

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
            {summary.map(([label, value]) => (
              <Chip key={label} label={`${label}: ${value}`} variant="outlined" />
            ))}
          </Stack>
          <Typography>{entry.message ?? entry.text}</Typography>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              {t('effects')}
            </Typography>
            {effects.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                {t('combat-tables-no-effects')}
              </Typography>
            ) : (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{t('combat-tables-status')}</TableCell>
                    <TableCell>{t('combat-tables-fields')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {effects.map((effect, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body2">{t(effect.status)}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                          {effect.status}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
                          {Object.entries(effect)
                            .filter(([field]) => field !== 'status')
                            .map(([field, value]) => (
                              <Chip
                                key={field}
                                size="small"
                                label={`${field}: ${fieldValue(value)}`}
                                sx={{ fontFamily: 'monospace' }}
                              />
                            ))}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>

          {entry.injury !== undefined && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                {t('combat-tables-injury')}
              </Typography>
              {entry.injury?.type ? (
                <Stack direction="row" spacing={0.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
                  <Chip size="small" color="primary" label={t(`injury-type-${entry.injury.type}`)} />
                  {(entry.injury.secondary ?? []).map((type) => (
                    <Chip key={type} size="small" variant="outlined" label={t(`injury-type-${type}`)} />
                  ))}
                  {(entry.injury.flags ?? []).map((flag) => (
                    <Chip key={flag} size="small" color="warning" label={t(`injury-flag-${flag}`)} />
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {t('combat-tables-no-injury')}
                </Typography>
              )}
            </Box>
          )}

          <TechnicalInfo>
            <pre>{JSON.stringify(entry, null, 2)}</pre>
          </TechnicalInfo>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('close')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TableEntryDialog;
