import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { CreateRealmDto } from '../../api/realm.dto';
import { imageBaseUrl } from '../../services/config';
import EditableAvatar from '../../shared/avatars/EditableAvatar';
import RealmCreationActions from './RealmCreationActions';
import RealmCreationAttributes from './RealmCreationAttributes';

const RealmCreation: FC = () => {
  const [formData, setFormData] = useState<CreateRealmDto>({
    name: '',
    shortDescription: undefined,
    description: undefined,
    imageUrl: `${imageBaseUrl}images/generic/realm.png`,
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
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}>
          <EditableAvatar
            imageUrl={formData.imageUrl!}
            onImageChange={(newImageUrl) => setFormData({ ...formData, imageUrl: newImageUrl })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <RealmCreationAttributes formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
    </>
  );
};

export default RealmCreation;
