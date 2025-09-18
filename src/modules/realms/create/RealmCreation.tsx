import React, { FC, useEffect, useState } from 'react';
import { CreateRealmDto, Realm } from '../../api/realm';
import RealmCreationActions from './RealmCreationActions';
import RealmCreationAttributes from './RealmCreationAttributes';

const template = {
  name: '',
  description: '',
} as Realm;

const RealmCreation: FC = () => {
  const [formData, setFormData] = useState<CreateRealmDto>(template);
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    if (!formData.name) return false;
    return true;
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  return (
    <>
      <RealmCreationActions formData={formData} isValid={isValid} />
      <RealmCreationAttributes formData={formData} setFormData={setFormData} />
      <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
    </>
  );
};

export default RealmCreation;
