import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { CreateSkillDto } from '../../api/skill.dto';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import TechnicalInfo from '../../shared/display/TechnicalInfo';
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
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <SkillForm formData={formData} setFormData={setFormData} create={true} />
        </Grid>
      </Grid>
      <TechnicalInfo>
        <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
      </TechnicalInfo>
    </>
  );
};

export default SkillCreation;
