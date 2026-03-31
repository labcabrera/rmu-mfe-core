import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { EditableAvatar } from '@labcabrera-rmu/rmu-react-shared-lib';
import { CreateRealmDto } from '../../api/realm.dto';
import { DEFAULT_REALM_IMAGE, getAvatarImages } from '../../services/image-service';
import TechnicalInfo from '../../shared/display/TechnicalInfo';
import RealmForm from '../shared/RealmForm';
import RealmCreationActions from './RealmCreationActions';

const RealmCreation: FC = () => {
  const [formData, setFormData] = useState<CreateRealmDto>({
    imageUrl: DEFAULT_REALM_IMAGE,
  } as CreateRealmDto);
  const [isValid, setIsValid] = useState(false);

  const validateForm = (formData: CreateRealmDto) => {
    if (!formData.name) return false;
    if (!formData.accessType) return false;
    if (!formData.magicPresence) return false;
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
            imageUrl={formData.imageUrl || DEFAULT_REALM_IMAGE}
            onImageChange={(newImageUrl) => setFormData({ ...formData, imageUrl: newImageUrl })}
            images={getAvatarImages()}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <RealmForm formData={formData} setFormData={setFormData} />
          <TechnicalInfo>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default RealmCreation;
