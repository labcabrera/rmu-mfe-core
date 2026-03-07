import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { CreateProfessionDto } from '../../api/profession.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';

const SKILLS = [
  'animal',
  'awareness',
  'battle-expertise',
  'body-discipline',
  'brawn',
  'combat-expertise',
  'combat1',
  'combat2',
  'combat3',
  'combat4',
  'composition',
  'crafting',
  'delving',
  'environmental',
  'gymnastic',
  'lore',
  'magical-expertise',
  'medical',
  'mental-discipline',
  'movement',
  'performance-art',
  'power-manipulation',
  'science',
  'social',
  'spells-base-open',
  'spells-ritual-magic',
  'spells-closed',
  'spells-arcane',
  'spells-restricted',
  'subterfuge',
  'technical',
  'vocation',
] as const;

const ProfessionCreationSkillCosts: FC<{
  formData: CreateProfessionDto;
  setFormData: Dispatch<SetStateAction<CreateProfessionDto>>;
}> = ({ formData, setFormData }) => {
  const handleChange = (skillKey: string, index: number, value: number | null) => {
    const prev = (formData.skillCosts as Record<string, number[]> | undefined) || {};
    const next: Record<string, number[]> = { ...prev };
    const arr = Array.isArray(next[skillKey]) ? [...next[skillKey]] : [];
    if (index === 1) {
      // If second value cleared (not a number), keep only first element
      if (value === null) {
        // trim to single element (if exists) or empty
        next[skillKey] = arr.length > 0 ? [arr[0]] : [];
      } else {
        arr[1] = value;
        next[skillKey] = arr;
      }
    } else {
      // index 0: always keep a numeric value (default to 0)
      arr[0] = value ?? 0;
      // if there was a second value already keep it as-is
      next[skillKey] = arr;
    }
    setFormData({ ...formData, skillCosts: next as any });
  };

  return (
    <Grid container spacing={0}>
      {SKILLS.map((skill) => {
        const values = (formData.skillCosts as Record<string, number[]> | undefined)?.[skill] ?? [];
        const v0 = typeof values[0] === 'number' ? values[0] : null;
        const v1 = typeof values[1] === 'number' ? values[1] : null;

        return (
          <Grid key={skill} size={12}>
            <Grid container spacing={1}>
              <Grid size={6}>
                <Typography variant="body2">{t(skill)}</Typography>
              </Grid>
              <Grid size={3}>
                <NumericInput value={v0} onChange={(val) => handleChange(skill, 0, val)} integer />
              </Grid>
              <Grid size={3}>
                <NumericInput value={v1} onChange={(val) => handleChange(skill, 1, val)} integer />
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProfessionCreationSkillCosts;
