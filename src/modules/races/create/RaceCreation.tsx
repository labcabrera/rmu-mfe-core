import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useError } from '../../../ErrorContext';
import { CreateRaceDto, raceCreateTemplate } from '../../api/race.dto';
import { fetchRealm, Realm } from '../../api/realm';
import RaceCreationActions from './RaceCreationActions';
import RaceCreationForm from './RaceCreationForm';

const RaceCreation: FC = () => {
  const [searchParams] = useSearchParams();
  const realmId = searchParams.get('realmId');
  const { showError } = useError();
  const [realm, setRealm] = useState<Realm | null>(null);
  const [formData, setFormData] = useState<CreateRaceDto>(raceCreateTemplate);
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    if (!formData.name) return false;
    if (!formData.realmId) return false;
    return true;
  };

  const bindRealm = (realmId: string) => {
    fetchRealm(realmId)
      .then((response) => {
        setRealm(response);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError('Unknown error occurred');
      });
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  useEffect(() => {
    if (realmId) {
      bindRealm(realmId);
      setFormData({ ...formData, realmId: realmId });
    }
  }, [realmId]);

  return (
    <>
      <RaceCreationActions formData={formData} isValid={isValid} realm={realm} />
      <RaceCreationForm formData={formData} setFormData={setFormData} />
      <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
    </>
  );
};

export default RaceCreation;
