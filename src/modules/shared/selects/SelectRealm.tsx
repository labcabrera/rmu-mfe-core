import React, { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, TextField } from '@mui/material';
import { Realm } from '../../api/realm';

const SelectRealm: FC<{
  value: string;
  onChange: (value: string) => void;
  realms: Realm[];
}> = ({ value, onChange, realms }) => {
  const { t } = useTranslation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  if (!realms) {
    return <p>Loading...</p>;
  }

  return (
    <TextField
      select
      label={t('realm')}
      value={value === undefined || value === null || realms.length === 0 ? '' : value}
      fullWidth
      variant="standard"
      onChange={handleChange}
    >
      {realms.map((option, index) => (
        <MenuItem key={index} value={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectRealm;
