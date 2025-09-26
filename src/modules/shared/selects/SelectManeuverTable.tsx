import React, { ChangeEvent, FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { t } from 'i18next';

const SelectManeuverTable: FC<{
  value: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, label, onChange }) => {
  const VALUES = [null, 'adrenal', 'animal', 'awareness', 'crafting', 'gymnastic'];

  return (
    <TextField
      select
      label={label}
      value={value === undefined || value === null ? '' : value}
      variant="standard"
      onChange={onChange}
      fullWidth
    >
      {VALUES.map((option, index) => (
        <MenuItem key={index} value={option}>
          {option ? t(option) : t('none')}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectManeuverTable;
