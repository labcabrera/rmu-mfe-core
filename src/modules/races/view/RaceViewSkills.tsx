import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Grid, Table, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Race, RaceSkillBonus } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';

const RaceViewSkills: FC<{
  race: Race;
  setRace: Dispatch<SetStateAction<Race | undefined>>;
}> = ({ race, setRace }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<RaceSkillBonus>();

  if (!race) return <p>Loading...</p>;

  if (!race.skillBonuses || race.skillBonuses.length === 0) {
    return (
      <Grid size={12}>
        <Typography variant="body1" color="textSecondary">
          Race has no skills.
        </Typography>
      </Grid>
    );
  }

  return (
    <>
      <Grid container spacing={1}>
        <Table>
          <TableHead>
            <TableCell>{t('Skill')}</TableCell>
            <TableCell>{t('Specialization')}</TableCell>
            <TableCell>{t('Bonus')}</TableCell>
            <TableCell></TableCell>
          </TableHead>
        </Table>
        {race.skillBonuses.map((skill, index) => (
          <TableRow key={index}>
            <TableCell>{t(skill.skillId)}</TableCell>
            <TableCell>{skill.specialization ? t(skill.specialization) : '-'}</TableCell>
            <TableCell>{skill.bonus}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </Grid>
    </>
  );
};

export default RaceViewSkills;
