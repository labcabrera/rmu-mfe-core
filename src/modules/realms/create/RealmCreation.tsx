import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { CreateRealmDto } from '../../api/realm.dto';
import { imageBaseUrl } from '../../services/config';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import RealmCreationActions from './RealmCreationActions';
import RealmCreationAttributes from './RealmCreationAttributes';

const RealmCreation: FC = () => {
  const [formData, setFormData] = useState<CreateRealmDto>({
    name: '',
    shortDescription: undefined,
    description: undefined,
  });
  const [isValid, setIsValid] = useState(false);

  const validateForm = (formData: CreateRealmDto) => {
    if (!formData.name) return false;
    return true;
  };

  useEffect(() => {
    setIsValid(validateForm(formData));
  }, [formData]);

  if (!formData) return <div>Loading...</div>;

  return (
    <>
      <RealmCreationActions formData={formData} isValid={isValid} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 2 }}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/realm.png`} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <RealmCreationAttributes formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
    </>
  );
};

export default RealmCreation;
