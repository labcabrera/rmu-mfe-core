import React, { FC, useEffect, useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchEnumerationCategories } from '../../api/enumerations';

const SelectSkillSpecialization: FC<{
  value: string | null;
  label: string;
  onSpecializationChange: (value: string | null) => void;
}> = ({ label, value, onSpecializationChange }) => {
  const { showError } = useError();
  const [categories, setCategories] = useState<string[]>();

  const bindCategories = () => {
    fetchEnumerationCategories()
      .then((response) => setCategories(response))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    bindCategories();
  }, []);

  if (!categories) return <p>Loading...</p>;

  return (
    <TextField
      select
      label={label}
      value={value === undefined || value === null ? '' : value}
      fullWidth
      onChange={(e) => onSpecializationChange(e.target.value || null)}
    >
      <MenuItem>{t('none')}</MenuItem>
      {categories.map((option, index) => (
        <MenuItem key={index} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectSkillSpecialization;
