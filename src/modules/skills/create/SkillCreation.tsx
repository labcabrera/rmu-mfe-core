import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { CreateSkillDto } from '../../api/skill.dto';
import { imageBaseUrl } from '../../services/config';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import SkillCreationActions from './SkillCreationActions';
import SkillCreationAttributes from './SkillCreationAttributes';

const SkillCreation: FC = () => {
  const [formData, setFormData] = useState<CreateSkillDto>({
    id: '',
    categoryId: '',
    bonus: [],
    specialization: null,
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
        <Grid size={2}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/configuration.png`} />
        </Grid>
        <Grid size={7}>
          <SkillCreationAttributes formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
      <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
    </>
  );
};

export default SkillCreation;
