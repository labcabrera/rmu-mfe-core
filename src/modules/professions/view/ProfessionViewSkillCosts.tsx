import React, { FC } from 'react';
import {
  Grid,
  Typography,
  Chip,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { t } from 'i18next';
import { Profession } from '../../api/profession.dto';

const formatSkillLabel = (key: string) =>
  key
    .split('-')
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join(' ');

const ProfessionViewSkillCosts: FC<{
  profession: Profession;
}> = ({ profession }) => {
  const skillEntries = (Object.entries(profession.skillCosts || {}) as [string, number[]][]).filter(
    ([, vals]) => Array.isArray(vals) && vals.length > 0
  );

  if (skillEntries.length === 0) {
    return (
      <Paper sx={{ padding: 1 }}>
        <Typography variant="body2">{t('No skill costs available.')}</Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('Category')}</TableCell>
            <TableCell>{t('Cost')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {skillEntries.map(([skillKey, values]) => (
            <TableRow key={skillKey}>
              <TableCell sx={{ minWidth: 200 }}>{formatSkillLabel(skillKey)}</TableCell>
              <TableCell>{Array.isArray(values) ? values.join(' / ') : '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProfessionViewSkillCosts;
