import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Skill, TechnicalInfo } from '@labcabrera-rmu/rmu-react-shared-lib';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import SkillForm from '../form/SkillForm';
import SkillCreationActions from './SkillCreationActions';

const SkillCreation: FC = () => {
  const [formData, setFormData] = useState<Skill>({
    id: '',
    categoryId: '',
    bonus: [],
    specialization: '',
    accessType: 'public',
  } as unknown as Skill);
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
      <Grid container spacing={2}>
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <SkillCreationActions formData={formData} isValid={isValid} />
          <SkillForm formData={formData} setFormData={setFormData} create={true} />
          <TechnicalInfo>
            <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default SkillCreation;
