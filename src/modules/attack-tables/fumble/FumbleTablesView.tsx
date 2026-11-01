import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useSearchParams } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import {
  DataTable,
  DataTableColumn,
  fetchFumbleTable,
  fetchFumbleTables,
  FumbleTableEntry,
  FumbleTablePicker,
  LayoutBase,
  LoadingState,
  Panel,
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
  const columns: DataTableColumn<FumbleTableEntry>[] = [
    {
      key: 'roll',
      header: t('roll'),
      width: 80,
      cellSx: { verticalAlign: 'top' },
      render: (entry) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {rollBand(entry.rollMin, entry.rollMax)}
        </Typography>
      ),
    },
    { key: 'text', header: t('text'), cellSx: { verticalAlign: 'top' }, render: (entry) => entry.text },
    {
      key: 'effects',
      header: t('effects'),
      width: '30%',
      cellSx: { verticalAlign: 'top' },
      render: (entry) => (
        <Typography variant="caption" color="primary">
          {(entry.effects ?? []).map((effect) => effectLabel(effect, t)).join(' · ')}
        </Typography>
      ),
    },
  ];

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
        {whole.loading && <LoadingState />}
        {table && (
          <Panel variant="outlined">
            <DataTable
              columns={columns}
              rows={table.entries}
              getKey={(entry) => String(entry.rollMin)}
              onRowClick={setSelected}
            />
          </Panel>
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
