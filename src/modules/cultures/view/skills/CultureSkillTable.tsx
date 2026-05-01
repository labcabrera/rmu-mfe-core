import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import {
  Culture,
  CultureSkillRank,
  DeleteButton,
  deleteCultureFixedSkillRank,
  DeleteDialog,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../../ErrorContext';

const CultureSkillTable: FC<{
  culture: Culture;
  setCulture: Dispatch<SetStateAction<Culture>>;
}> = ({ culture, setCulture }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const [selectedSkill, setSelectedSkill] = useState<CultureSkillRank>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const openDeleteSkillDialog = (skill: CultureSkillRank) => {
    setSelectedSkill(skill);
    setDeleteDialogOpen(true);
  };

  const deleteSkill = () => {
    if (!selectedSkill) return;
    deleteCultureFixedSkillRank(culture.id, selectedSkill.skillId, selectedSkill.specialization, auth)
      .then((response) => {
        setCulture(response);
        setDeleteDialogOpen(false);
        setSelectedSkill(undefined);
      })
      .catch((err) => showError(err.message));
  };

  if (!culture.fixedSkillRanks || culture.fixedSkillRanks.length === 0) {
    return <Typography>No skills added</Typography>;
  }

  return (
    <>
      <Paper>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">{t('skill')}</TableCell>
              <TableCell align="left">{t('specialization')}</TableCell>
              <TableCell align="left">{t('ranks')}</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {culture.fixedSkillRanks.map((skill, index) => (
              <TableRow key={index}>
                <TableCell>{t(skill.skillId)}</TableCell>
                <TableCell>{t(skill.specialization || '-')}</TableCell>
                <TableCell>{skill.ranks}</TableCell>
                <TableCell>
                  <DeleteButton onClick={() => openDeleteSkillDialog(skill)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <DeleteDialog
        message={`Are you sure you want to delete skill ${selectedSkill?.skillId}? This action cannot be undone.`}
        open={deleteDialogOpen}
        onDelete={() => deleteSkill()}
        onClose={() => setDeleteDialogOpen(false)}
      ></DeleteDialog>
    </>
  );
};

export default CultureSkillTable;
