import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { CreateProfessionDto } from '../../api/profession.dto';
import { imageBaseUrl } from '../../services/config';
import EdditableAvatar from '../../shared/avatars/EditableAvatar';
import TechnicalInfo from '../../shared/display/TechnicalInfo';
import ProfessionForm from '../shared/ProfessionForm';
import ProfessionCreationActions from './ProfessionCreationActions';

const TEMPLATE = {
  id: '',
  archetype: 'non-spellcaster',
  fixedRealmTypes: [],
  availableRealmTypes: [],
  skillCosts: {
    animal: [],
    awareness: [],
    'battle-expertise': [],
    'body-discipline': [],
    brawn: [],
    'combat-expertise': [],
    combat1: [],
    combat2: [],
    combat3: [],
    combat4: [],
    composition: [],
    crafting: [],
    delving: [],
    environmental: [],
    gymnastic: [],
    lore: [],
    'magical-expertise': [],
    medical: [],
    'mental-discipline': [],
    movement: [],
    'performance-art': [],
    'power-manipulation': [],
    science: [],
    social: [],
    'spells-base-open': [],
    'spells-ritual-magic': [],
    'spells-closed': [],
    'spells-arcane': [],
    'spells-restricted': [],
    subterfuge: [],
    technical: [],
    vocation: [],
  },
  professionalSkills: [],
  description: '',
  imageUrl: `${imageBaseUrl}images/generic/configuration.png`,
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
          <ProfessionForm formData={formData} setFormData={setFormData} creationMode={true} />
          <TechnicalInfo>
            <pre>FormData: {JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfessionCreation;
