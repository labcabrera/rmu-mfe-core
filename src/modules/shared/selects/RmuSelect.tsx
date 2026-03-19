import React, { ChangeEvent, FC } from 'react';
import { MenuItem, TextField } from '@mui/material';

export interface SelectOption {
  value: string;
  description: string;
}

export const RmuSelect: FC<{
  value: string | null | undefined;
  label: string;
  options: SelectOption[];
  required?: boolean;
  onChange: (key: string) => void;
}> = ({ value, label, options, required = false, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField select label={label} value={value ?? ''} onChange={handleChange} fullWidth error={required && !value}>
      <MenuItem value={''}>
        <em>None</em>
      </MenuItem>
      {options.map((option, index) => (
        <MenuItem key={index} value={option.value}>
          {option.description}
        </MenuItem>
      ))}
    </TextField>
  );
};
