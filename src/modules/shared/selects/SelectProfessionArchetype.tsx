import React, { FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { t } from 'i18next';
import { ProfessionArchetype } from '../../api/profession.dto';

const SelectProfessionArchetype: FC<{
  label: string;
  value: ProfessionArchetype | null;
  name: string;
  onChange: (archetype: ProfessionArchetype) => void;
}> = ({ label, value, name, onChange }) => {
  const values: ProfessionArchetype[] = ['non-spellcaster', 'semi-spellcaster', 'pure-spellcaster', 'hybrid'];

  return (
    <TextField
      select
      label={label}
      name={name}
      value={value === undefined || value === null ? '' : value}
      fullWidth
      onChange={(event) => onChange(event.target.value as ProfessionArchetype)}
      error={!value}
    >
      {values.map((option, index) => (
        <MenuItem key={index} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectProfessionArchetype;
