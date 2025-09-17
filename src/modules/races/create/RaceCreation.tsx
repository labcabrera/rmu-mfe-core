import React, { FC, useEffect, useState } from 'react';
import { useError } from '../../../ErrorContext';
import { CreateRaceDto } from '../../api/race';
import { fetchRealms, Realm } from '../../api/realm';
import RaceCreationActions from './RaceCreationActions';
import RaceCreationAttributes from './RaceCreationAttributes';

const RaceCreation: FC = () => {
  const { showError } = useError();
  const [realms, setRealms] = useState<Realm[]>([]);
  const [formData, setFormData] = useState<CreateRaceDto>(null);
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
      {/* <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
      <pre>Strategic Games: {JSON.stringify(strategicGames, null, 2)}</pre> */}
    </>
  );
};

export default RaceCreation;
