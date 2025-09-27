import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { CreateRaceDto, raceCreateTemplate } from '../../api/race.dto';
import { fetchRealm } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import RaceAvatarByName from '../../shared/avatars/RaceAvatarByName';
import RaceCreationActions from './RaceCreationActions';
import RaceCreationAttributes from './RaceCreationAttributes';
import RaceCreationResistances from './RaceCreationResistances';
import RaceCreationResume from './RaceCreationResume';
import RaceCreationStats from './RaceCreationStats';

const RaceCreation: FC = () => {
  const [searchParams] = useSearchParams();
  const realmId = searchParams.get('realmId');
  const { showError } = useError();
  const [realm, setRealm] = useState<Realm | null>(null);
  const [formData, setFormData] = useState<CreateRaceDto>(raceCreateTemplate);
  const [isValid, setIsValid] = useState(false);

  const validateForm = (formData: CreateRaceDto) => {
    if (!formData.name) return false;
    if (!formData.realmId) return false;
    return true;
  };

  useEffect(() => {
    setIsValid(validateForm(formData));
  }, [formData]);

  useEffect(() => {
    if (realm) {
      setFormData({ ...formData, realmId: realm.id });
    }
  }, [realm]);

  useEffect(() => {
    if (realmId) {
      fetchRealm(realmId)
        .then((response) => setRealm(response))
        .catch((err) => showError(err.message));
    }
  }, [realmId, showError]);

  if (!realm || !formData) return <div>Loading...</div>;

  return (
    <>
      <RaceCreationActions formData={formData} isValid={isValid} realm={realm} />
      <Grid container spacing={2}>
        <Grid size={2}>
          <RaceAvatarByName raceName={formData.name} size={300} />
          <RaceCreationResume formData={formData} setFormData={setFormData} />
        </Grid>
        <Grid size={8}>
          <RaceCreationStats formData={formData} setFormData={setFormData} />
          <RaceCreationResistances formData={formData} setFormData={setFormData} />
          <RaceCreationAttributes formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
      {/* <pre>Form: {JSON.stringify(formData, null, 2)}</pre> */}
    </>
  );
};

export default RaceCreation;
