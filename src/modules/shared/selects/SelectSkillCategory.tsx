import React, { ChangeEvent, FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { t } from 'i18next';
import { SkillCategory } from '../../api/skill-category.dto';

const SelectSkillCategory: FC<{
  categories: SkillCategory[];
  value: string;
  label: string;
  onChange: (event: ChangeEvent<{ value: unknown }>) => void;
}> = ({ categories, label, value, onChange }) => {
  if (!categories) return <p>Loading...</p>;

  return (
    <TextField
      select
      label={label}
      value={value === undefined || value === null || categories.length === 0 ? '' : value}
      fullWidth
      variant="standard"
      onChange={onChange}
    >
      {categories.map((option, index) => (
        <MenuItem key={index} value={option.id}>
          {t(option.id)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectSkillCategory;
