import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { CategorySeparator } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { CreateProfessionDto, UpdateProfessionDto } from '../../api/profession.dto';
import SelectAccessType from '../../shared/selects/SelectAccessType';
import ProfessionFormAttributes from './ProfessionFormAttributes';
import ProfessionFormProfessionalSkills from './ProfessionFormProfessionalSkills';
import ProfessionFormRealmTypes from './ProfessionFormRealmTypes';
import ProfessionFormSkillCosts from './ProfessionFormSkillCosts';

const ProfessionForm: FC<{
  formData: CreateProfessionDto | UpdateProfessionDto;
  setFormData: Dispatch<SetStateAction<CreateProfessionDto | UpdateProfessionDto | undefined>>;
  creationMode: boolean;
}> = ({ formData, setFormData, creationMode }) => {
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
        <CategorySeparator text={t('Realms')} />
        <ProfessionFormRealmTypes formData={formData} setFormData={setFormData} />
      </Grid>
      <Grid size={12}>
        <CategorySeparator text={t('Skill costs')} />
        <ProfessionFormSkillCosts formData={formData} setFormData={setFormData} />
      </Grid>
      <Grid size={12}>
        <CategorySeparator text={t('Professional skills')} />
        <ProfessionFormProfessionalSkills formData={formData} setFormData={setFormData} />
      </Grid>
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
  );
};

export default ProfessionForm;
