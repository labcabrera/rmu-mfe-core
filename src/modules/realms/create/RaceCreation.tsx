import React, { FC, useEffect, useState } from 'react';
import { useError } from '../../../ErrorContext';
import { Race } from '../../api/race';
import { fetchRealms, Realm } from '../../api/realm';
import RaceCreationActions from './RaceCreationActions';
import RaceCreationAttributes from './RaceCreationAttributes';

const template = {
  id: '',
  name: '',
  realmId: '',
  stats: {
    ag: 0,
    co: 0,
    em: 0,
    in: 0,
    me: 0,
    pr: 0,
    qu: 0,
    re: 0,
    sd: 0,
    st: 0,
  },
  resistances: {
    channeling: 0,
    mentalism: 0,
    essence: 0,
    physical: 0,
    poison: 0,
    disease: 0,
  },
  averageHeight: {
    male: 0,
    female: 0,
  },
  averageWeight: {
    male: 0,
    female: 0,
  },
  strideBonus: 0,
  enduranceBonus: 0,
  recoveryMultiplier: 0,
  baseHits: 0,
  baseDevPoints: 0,
  baseAt: 1,
  defaultLanguage: '',
  availableLanguages: [],
  talents: [],
  description: '',
} as Race;

const RaceCreation: FC = () => {
  const { showError } = useError();
  const [realms, setRealms] = useState<Realm[]>([]);
  const [formData, setFormData] = useState<Race>(template);
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    if (!formData.name) return false;
    if (!formData.realmId) return false;
    return true;
  };

  const bindRealms = async () => {
    fetchRealms('', 0, 20)
      .then((response) => {
        setRealms(response);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError('Unknown error occurred');
      });
  };

  useEffect(() => {
    bindRealms();
  }, []);

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  return (
    <>
      <RaceCreationActions formData={formData} isValid={isValid} />
      <RaceCreationAttributes formData={formData} setFormData={setFormData} realms={realms} />
      <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
    </>
  );
};

export default RaceCreation;
