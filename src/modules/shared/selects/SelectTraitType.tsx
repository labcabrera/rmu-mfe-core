import React, { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, TextField } from '@mui/material';

const SelectTraitType: FC<{
  label: string;
  value: string | null;
  name: string;
  addAllOption?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, value, name, onChange, addAllOption = false }) => {
  const { t } = useTranslation();
  const values = ['talent', 'flaw'];

  return (
    <TextField
      select
      label={label}
      name={name}
      value={value === undefined || value === null ? '' : value}
      fullWidth
      onChange={onChange}
    >
      {addAllOption && (
        <MenuItem>
          <em>{t('all')}</em>
        </MenuItem>
      )}
      {values.map((option, index) => (
        <MenuItem key={index} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectTraitType;
