import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { EditableAvatar, TechnicalInfo, Culture } from '@labcabrera-rmu/rmu-react-shared-lib';
import { getAvatarImages } from '../../services/image-service';
import CultureForm from '../shared/CultureForm';
import CultureCreationActions from './CultureCreationActions';

const EMPTY_CULTURE = {} as Culture;

const CultureCreation: FC = () => {
  const [formData, setFormData] = useState<Culture>(EMPTY_CULTURE);
  const [isValid, setIsValid] = useState(false);

  const validateForm = (formData: Culture) => {
    if (!formData.name) return false;
    if (!formData.accessType) return false;
    return true;
  };

  useEffect(() => {
    setIsValid(validateForm(formData));
  }, [formData]);

  return (
    <>
      <CultureCreationActions formData={formData} isValid={isValid} />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}>
          <EditableAvatar
            imageUrl={formData.imageUrl || ''}
            onImageChange={(avatar) => setFormData({ ...formData, imageUrl: avatar })}
            images={getAvatarImages()}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CultureForm formData={formData} setFormData={setFormData} />
          <TechnicalInfo>
            <pre>FormData: {JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default CultureCreation;
