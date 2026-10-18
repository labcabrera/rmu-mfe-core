/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { EntitySelect, fetchEnumerationCategories, useNotify } from '@labcabrera-rmu/rmu-react-shared-lib';

/** Picks the enumeration category that specializes a skill. Clearing it reports null. */
const SelectSkillSpecialization: FC<{
  value: string | null;
  label: string;
  onSpecializationChange: (value: string | null) => void;
}> = ({ label, value, onSpecializationChange }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [categories, setCategories] = useState<string[]>();

  useEffect(() => {
    fetchEnumerationCategories(auth).then(setCategories).catch(notify.error);
  }, []);

  return (
    <EntitySelect<string>
      options={categories ?? []}
      value={value}
      onChange={(category) => onSpecializationChange(category)}
      getId={(category) => category}
      getLabel={(category) => t(category)}
      label={label}
      name="specialization"
      loading={!categories}
    />
  );
};

export default SelectSkillSpecialization;
