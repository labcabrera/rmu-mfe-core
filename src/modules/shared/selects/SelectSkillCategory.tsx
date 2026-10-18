import React, { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { EntitySelect, SkillCategory } from '@labcabrera-rmu/rmu-react-shared-lib';

/** Skill category picker over an already fetched list. Clearing it reports an empty value. */
const SelectSkillCategory: FC<{
  categories: SkillCategory[];
  value: string;
  label: string;
  required?: boolean;
  /** Kept for compatibility: the select can always be cleared. */
  allowEmpty?: boolean;
  onChange: (event: ChangeEvent<{ value: string }>) => void;
}> = ({ categories, label, value, required = false, onChange }) => {
  const { t } = useTranslation();
  return (
    <EntitySelect<SkillCategory>
      options={categories || []}
      value={value || null}
      onChange={(id) => onChange({ target: { value: id ?? '' } } as ChangeEvent<{ value: string }>)}
      getLabel={(category) => t(category.id)}
      label={label}
      name="category"
      required={required}
      loading={!categories}
    />
  );
};

export default SelectSkillCategory;
