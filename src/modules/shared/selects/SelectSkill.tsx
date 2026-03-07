import React, { FC } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { t } from 'i18next';
import { Skill } from '../../api/skill.dto';

const SelectSkill: FC<{
  label: string;
  value: string | undefined;
  name: string;
  onChange: (skill: Skill | null) => void;
  skills: Skill[];
  required?: boolean;
}> = ({ label, value, name, onChange, required = false, skills }) => {
  const selected = skills.find((skill) => skill.id === (value ?? '')) ?? null;
  const handleChange = (_event: React.SyntheticEvent, newValue: Skill | null) => {
    if (newValue) {
      onChange(newValue);
    }
  };

  return (
    <Autocomplete
      options={skills}
      getOptionLabel={(option) => t(option.id)}
      value={selected}
      onChange={handleChange}
      isOptionEqualToValue={(option, val) => option.id === val.id}
      renderInput={(params) => (
        <TextField {...params} label={label} name={name} fullWidth error={required && !(value && value.length > 0)} />
      )}
    />
  );
};

export default SelectSkill;
