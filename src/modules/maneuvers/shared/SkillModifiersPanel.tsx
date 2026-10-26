import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Chip, Stack, Tooltip, Typography } from '@mui/material';
import { formatBonus, ManeuverModifier, NumericInput } from '@labcabrera-rmu/rmu-react-shared-lib';
import { modifierValue, ModifierSelections } from './skill-modifiers';

/**
 * The catalog modifiers of a skill (spec 010, plus the Character Companion tables of spec 037): each option, flag or
 * number with its value. Picking them adds their value to the total of the maneuver.
 */
const SkillModifiersPanel: FC<{
  modifiers: ManeuverModifier[];
  selections: ModifierSelections;
  onChange: (selections: ModifierSelections) => void;
}> = ({ modifiers, selections, onChange }) => {
  const { t } = useTranslation();
  const label = (key: string) => t(key, { defaultValue: key });
  const select = (key: string, value: true | string | number | null) => {
    const next = { ...selections };
    if (value === null) delete next[key];
    else next[key] = value;
    onChange(next);
  };

  if (modifiers.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        {t('no-skill-modifiers')}
      </Typography>
    );
  }

  return (
    <Stack spacing={1.5}>
      {modifiers.map((modifier) => {
        const selection = selections[modifier.key];
        const value = modifierValue(modifier, selection);
        return (
          <Box key={modifier.key}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline', justifyContent: 'space-between' }}>
              <Tooltip title={modifier.description ?? ''} placement="top-start">
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {label(modifier.key)}
                </Typography>
              </Tooltip>
              {value !== 0 && (
                <Typography variant="caption" color={value < 0 ? 'error.main' : 'success.main'}>
                  {formatBonus(value)}
                </Typography>
              )}
            </Stack>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
              {modifier.type === 'choice' &&
                (modifier.options ?? []).map((option) => {
                  const selected = selection === option.key;
                  return (
                    <Chip
                      key={option.key}
                      size="small"
                      color={selected ? 'primary' : 'default'}
                      variant={selected ? 'filled' : 'outlined'}
                      label={`${label(`${modifier.key}.${option.key}`)} ${formatBonus(option.value)}`}
                      onClick={() => select(modifier.key, selected ? null : option.key)}
                    />
                  );
                })}
              {modifier.type === 'flag' && (
                <Chip
                  size="small"
                  color={selection === true ? 'primary' : 'default'}
                  variant={selection === true ? 'filled' : 'outlined'}
                  label={formatBonus(modifier.value ?? 0)}
                  onClick={() => select(modifier.key, selection === true ? null : true)}
                />
              )}
              {modifier.type === 'number' && (
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Box sx={{ width: 110 }}>
                    <NumericInput
                      label={t('units')}
                      value={typeof selection === 'number' ? selection : null}
                      onChange={(units) => select(modifier.key, units ? units : null)}
                      integer
                      min={modifier.min ?? 0}
                      max={modifier.max ?? 100}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {`${formatBonus(modifier.perUnit ?? 0)} ${t('per-unit')}`}
                  </Typography>
                </Stack>
              )}
            </Box>
            {modifier.description && (
              <Typography variant="caption" color="text.secondary" component="div" sx={{ mt: 0.25 }}>
                {modifier.description}
              </Typography>
            )}
          </Box>
        );
      })}
    </Stack>
  );
};

export default SkillModifiersPanel;
