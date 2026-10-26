import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Chip, Paper, Stack, Typography, useTheme } from '@mui/material';
import type { AttackTable, AttackTableCell } from '@labcabrera-rmu/rmu-react-shared-lib';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { LEGEND_SEVERITIES, severityColor } from '../shared/severity-colors';
import { rollBand } from '../shared/table-labels';

type Point = { roll: number; hits: number };

const DASHES = ['', '6 3', '2 2', '8 3 2 3', '1 3'];
// Positions of the axis labels (recharts names, not visible text)
const X_LABEL_POSITION = 'insideBottom';
const Y_LABEL_POSITION = 'insideLeft';

/**
 * Hits of an attack table by roll, one line per armor type. Each row of the table is a flat stretch whose color is the
 * severity of its critical, drawn with a gradient of hard stops along the line.
 */
const AttackDamageChart: FC<{ table: AttackTable; armorTypes: number[] }> = ({ table, armorTypes }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const rows = useMemo(() => [...table.rows].sort((a, b) => a.rollMin - b.rollMin), [table]);
  const first = rows[0]?.rollMin ?? 1;
  const last = rows[rows.length - 1]?.rollMax ?? 175;
  const offset = (roll: number) => `${(((roll - first) / Math.max(1, last - first)) * 100).toFixed(3)}%`;

  const cell = (roll: number, at: number): AttackTableCell | undefined =>
    rows.find((row) => roll >= row.rollMin && roll <= row.rollMax)?.results[at - 1];

  const series = armorTypes.map((at) => ({
    at,
    points: rows.flatMap((row): Point[] => [
      { roll: row.rollMin, hits: row.results[at - 1].damage },
      { roll: row.rollMax, hits: row.results[at - 1].damage },
    ]),
  }));

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Box sx={{ width: '100%', height: 420 }}>
        <ResponsiveContainer>
          <LineChart margin={{ top: 10, right: 40, bottom: 20, left: 0 }}>
            <defs>
              {armorTypes.map((at) => (
                <linearGradient key={at} id={`attack-severity-at${at}`} x1="0" y1="0" x2="1" y2="0">
                  {rows.flatMap((row) => {
                    const color = severityColor(row.results[at - 1].criticalSeverity);
                    return [
                      <stop key={`${row.rollMin}-a`} offset={offset(row.rollMin)} stopColor={color} />,
                      <stop key={`${row.rollMin}-b`} offset={offset(row.rollMax)} stopColor={color} />,
                    ];
                  })}
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="roll"
              domain={[first, last]}
              allowDuplicatedCategory={false}
              label={{ value: t('roll'), position: X_LABEL_POSITION, offset: -10 }}
            />
            <YAxis dataKey="hits" label={{ value: t('hits'), angle: -90, position: Y_LABEL_POSITION }} />
            <Tooltip
              content={({ active, label }) => {
                if (!active || typeof label !== 'number') return null;
                const row = rows.find((r) => label >= r.rollMin && label <= r.rollMax);
                if (!row) return null;
                return (
                  <Paper sx={{ p: 1 }}>
                    <Typography variant="caption">
                      {t('roll')} {rollBand(row.rollMin, row.rollMax)}
                    </Typography>
                    {armorTypes.map((at) => {
                      const result = cell(label, at);
                      return (
                        <Typography key={at} variant="body2" sx={{ color: severityColor(result?.criticalSeverity) }}>
                          {t('attack-tables-at-n', { at })}: {result?.text}
                        </Typography>
                      );
                    })}
                  </Paper>
                );
              }}
            />
            {series.map(({ at, points }, index) => (
              <Line
                key={at}
                data={points}
                dataKey="hits"
                name={t('attack-tables-at-n', { at })}
                stroke={`url(#attack-severity-at${at})`}
                strokeWidth={3}
                strokeDasharray={DASHES[index % DASHES.length]}
                dot={false}
                activeDot={false}
                isAnimationActive={false}
                label={(props: { x?: number | string; y?: number | string; index?: number }) =>
                  props.index === points.length - 1 ? (
                    <text
                      key={at}
                      x={Number(props.x) + 4}
                      y={Number(props.y)}
                      fontSize={11}
                      dominantBaseline="middle"
                      fill={theme.palette.text.primary}
                    >
                      {t('attack-tables-at-n', { at })}
                    </text>
                  ) : (
                    <g key={`${at}-${props.index}`} />
                  )
                }
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Stack direction="row" spacing={0.5} useFlexGap sx={{ flexWrap: 'wrap', mt: 1 }}>
        {LEGEND_SEVERITIES.map((severity) => (
          <Chip
            key={severity}
            size="small"
            label={severity === 'none' ? t('attack-tables-no-critical') : severity}
            sx={{ bgcolor: severityColor(severity), color: severity === 'A' || severity === 'B' ? 'black' : 'white' }}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default AttackDamageChart;
