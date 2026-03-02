import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { CreateLanguageDto } from '../../api/language.dto';
import { fetchRealm } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import { imageBaseUrl } from '../../services/config';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import LanguageCreationActions from './LanguageCreationActions';
import LanguageCreationAttributes from './LanguageCreationAttributes';

const template = {
  name: '',
  realmId: '',
  description: '',
} as CreateLanguageDto;

const LanguageCreation: FC = () => {
  const { showError } = useError();
  const [searchParams] = useSearchParams();
  const realmId = searchParams.get('realmId');
  const [formData, setFormData] = useState<CreateLanguageDto>(template);
  const [isValid, setIsValid] = useState(false);
  const [realm, setRealm] = useState<Realm | null>(null);

  const validateForm = (formData: CreateLanguageDto) => {
    if (!formData.name) return false;
    if (!formData.realmId) return false;
    return true;
  };

  useEffect(() => {
    if (formData) {
      setIsValid(validateForm(formData));
    }
  }, [formData]);

  useEffect(() => {
    if (realm) {
      setFormData({ ...formData, realmId: realm.id });
    }
  }, [realm]);

  useEffect(() => {
    if (realmId) {
      fetchRealm(realmId)
        .then((data) => setRealm(data))
        .catch((err) => showError(err.message));
    }
  }, [realmId, showError]);

  if (!formData || !realm) return <p>Loading...</p>;

  return (
    <>
      <LanguageCreationActions formData={formData} realm={realm} isValid={isValid} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 2 }}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/language.png`} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LanguageCreationAttributes formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
    </>
  );
};

export default LanguageCreation;
