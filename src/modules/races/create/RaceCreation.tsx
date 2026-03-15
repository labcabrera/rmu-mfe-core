import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { CreateRaceDto, raceCreateTemplate } from '../../api/race.dto';
import { fetchRealm } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import EdditableAvatar from '../../shared/avatars/EditableAvatar';
import TechnicalInfo from '../../shared/display/TechnicalInfo';
import RaceForm from '../shared/RaceForm';
import RaceCreationActions from './RaceCreationActions';

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
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}>
          <EdditableAvatar
            imageUrl={formData.imageUrl || ''}
            onImageChange={(avatar) => setFormData({ ...formData, imageUrl: avatar })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <RaceForm formData={formData} setFormData={setFormData} />
          <TechnicalInfo>
            <pre>FormData: {JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default RaceCreation;
