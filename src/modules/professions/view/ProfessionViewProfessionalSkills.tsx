import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Chip, Grid } from '@mui/material';
import { Profession } from '@labcabrera-rmu/rmu-react-shared-lib';

const ProfessionViewProfessionalSkills: FC<{
  profession: Profession;
}> = ({ profession }) => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={1} columns={10}>
      {profession.professionalSkills.map((skill, index) => (
        <Chip key={index} label={t(skill)} color="primary" />
      ))}
    </Grid>
  );
};

export default ProfessionViewProfessionalSkills;
