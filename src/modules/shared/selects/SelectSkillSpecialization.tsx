import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { MenuItem, TextField } from '@mui/material';
import { fetchEnumerationCategories } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';

const SelectSkillSpecialization: FC<{
  value: string | null;
  label: string;
  onSpecializationChange: (value: string | null) => void;
}> = ({ label, value, onSpecializationChange }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const [categories, setCategories] = useState<string[]>();

  const bindCategories = () => {
    fetchEnumerationCategories(auth)
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
