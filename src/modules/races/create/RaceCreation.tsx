import React, { FC, useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useSearchParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { EditableAvatar, TechnicalInfo, Realm, fetchRealm, Race } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { imageBaseUrl } from '../../services/config';
import { gridSizeMain, gridSizeResume } from '../../services/display';
import { getAvatarImages } from '../../services/image-service';
import RaceForm from '../shared/RaceForm';
import RaceCreationActions from './RaceCreationActions';

export const RACE_CREATE_TEMPLATE = {
  name: '',
  realmId: '',
  archetype: '',
  sizeId: 'medium',
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
    fear: 0,
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
  recoveryMultiplier: 1,
  baseHits: 0,
  baseDevPoints: 60,
  baseAt: 1,
  talents: [],
  traits: [],
  defaultLanguage: null,
  description: '',
  imageUrl: `${imageBaseUrl}images/races/unknown.png`,
} as unknown as Race;

const RaceCreation: FC = () => {
  const auth = useAuth();
  const [searchParams] = useSearchParams();
  const realmId = searchParams.get('realmId');
  const { showError } = useError();
  const [realm, setRealm] = useState<Realm | null>(null);
  const [formData, setFormData] = useState<Race>(RACE_CREATE_TEMPLATE);
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
    if (!realm || !formData || !setFormData) return;
    setFormData({ ...formData, realmId: realm.id });
  }, [realm]);

  useEffect(() => {
    if (!realmId || !auth) return;
    fetchRealm(realmId, auth)
      .then((response) => setRealm(response))
      .catch((err) => showError(err.message));
  }, [realmId]);

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
