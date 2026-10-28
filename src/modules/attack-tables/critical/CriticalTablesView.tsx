import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  CRITICAL_SEVERITIES,
  CriticalSeverity,
  CriticalTableEntry,
  EnumPicker,
  fetchCriticalTable,
  fetchCriticalTypes,
  LayoutBase,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import CoreLawNotice from '../shared/CoreLawNotice';
import TableEntryDialog from '../shared/TableEntryDialog';
import { severityColor } from '../shared/severity-colors';
import { criticalTypeName, effectLabel, rollBand } from '../shared/table-labels';
import { useWholeTable } from '../shared/useWholeTable';

type Selected = { severity: CriticalSeverity; entry: CriticalTableEntry };

/**
 * Critical tables as the book prints them (spec 036): one row per roll band, one column per severity A-E, with the
 * summary of each result. A click opens the technical model of that result.
 */
const CriticalTablesView: FC = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const notify = useNotify();
  const [params, setParams] = useSearchParams();
  const type = params.get('type');
  const [types, setTypes] = useState<string[]>();
  const [selected, setSelected] = useState<Selected>();
  const whole = useWholeTable(type, fetchCriticalTable);

  useEffect(() => {
    fetchCriticalTypes(auth)
      .then((ids) => {
        setTypes(ids);
        if (!type && ids.length > 0) setParams({ type: ids.includes('S') ? 'S' : ids[0] }, { replace: true });
      })
      .catch((err) => notify.error(err));
  }, []);

  const table = whole.data && whole.data.type === type ? whole.data : undefined;
  const severities = CRITICAL_SEVERITIES.filter((severity) => table?.severities[severity]);
  // Every severity has the same bands and locations (checked in the 15 tables)
  const bands = table ? (table.severities[severities[0]] ?? []) : [];

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('attack-tables'), link: '/core/attack-tables' },
        { name: t('attack-tables-critical') },
      ]}
    >
      <Stack spacing={2}>
        <Box sx={{ maxWidth: 400 }}>
          <EnumPicker
            label={t('attack-tables-critical-type')}
            values={types ?? []}
            labelPrefix="critical-type-"
            kind="attack-table"
            value={type}
            onChange={(value) => value && setParams({ type: value }, { replace: true })}
            disabled={!types}
            helperText={types ? undefined : t('loading')}
            required
          />
        </Box>
        {whole.forbidden && <CoreLawNotice />}
        {whole.loading && <CircularProgress />}
        {table && (
          <TableContainer component={Paper} variant="outlined">
            <Table size="small" sx={{ tableLayout: 'fixed', minWidth: 900 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 70 }}>{t('roll')}</TableCell>
                  {severities.map((severity) => (
                    <TableCell key={severity} sx={{ borderTop: 4, borderTopColor: severityColor(severity) }}>
                      {severity}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {bands.map((band, index) => (
                  <TableRow key={band.rollMin}>
                    <TableCell sx={{ verticalAlign: 'top' }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {rollBand(band.rollMin, band.rollMax)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {band.location ? t(band.location) : ''}
                      </Typography>
                    </TableCell>
                    {severities.map((severity) => {
                      const entry = table.severities[severity]![index];
                      return (
                        <TableCell
                          key={severity}
                          onClick={() => setSelected({ severity, entry })}
                          sx={{ verticalAlign: 'top', cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            +{entry.dmg}
                          </Typography>
                          <Typography variant="body2">{entry.message}</Typography>
                          {(entry.effects ?? []).length > 0 && (
                            <Typography variant="caption" color="primary">
                              {(entry.effects ?? []).map((effect) => effectLabel(effect, t)).join(' · ')}
                            </Typography>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
      <TableEntryDialog
        title={
          selected && type
            ? `${criticalTypeName(type, t)} ${selected.severity} · ${rollBand(selected.entry.rollMin, selected.entry.rollMax)}`
            : ''
        }
        entry={selected?.entry}
        onClose={() => setSelected(undefined)}
      />
    </LayoutBase>
  );
};

export default CriticalTablesView;
