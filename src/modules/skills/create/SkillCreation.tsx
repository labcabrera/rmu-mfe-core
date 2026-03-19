import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { CreateSkillDto } from '../../api/skill.dto';
import { imageBaseUrl } from '../../services/config';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import SkillForm from '../shared/SkillForm';
import SkillCreationActions from './SkillCreationActions';

const SkillCreation: FC = () => {
  const [formData, setFormData] = useState<CreateSkillDto>({
    id: '',
    categoryId: '',
    bonus: [],
    specialization: '',
    accessType: 'public',
  });
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    if (!formData.id) return false;
    if (!formData.categoryId) return false;
    return true;
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  return (
    <>
      <SkillCreationActions formData={formData} isValid={isValid} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 2 }}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/configuration.png`} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <SkillForm formData={formData} setFormData={setFormData} create={true} />
        </Grid>
      </Grid>
      <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
    </>
  );
};

export default SkillCreation;
