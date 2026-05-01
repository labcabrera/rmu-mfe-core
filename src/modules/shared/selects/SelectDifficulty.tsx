import React, { ChangeEvent, FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { MANEUVER_DIFFICULTIES, KeyValue } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';

const SelectDifficulty: FC<{
  value: string;
  label: string;
  onChange: (difficulty: KeyValue) => void;
}> = ({ value, label, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    const selectedDifficulty = MANEUVER_DIFFICULTIES.find((option) => option.key === selectedValue);
    onChange(selectedDifficulty!);
  };

  return (
    <TextField
      select
      label={label}
      value={value === undefined || value === null ? '' : value}
      onChange={handleChange}
      fullWidth
    >
      {MANEUVER_DIFFICULTIES.map((option, index) => (
        <MenuItem key={index} value={option.key}>
          {`${t(`difficulty-${option.key}`)} (${option.value})`}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectDifficulty;
