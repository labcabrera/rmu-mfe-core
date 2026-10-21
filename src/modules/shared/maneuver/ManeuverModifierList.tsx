import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Chip, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { formatBonus, ManeuverModifier } from '@labcabrera-rmu/rmu-react-shared-lib';

/** Read-only list of the catalog maneuver modifiers that apply to a skill (spec 010). */
const ManeuverModifierList: FC<{
  modifiers: ManeuverModifier[];
}> = ({ modifiers }) => {
  const { t } = useTranslation();

  const label = (key: string): string => t(key, { defaultValue: key });

  const renderValue = (modifier: ManeuverModifier) => {
    switch (modifier.type) {
      case 'flag':
        return modifier.value !== undefined ? formatBonus(modifier.value) : null;
      case 'choice':
        return (
          <Stack direction="row" spacing={0.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
            {(modifier.options || []).map((option) => (
              <Chip key={option.key} size="small" label={`${label(`${modifier.key}.${option.key}`)} ${formatBonus(option.value)}`} />
            ))}
          </Stack>
        );
      case 'number': {
        const parts: string[] = [];
        if (modifier.perUnit !== undefined) parts.push(`${formatBonus(modifier.perUnit)} ${t('per-unit')}`);
        if (modifier.min !== undefined || modifier.max !== undefined) {
          parts.push(`${t('range')}: ${modifier.min ?? ''} - ${modifier.max ?? ''}`);
        }
        return parts.join(' · ');
      }
      default:
        return null;
    }
  };

  if (modifiers.length === 0) {
    return <Typography color="text.secondary">{t('no-maneuver-modifiers')}</Typography>;
  }

  return (
    <Paper>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('modifier')}</TableCell>
            <TableCell>{t('type')}</TableCell>
            <TableCell>{t('value')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modifiers.map((modifier) => (
            <TableRow key={modifier.id}>
              <TableCell>
                <Typography variant="body2">{label(modifier.key)}</Typography>
                {modifier.description && (
                  <Typography variant="caption" color="text.secondary">
                    {modifier.description}
                  </Typography>
                )}
              </TableCell>
              <TableCell>{t(`modifier-type-${modifier.type}`)}</TableCell>
              <TableCell>{renderValue(modifier)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ManeuverModifierList;
