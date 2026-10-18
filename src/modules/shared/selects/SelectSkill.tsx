import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { EntitySelect } from '@labcabrera-rmu/rmu-react-shared-lib';

/** Skill picker over a list of skill ids. */
const SelectSkill: FC<{
  label: string;
  value: string | undefined;
  name: string;
  onChange: (skillId: string | null) => void;
  skills: string[];
  required?: boolean;
}> = ({ label, value, name, onChange, required = false, skills }) => {
  const { t } = useTranslation();
  return (
    <EntitySelect<string>
      options={skills}
      value={value ?? null}
      onChange={(skillId) => onChange(skillId)}
      getId={(skill) => skill}
      getLabel={(skill) => t(skill)}
      label={label}
      name={name}
      required={required}
    />
  );
};

export default SelectSkill;
