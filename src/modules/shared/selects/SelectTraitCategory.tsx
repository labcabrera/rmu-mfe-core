import React, { FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { t } from 'i18next';
import { traits } from '../../api/trait.dto';

const SelectTraitCategory: FC<{
  label: string;
  value: string | null;
  name: string;
  addAllOption?: boolean;
  onChange: (e: string) => void;
  required?: boolean;
}> = ({ label, value, name, onChange, addAllOption = false, required = false }) => {
  return (
    <TextField
      select
      label={label}
      name={name}
      value={value === undefined || value === null ? '' : value}
      fullWidth
      onChange={(e) => onChange(e.target.value)}
      error={required && !value}
    >
      {addAllOption ? (
        <MenuItem>
          <em>{t('all')}</em>
        </MenuItem>
      ) : null}
      {traits.map((option, index) => (
        <MenuItem key={index} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectTraitCategory;
