import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { CreateTraitDto, Trait } from '../../api/trait.dto';
import TraitCreationActions from './TraitCreationActions';
import TraitCreationAttributes from './TraitCreationAttributes';

const template = {
  name: '',
  isTalent: true,
  requiresSpecialization: false,
  isTierBased: false,
  maxTier: null,
  adquisitionCost: null,
  tierCost: null,
  description: '',
} as Trait;

const TraitCreation: FC = () => {
  const [formData, setFormData] = useState<CreateTraitDto>(template);
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    if (!formData.name) return false;
    return true;
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  return (
    <>
      <TraitCreationActions formData={formData} isValid={isValid} />
      <Grid container spacing={1}>
        <Grid size={6}>
          <TraitCreationAttributes formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
      {/* <pre>Form: {JSON.stringify(formData, null, 2)}</pre> */}
    </>
  );
};

export default TraitCreation;
