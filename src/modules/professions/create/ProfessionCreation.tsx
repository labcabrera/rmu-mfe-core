import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import { CreateProfessionDto } from '../../api/profession.dto';
import EdditableAvatar from '../../shared/avatars/EditableAvatar';
import CharacterSeparator from '../../shared/display/CategorySeparator';
import ProfessionCreationActions from './ProfessionCreationActions';
import ProfessionCreationAttributes from './ProfessionCreationAttributes';

const TEMPLATE = {
  id: '',
  imageUrl: '',
} as CreateProfessionDto;

const ProfessionCreation: FC = () => {
  const [formData, setFormData] = useState<CreateProfessionDto>(TEMPLATE);
  const [isValid, setIsValid] = useState(false);

  const validateForm = (formData: CreateProfessionDto) => {
    if (!formData.id) return false;
    return true;
  };

  useEffect(() => {
    setIsValid(validateForm(formData));
  }, [formData]);

  if (!formData) return <div>Loading...</div>;

  return (
    <>
      <ProfessionCreationActions formData={formData} isValid={isValid} />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}>
          <EdditableAvatar
            imageUrl={formData.imageUrl || ''}
            onImageChange={(avatar) => setFormData({ ...formData, imageUrl: avatar })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <ProfessionCreationAttributes formData={formData} setFormData={setFormData} />
          <CharacterSeparator text={t('statistics')} />
        </Grid>
      </Grid>
      <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
    </>
  );
};

export default ProfessionCreation;
