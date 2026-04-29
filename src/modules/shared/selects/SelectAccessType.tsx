import React, { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleButtonGroup, ToggleButton, FormControl, FormLabel } from '@mui/material';
import { AccessType } from '@labcabrera-rmu/rmu-react-shared-lib';

const SelectAccessType: FC<{
  value: AccessType | undefined;
  label?: string;
  onChange: (accessType: AccessType) => void;
}> = ({ value, label = 'Access type', onChange }) => {
  const { t } = useTranslation();

  const handleChange = (_: MouseEvent<HTMLElement>, newValue: string | null) => {
    if (!newValue) return;
    onChange(newValue as AccessType);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <ToggleButtonGroup value={value ?? null} exclusive onChange={handleChange} aria-label={label} size="small">
        <ToggleButton value="public" aria-label="public">
          {t('public')}
        </ToggleButton>
        <ToggleButton value="private" aria-label="private">
          {t('private')}
        </ToggleButton>
      </ToggleButtonGroup>
    </FormControl>
  );
};

export default SelectAccessType;
