import React, { FC, useEffect, useState } from 'react';
import { Grid, Paper } from '@mui/material';
import { TechnicalInfo, Trait } from '@labcabrera-rmu/rmu-react-shared-lib';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import TraitForm from '../shared/TraitForm';
import TraitCreationActions from './TraitCreationActions';

const template = {
  name: '',
  isTalent: true,
  specialization: 'none',
  isTierBased: false,
  maxTier: null,
  adquisitionCost: null,
  tierCost: null,
  description: '',
} as unknown as Trait;

const TraitCreation: FC = () => {
  const [formData, setFormData] = useState<Trait>(template);
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    if (!formData.name) return false;
    return true;
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  return (
    <Grid container spacing={1}>
      <Grid size={gridSizeResume}></Grid>
      <Grid size={gridSizeMain}>
        <TraitCreationActions formData={formData} isValid={isValid} />
        <Paper sx={{ p: 2 }}>
          <TraitForm formData={formData} setFormData={setFormData} />
        </Paper>
        <TechnicalInfo>
          <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
        </TechnicalInfo>
      </Grid>
    </Grid>
  );
};

export default TraitCreation;
