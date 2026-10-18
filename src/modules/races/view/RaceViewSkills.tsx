import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import {
  AddButton,
  CategorySeparator,
  DeleteButton,
  DeleteDialog,
  deleteRaceSkillBonus,
  LoadingState,
  Race,
  RaceSkillBonus,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import AddRaceSkillDialog from './skills/AddRaceSkillDialog';

const RaceViewSkills: FC<{
  race: Race;
  setRace: (race: Race) => void;
}> = ({ race, setRace }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<RaceSkillBonus>();

  const onPrepareDelete = (skill: RaceSkillBonus) => {
    setSkillToDelete(skill);
    setDeleteDialogOpen(true);
  };

  const onDeleteSkill = () => {
    if (!skillToDelete) return;
    deleteRaceSkillBonus(race.id, skillToDelete.skillId, skillToDelete.specialization, auth)
      .then((response) => {
        setRace(response);
        setSkillToDelete(undefined);
        setDeleteDialogOpen(false);
      })
      .catch((err) => notify.error(err));
  };

  if (!race) return <LoadingState />;

  return (
    <>
      <CategorySeparator text={t('skills')}>
        <AddButton onClick={() => setAddDialogOpen(true)} />
      </CategorySeparator>
      {race.skillBonuses.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          {t('race-has-no-skills')}
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('skill')}</TableCell>
                <TableCell>{t('specialization')}</TableCell>
                <TableCell>{t('bonus')}</TableCell>
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
        message={t('confirmation-delete-message')}
        open={deleteDialogOpen}
        onDelete={() => onDeleteSkill()}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </>
  );
};

export default RaceViewSkills;
