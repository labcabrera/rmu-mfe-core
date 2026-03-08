import React, { FC } from 'react';
import { Chip, Grid } from '@mui/material';
import { t } from 'i18next';
import { Profession } from '../../api/profession.dto';

const ProfessionViewProfessionalSkills: FC<{
  profession: Profession;
}> = ({ profession }) => {
  return (
    <Grid container spacing={1} columns={10}>
      {profession.professionalSkills.map((skill, index) => (
        <Chip key={`professional-skill-${index}`} label={t(skill)} />
      ))}
    </Grid>
  );
};

export default ProfessionViewProfessionalSkills;
