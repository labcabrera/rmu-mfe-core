import React, { Dispatch, FC, Fragment, SetStateAction } from 'react';
import { Grid, Typography } from '@mui/material';
import { NumericInput } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { CreateProfessionDto, UpdateProfessionDto } from '../../api/profession.dto';

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
  formData: CreateProfessionDto | UpdateProfessionDto;
  setFormData: Dispatch<SetStateAction<CreateProfessionDto | UpdateProfessionDto | undefined>>;
}> = ({ formData, setFormData }) => {
  const handleChange = (skillKey: string, index: number, value: number | null) => {
    const prev = (formData.skillCosts as Record<string, number[]> | undefined) || {};
    const next: Record<string, number[]> = { ...prev };
    const arr = Array.isArray(next[skillKey]) ? [...next[skillKey]] : [];
    if (index === 1) {
      if (value === null) {
        next[skillKey] = arr.length > 0 ? [arr[0]] : [];
      } else {
        arr[1] = value;
        next[skillKey] = arr;
      }
    } else {
      arr[0] = value ?? 0;
      next[skillKey] = arr;
    }
    setFormData({ ...formData, skillCosts: next as any });
  };

  return (
    <Grid container spacing={1}>
      {SKILLS.map((skill) => {
        const values = (formData.skillCosts as Record<string, number[]> | undefined)?.[skill] ?? [];
        const v0 = typeof values[0] === 'number' ? values[0] : null;
        const v1 = typeof values[1] === 'number' ? values[1] : null;

        return (
          <Fragment key={skill}>
            <Grid size={{ xs: 6, md: 4 }}>
              <Typography variant="body2">{t(skill)}</Typography>
            </Grid>
            <Grid size={{ xs: 3, md: 1 }}>
              <NumericInput value={v0} onChange={(val) => handleChange(skill, 0, val)} integer />
            </Grid>
            <Grid size={{ xs: 3, md: 1 }}>
              <NumericInput value={v1} onChange={(val) => handleChange(skill, 1, val)} integer />
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
};

export default ProfessionCreationSkillCosts;
