import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { EditableAvatar, TechnicalInfo, Culture } from '@labcabrera-rmu/rmu-react-shared-lib';
import { imageBaseUrl } from '../../services/config';
import { gridSizeMain, gridSizeResume } from '../../services/display';
import CultureForm from '../shared/CultureForm';
import CultureCreationActions from './CultureCreationActions';

const EMPTY_CULTURE = {
  name: '',
  description: '',
  imageUrl: `${imageBaseUrl}images/generic/cultures.png`,
  accessType: 'private',
} as Culture;

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
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}>
          <EditableAvatar
            imageUrl={formData.imageUrl || ''}
            onImageChange={(avatar) => setFormData({ ...formData, imageUrl: avatar })}
          />
        </Grid>
        <Grid size={gridSizeMain}>
          <CultureCreationActions formData={formData} isValid={isValid} />
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
