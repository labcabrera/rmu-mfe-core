import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { CreateRealmDto } from '../../api/realm.dto';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import RealmCreationActions from './RealmCreationActions';
import RealmCreationAttributes from './RealmCreationAttributes';
import RealmCreationResume from './RealmCreationResume';

const RealmCreation: FC = () => {
  const [formData, setFormData] = useState<CreateRealmDto>({
    name: null,
    shortDescription: null,
    description: null,
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
        <Grid size={2}>
          <GenericAvatar imageUrl="/static/images/generic/realm.png" size={300} />
          <RealmCreationResume formData={formData!} setFormData={setFormData} />
        </Grid>
        <Grid size={8}>
          <RealmCreationAttributes formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
    </>
  );
};

export default RealmCreation;
