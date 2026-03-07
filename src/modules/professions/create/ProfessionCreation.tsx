import React, { FC, useEffect, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { CreateProfessionDto } from '../../api/profession.dto';
import { imageBaseUrl } from '../../services/config';
import EdditableAvatar from '../../shared/avatars/EditableAvatar';
import CharacterSeparator from '../../shared/display/CategorySeparator';
import ProfessionCreationActions from './ProfessionCreationActions';
import ProfessionCreationAttributes from './ProfessionCreationAttributes';
import ProfessionCreationProfessionalSkills from './ProfessionCreationProfessionalSkills';
import ProfessionCreationSkillCosts from './ProfessionCreationSkillCosts';

const TEMPLATE = {
  id: '',
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
          <ProfessionCreationAttributes formData={formData} setFormData={setFormData} />
          <CharacterSeparator text={t('Skill costs')} />
          <ProfessionCreationSkillCosts formData={formData} setFormData={setFormData} />
          <CharacterSeparator text={t('Professional skills')} />
          <ProfessionCreationProfessionalSkills formData={formData} setFormData={setFormData} />
          <Grid size={12}>
            <TextField
              label={t('Description')}
              fullWidth
              multiline
              minRows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Grid>
        </Grid>
      </Grid>
      <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
    </>
  );
};

export default ProfessionCreation;
