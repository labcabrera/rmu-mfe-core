import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { CategorySeparator, Profession } from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectAccessType from '../../shared/selects/SelectAccessType';
import ProfessionFormAttributes from './ProfessionFormAttributes';
import ProfessionFormProfessionalSkills from './ProfessionFormProfessionalSkills';
import ProfessionFormRealmTypes from './ProfessionFormRealmTypes';
import ProfessionFormSkillCosts from './ProfessionFormSkillCosts';

const ProfessionForm: FC<{
  formData: Profession;
  setFormData: Dispatch<SetStateAction<Profession>>;
  creationMode: boolean;
}> = ({ formData, setFormData, creationMode }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <SelectAccessType
          value={formData.accessType}
          onChange={(value) => setFormData({ ...formData, accessType: value })}
        />
      </Grid>
      <Grid size={12}>
        <ProfessionFormAttributes formData={formData} setFormData={setFormData} creationMode={creationMode} />
      </Grid>
      <Grid size={12}>
        <CategorySeparator text={t('realms')} />
        <ProfessionFormRealmTypes formData={formData} setFormData={setFormData} />
      </Grid>
      <Grid size={12}>
        <CategorySeparator text={t('skill-costs')} />
        <ProfessionFormSkillCosts formData={formData} setFormData={setFormData} />
      </Grid>
      <Grid size={12}>
        <CategorySeparator text={t('professional-skills')} />
        <ProfessionFormProfessionalSkills formData={formData} setFormData={setFormData} />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('description')}
          fullWidth
          multiline
          minRows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </Grid>
    </Grid>
  );
};

export default ProfessionForm;
