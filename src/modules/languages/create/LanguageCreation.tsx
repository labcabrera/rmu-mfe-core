import React, { FC, useEffect, useState } from 'react';
import { useError } from '../../../ErrorContext';
import { CreateLanguageDto, Language } from '../../api/language.dto';
import { fetchRealms } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import LanguageCreationActions from './LanguageCreationActions';
import LanguageCreationAttributes from './LanguageCreationAttributes';

const template = {
  name: '',
  realmId: '',
  description: '',
} as Language;

const LanguageCreation: FC = () => {
  const { showError } = useError();
  const [formData, setFormData] = useState<CreateLanguageDto>(template);
  const [isValid, setIsValid] = useState(false);
  const [realms, setRealms] = useState<Realm[]>([]);

  const validateForm = () => {
    if (!formData.name) return false;
    if (!formData.realmId) return false;
    return true;
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  useEffect(() => {
    fetchRealms('', 0, 100)
      .then((data) => setRealms(data))
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError('Unknown error');
      });
  }, []);

  return (
    <>
      <LanguageCreationActions formData={formData} isValid={isValid} />
      <LanguageCreationAttributes formData={formData} setFormData={setFormData} realms={realms} />
      <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
    </>
  );
};

export default LanguageCreation;
