import React, { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, TextField } from '@mui/material';
import { MagicPresence } from '@labcabrera-rmu/rmu-react-shared-lib';

const OPTIONS: MagicPresence[] = ['unlimited', 'limited', 'none'];

const SelectMagicPresence: FC<{
  value: MagicPresence | undefined;
  label: string;
  required?: boolean;
  onChange: (value: MagicPresence) => void;
}> = ({ value, label, required = true, onChange }) => {
  const { t } = useTranslation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value as MagicPresence;
    onChange(selectedValue);
  };

  return (
    <TextField
      select
      label={label}
      value={value === undefined || value === null ? '' : value}
      onChange={handleChange}
      fullWidth
      error={required && !value}
    >
      {OPTIONS.map((option, index) => (
        <MenuItem key={`magicPresence${index}`} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectMagicPresence;
