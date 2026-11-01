import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useSearchParams } from 'react-router-dom';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import {
  AttackLookup,
  AttackTablePicker,
  ChipRow,
  criticalSeverityColor,
  criticalSeverityTextColor,
  fetchAttackTable,
  fetchAttackTables,
  LayoutBase,
  LoadingState,
  lookupAttackTable,
  NumericInput,
  Panel,
  Section,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import CoreLawNotice from '../shared/CoreLawNotice';
import { useWholeTable } from '../shared/useWholeTable';
import AttackDamageChart from './AttackDamageChart';

const ARMOR_TYPES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** Attack tables (spec 036): the result of a roll, and the hits of the whole table by armor type. */
const AttackTablesView: FC = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const notify = useNotify();
  const [params, setParams] = useSearchParams();
  const table = params.get('table');
  const [tables, setTables] = useState<string[]>();
  const [armorType, setArmorType] = useState<number | null>(1);
  const [roll, setRoll] = useState<number | null>(null);
  const [result, setResult] = useState<AttackLookup>();
  const [chartTypes, setChartTypes] = useState<number[]>([1]);
  const whole = useWholeTable(table, fetchAttackTable);

  useEffect(() => {
    fetchAttackTables(auth)
      .then((ids) => {
        setTables(ids);
        if (!table && ids.length > 0)
          setParams({ table: ids.includes('broadsword') ? 'broadsword' : ids[0] }, { replace: true });
      })
      .catch((err) => notify.error(err));
  }, []);

  useEffect(() => {
    setResult(undefined);
    if (!table || !armorType || !roll) return;
    lookupAttackTable(table, armorType, roll, auth)
      .then(setResult)
      .catch((err) => notify.error(err));
  }, [table, armorType, roll]);

  const selectArmorType = (value: number | null) => {
    setArmorType(value);
    if (value && !chartTypes.includes(value)) setChartTypes([...chartTypes, value].sort((a, b) => a - b));
  };

  const toggleChartType = (at: number) =>
    setChartTypes(
      chartTypes.includes(at) ? chartTypes.filter((x) => x !== at) : [...chartTypes, at].sort((a, b) => a - b)
    );

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('attack-tables'), link: '/core/attack-tables' },
        { name: t('attack-tables-attack') },
      ]}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={2}>
            <AttackTablePicker
              tables={tables ?? []}
              value={table}
              onChange={(value) => value && setParams({ table: value }, { replace: true })}
              disabled={!tables}
              helperText={tables ? undefined : t('loading')}
              required
            />
            <NumericInput
              label={t('armor-type')}
              value={armorType}
              onChange={selectArmorType}
              integer
              allowNegatives={false}
              min={1}
              max={10}
            />
            <NumericInput
              label={t('roll')}
              value={roll}
              onChange={setRoll}
              integer
              allowNegatives={false}
              min={1}
              max={175}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Panel variant="outlined" sx={{ height: '100%' }}>
            {result ? (
              <Stack spacing={1}>
                <Typography variant="h3">{result.text}</Typography>
                <Typography>
                  {t('hits')}: {result.damage}
                </Typography>
                {result.criticalType ? (
                  <Box>
                    <Chip
                      label={`${t('critical')} ${result.criticalSeverity} ${result.criticalType}`}
                      sx={{
                        bgcolor: criticalSeverityColor(result.criticalSeverity),
                        color: criticalSeverityTextColor(result.criticalSeverity),
                      }}
                    />
                  </Box>
                ) : (
                  <Typography color="text.secondary">{t('attack-tables-no-critical')}</Typography>
                )}
              </Stack>
            ) : (
              <Typography color="text.secondary">{t('attack-tables-lookup-hint')}</Typography>
            )}
          </Panel>
        </Grid>

        <Grid size={12}>
          <Section title={t('attack-tables-chart')}>
            <Stack spacing={1}>
              <ChipRow>
                {ARMOR_TYPES.map((at) => (
                  <Chip
                    key={at}
                    label={t('attack-tables-at-n', { at })}
                    color={chartTypes.includes(at) ? 'primary' : 'default'}
                    variant={chartTypes.includes(at) ? 'filled' : 'outlined'}
                    onClick={() => toggleChartType(at)}
                  />
                ))}
              </ChipRow>
              {whole.forbidden && <CoreLawNotice />}
              {whole.loading && <LoadingState />}
              {whole.data && whole.data.id === table && (
                <AttackDamageChart table={whole.data} armorTypes={chartTypes} />
              )}
            </Stack>
          </Section>
        </Grid>
      </Grid>
    </LayoutBase>
  );
};

export default AttackTablesView;
