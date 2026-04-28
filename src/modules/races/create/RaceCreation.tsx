import React, { FC, useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useSearchParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import {
  EditableAvatar,
  TechnicalInfo,
  Realm,
  fetchRealm,
  raceCreateTemplate,
  Race,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { gridSizeMain, gridSizeResume } from '../../services/display';
import { getAvatarImages } from '../../services/image-service';
import RaceForm from '../shared/RaceForm';
import RaceCreationActions from './RaceCreationActions';

const RaceCreation: FC = () => {
  const auth = useAuth();
  const [searchParams] = useSearchParams();
  const realmId = searchParams.get('realmId');
  const { showError } = useError();
  const [realm, setRealm] = useState<Realm | null>(null);
  const [formData, setFormData] = useState<Race>(raceCreateTemplate as unknown as Race);
  const [isValid, setIsValid] = useState(false);

  const validateForm = (formData: Race) => {
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
  }, [realm, formData]);

  useEffect(() => {
    if (realmId) {
      fetchRealm(realmId, auth)
        .then((response) => setRealm(response))
        .catch((err) => showError(err.message));
    }
  }, [realmId, auth, showError]);

  if (!realm || !formData) return <div>Loading...</div>;

  return (
    <Grid container spacing={1}>
      <Grid size={gridSizeResume}>
        <EditableAvatar
          imageUrl={formData.imageUrl || ''}
          onImageChange={(avatar) => setFormData({ ...formData, imageUrl: avatar })}
          images={getAvatarImages()}
        />
      </Grid>
      <Grid size={gridSizeMain}>
        <RaceCreationActions formData={formData} isValid={isValid} />
        <RaceForm realmId={realm.id} formData={formData} setFormData={setFormData} />
        <TechnicalInfo>
          <pre>FormData: {JSON.stringify(formData, null, 2)}</pre>
        </TechnicalInfo>
      </Grid>
    </Grid>
  );
};

export default RaceCreation;
