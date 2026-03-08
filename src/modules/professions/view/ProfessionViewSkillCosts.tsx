import React, { FC } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Rating,
} from '@mui/material';
import { t } from 'i18next';
import { Profession } from '../../api/profession.dto';

const ProfessionViewSkillCosts: FC<{
  profession: Profession;
}> = ({ profession }) => {
  const skillEntries = (Object.entries(profession.skillCosts || {}) as [string, number[]][]).filter(
    ([, vals]) => Array.isArray(vals) && vals.length > 0
  );

  const getRatingValue = (cost: number) => {
    return Math.max(0, 6 - Math.ceil(cost));
  };

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
            <TableCell>{t('Rating')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {skillEntries.map(([skillKey, values]) => (
            <TableRow key={skillKey}>
              <TableCell>{t(skillKey)}</TableCell>
              <TableCell>
                {values[0]}
                {values.length > 1 ? ` / ${values[1]}` : ''}
              </TableCell>
              <TableCell>
                <Rating
                  name="size-small"
                  defaultValue={getRatingValue(values[0])}
                  size="small"
                  readOnly
                  icon={<CircleIcon fontSize="inherit" />}
                  emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}
                  sx={{ color: 'primary.main' }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProfessionViewSkillCosts;
