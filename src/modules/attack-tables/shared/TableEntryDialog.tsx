import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Chip, Stack, Typography } from '@mui/material';
import {
  ChipRow,
  DataTable,
  DataTableColumn,
  EmptyState,
  RmuDialog,
  SectionLabel,
  TableEffect,
  TableInjury,
  TechnicalInfo,
  useTableText,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { rollBand } from './table-labels';

/** The row of a critical or fumble table, as the API serves it. */
type TableEntry = {
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
  // Workspace spec 086: the English text of a table entry, translated when there is one
  const tableText = useTableText();
  if (!entry) return null;
  const effects = entry.effects ?? [];
  const summary: [string, string][] = [[t('roll'), rollBand(entry.rollMin, entry.rollMax)]];
  if (entry.location !== undefined) summary.push([t('location'), entry.location ? t(entry.location) : '-']);
  if (entry.dmg !== undefined) summary.push([t('hits'), `+${entry.dmg}`]);

  const effectColumns: DataTableColumn<TableEffect>[] = [
    {
      key: 'status',
      header: t('combat-tables-status'),
      render: (effect) => (
        <>
          <Typography variant="body2">{t(effect.status)}</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            {effect.status}
          </Typography>
        </>
      ),
    },
    {
      key: 'fields',
      header: t('combat-tables-fields'),
      render: (effect) => (
        <ChipRow sx={{ gap: 0.5 }}>
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
        </ChipRow>
      ),
    },
  ];

  return (
    <RmuDialog open title={title} maxWidth="md" onClose={onClose}>
      <Stack spacing={2}>
        <ChipRow>
          {summary.map(([label, value]) => (
            <Chip key={label} label={`${label}: ${value}`} variant="outlined" />
          ))}
        </ChipRow>
        <Typography>{tableText(entry.message ?? entry.text)}</Typography>

        <Box>
          <SectionLabel>{t('effects')}</SectionLabel>
          <DataTable
            columns={effectColumns}
            rows={effects}
            getKey={(effect) => `${effects.indexOf(effect)}`}
            emptyTitle={t('combat-tables-no-effects')}
          />
        </Box>

        {entry.injury !== undefined && (
          <Box>
            <SectionLabel>{t('combat-tables-injury')}</SectionLabel>
            {entry.injury?.type ? (
              <ChipRow sx={{ gap: 0.5 }}>
                <Chip size="small" color="primary" label={t(`injury-type-${entry.injury.type}`)} />
                {(entry.injury.secondary ?? []).map((type) => (
                  <Chip key={type} size="small" variant="outlined" label={t(`injury-type-${type}`)} />
                ))}
                {(entry.injury.flags ?? []).map((flag) => (
                  <Chip key={flag} size="small" color="warning" label={t(`injury-flag-${flag}`)} />
                ))}
              </ChipRow>
            ) : (
              <EmptyState dense title={t('combat-tables-no-injury')} />
            )}
          </Box>
        )}

        <TechnicalInfo>
          <pre>{JSON.stringify(entry, null, 2)}</pre>
        </TechnicalInfo>
      </Stack>
    </RmuDialog>
  );
};

export default TableEntryDialog;
