import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, TextField } from '@mui/material';

/** Select of a table id, with the names of tableName or criticalTypeName. */
const TableSelect: FC<{
  label: string;
  tables: string[] | undefined;
  value: string | null;
  onChange: (value: string) => void;
  name: (id: string) => string;
}> = ({ label, tables, value, onChange, name }) => {
  const { t } = useTranslation();
  return (
    <TextField
      select
      fullWidth
      label={label}
      value={tables?.includes(value ?? '') ? value : ''}
      onChange={(event) => onChange(event.target.value)}
      disabled={!tables}
      helperText={tables ? undefined : t('loading')}
    >
      {(tables ?? []).map((id) => (
        <MenuItem key={id} value={id}>
          {name(id)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default TableSelect;
