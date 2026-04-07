import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import {
  AddButton,
  CategorySeparator,
  DeleteButton,
  DeleteDialog,
  deleteRaceSkillBonus,
  Race,
  RaceSkillBonus,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import AddRaceSkillDialog from './skills/AddRaceSkillDialog';

const RaceViewSkills: FC<{
  race: Race;
  setRace: Dispatch<SetStateAction<Race | undefined>>;
}> = ({ race, setRace }) => {
  const { showError } = useError();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<RaceSkillBonus>();

  const onPrepareDelete = (skill: RaceSkillBonus) => {
    setSkillToDelete(skill);
    setDeleteDialogOpen(true);
  };

  const onDeleteSkill = () => {
    if (!skillToDelete) return;
    deleteRaceSkillBonus(race.id, skillToDelete.skillId, skillToDelete.specialization)
      .then((response) => {
        setRace(response);
        setSkillToDelete(undefined);
        setDeleteDialogOpen(false);
      })
      .catch((err) => showError(err.message));
  };

  if (!race) return <p>Loading...</p>;

  return (
    <>
      <CategorySeparator text={t('Skills')}>
        <AddButton onClick={() => setAddDialogOpen(true)} />
      </CategorySeparator>
      {race.skillBonuses.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          Race has no skills.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('Skill')}</TableCell>
                <TableCell>{t('Specialization')}</TableCell>
                <TableCell>{t('Bonus')}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {race.skillBonuses.map((skill, index) => (
                <TableRow key={index}>
                  <TableCell>{t(skill.skillId)}</TableCell>
                  <TableCell>{skill.specialization ? t(skill.specialization) : '-'}</TableCell>
                  <TableCell>{skill.bonus}</TableCell>
                  <TableCell>
                    <DeleteButton onClick={() => onPrepareDelete(skill)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <AddRaceSkillDialog race={race} setRace={setRace} open={addDialogOpen} onClose={() => setAddDialogOpen(false)} />
      <DeleteDialog
        message={`Are you sure you want to delete skill ${t(skillToDelete?.skillId || '')}? This action cannot be undone`}
        open={deleteDialogOpen}
        onDelete={() => onDeleteSkill()}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </>
  );
};

export default RaceViewSkills;
