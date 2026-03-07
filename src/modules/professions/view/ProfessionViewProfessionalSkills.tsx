import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { Profession } from '../../api/profession.dto';

const ProfessionViewProfessionalSkills: FC<{
  profession: Profession;
}> = ({ profession }) => {
  return (
    <Grid container spacing={1} columns={10}>
      TODO
    </Grid>
  );
};

export default ProfessionViewProfessionalSkills;
