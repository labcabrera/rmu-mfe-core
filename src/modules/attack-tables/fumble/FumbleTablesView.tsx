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
  fetchFumbleTable,
  fetchFumbleTables,
  FumbleTableEntry,
  FumbleTablePicker,
  LayoutBase,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import CoreLawNotice from '../shared/CoreLawNotice';
import TableEntryDialog from '../shared/TableEntryDialog';
import { effectLabel, rollBand, tableName } from '../shared/table-labels';
import { useWholeTable } from '../shared/useWholeTable';

/** Fumble tables (spec 036): the rows of a column, and the technical model of each one on a click. */
const FumbleTablesView: FC = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const notify = useNotify();
  const [params, setParams] = useSearchParams();
  const id = params.get('table');
  const [tables, setTables] = useState<string[]>();
  const [selected, setSelected] = useState<FumbleTableEntry>();
  const whole = useWholeTable(id, fetchFumbleTable);

  useEffect(() => {
    fetchFumbleTables(auth)
      .then((ids) => {
        setTables(ids);
        if (!id && ids.length > 0)
          setParams({ table: ids.includes('melee-one-hand') ? 'melee-one-hand' : ids[0] }, { replace: true });
      })
      .catch((err) => notify.error(err));
  }, []);

  const table = whole.data && whole.data.id === id ? whole.data : undefined;

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('attack-tables'), link: '/core/attack-tables' },
        { name: t('attack-tables-fumble') },
      ]}
    >
      <Stack spacing={2}>
        <Box sx={{ maxWidth: 400 }}>
          <FumbleTablePicker
            tables={tables ?? []}
            value={id}
            onChange={(value) => value && setParams({ table: value }, { replace: true })}
            disabled={!tables}
            helperText={tables ? undefined : t('loading')}
            required
          />
        </Box>
        {whole.forbidden && <CoreLawNotice />}
        {whole.loading && <CircularProgress />}
        {table && (
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 80 }}>{t('roll')}</TableCell>
                  <TableCell>{t('text')}</TableCell>
                  <TableCell sx={{ width: '30%' }}>{t('effects')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {table.entries.map((entry) => (
                  <TableRow
                    key={entry.rollMin}
                    hover
                    onClick={() => setSelected(entry)}
                    sx={{ cursor: 'pointer', verticalAlign: 'top' }}
                  >
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {rollBand(entry.rollMin, entry.rollMax)}
                      </Typography>
                    </TableCell>
                    <TableCell>{entry.text}</TableCell>
                    <TableCell>
                      <Typography variant="caption" color="primary">
                        {(entry.effects ?? []).map((effect) => effectLabel(effect, t)).join(' · ')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
      <TableEntryDialog
        title={selected && id ? `${tableName(id, t)} · ${rollBand(selected.rollMin, selected.rollMax)}` : ''}
        entry={selected}
        onClose={() => setSelected(undefined)}
      />
    </LayoutBase>
  );
};

export default FumbleTablesView;
