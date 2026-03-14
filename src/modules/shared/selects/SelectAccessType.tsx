import React, { FC, MouseEvent } from 'react';
import { ToggleButtonGroup, ToggleButton, FormControl, FormLabel } from '@mui/material';
import { t } from 'i18next';
import { AccessType } from '../../api/common.dto';

const SelectAccessType: FC<{
  value: AccessType | undefined;
  label: string;
  onChange: (accessType: AccessType) => void;
}> = ({ value, label, onChange }) => {
  const handleChange = (_: MouseEvent<HTMLElement>, newValue: string | null) => {
    if (!newValue) return;
    onChange(newValue as AccessType);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <ToggleButtonGroup value={value ?? null} exclusive onChange={handleChange} aria-label={label} size="small">
        <ToggleButton value="public" aria-label="public">
          {t('Public')}
        </ToggleButton>
        <ToggleButton value="private" aria-label="private">
          {t('Private')}
        </ToggleButton>
      </ToggleButtonGroup>
    </FormControl>
  );
};

export default SelectAccessType;
