import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Autocomplete, TextField } from '@mui/material';

/** Searchable multi select over a list of ids, labelled through their translation key. */
const MultiIdSelect: FC<{
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  required?: boolean;
  freeSolo?: boolean;
  helperText?: string;
}> = ({ label, options, value, onChange, required = false, freeSolo = false, helperText }) => {
  const { t } = useTranslation();
  return (
    <Autocomplete<string, true, false, boolean>
      multiple
      freeSolo={freeSolo}
      options={options}
      value={value}
      getOptionLabel={(option) => t(option)}
      onChange={(_, selected) => onChange(selected.map((e) => String(e).trim()).filter((e) => !!e))}
      filterSelectedOptions
      noOptionsText={t('no-results')}
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          error={required && value.length === 0}
          helperText={helperText}
        />
      )}
    />
  );
};

export default MultiIdSelect;
