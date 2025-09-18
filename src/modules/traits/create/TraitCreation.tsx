import React, { FC, useEffect, useState } from 'react';
import { CreateTraitDto, Trait } from '../../api/trait.dto';
import TraitCreationActions from './TraitCreationActions';
import TraitCreationAttributes from './TraitCreationAttributes';

const template = {
  id: '',
  isTalent: true,
  requiresSpecialization: false,
  cost: undefined,
  description: '',
} as Trait;

const TraitCreation: FC = () => {
  const [formData, setFormData] = useState<CreateTraitDto>(template);
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    if (!formData.id) return false;
    return true;
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  return (
    <>
      <TraitCreationActions formData={formData} isValid={isValid} />
      <TraitCreationAttributes formData={formData} setFormData={setFormData} />
      <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
    </>
  );
};

export default TraitCreation;
