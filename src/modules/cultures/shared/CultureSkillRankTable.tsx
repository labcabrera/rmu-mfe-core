import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Table, TableBody, TableContainer, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import {
  CultureSkillRank,
  DeleteButton,
  DeleteDialog,
  useSpecializationLabel,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { cultureSkillRankTarget, cultureSkillRankTypeLabel } from './culture-skill-ranks';

/** Typed skill rank entries of a culture. Entries are deleted by their position in the list. */
const CultureSkillRankTable: FC<{
  entries: CultureSkillRank[] | undefined;
  onDelete?: (index: number) => void;
}> = ({ entries, onDelete }) => {
  const { t } = useTranslation();
  // Spec 050: re-renders when the names of the catalog keys arrive
  useSpecializationLabel();
  const [selectedIndex, setSelectedIndex] = useState<number>();

  if (!entries || entries.length === 0) {
    return <Typography>{t('no-skills-added')}</Typography>;
  }

  const confirmDelete = () => {
    if (selectedIndex === undefined || !onDelete) return;
    onDelete(selectedIndex);
    setSelectedIndex(undefined);
  };

  return (
    <>
      <Paper>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left">{t('type')}</TableCell>
                <TableCell align="left">{t('target')}</TableCell>
                <TableCell align="right">{t('ranks')}</TableCell>
                <TableCell align="right">{t('max-ranks-per-skill')}</TableCell>
                {onDelete && <TableCell align="left"></TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{cultureSkillRankTypeLabel(entry.type, t)}</TableCell>
                  <TableCell>{cultureSkillRankTarget(entry, t)}</TableCell>
                  <TableCell align="right">{entry.ranks}</TableCell>
                  <TableCell align="right">{entry.maxRanksPerSkill}</TableCell>
                  {onDelete && (
                    <TableCell>
                      <DeleteButton onClick={() => setSelectedIndex(index)} />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <DeleteDialog
        message={t('confirmation-delete-message')}
        open={selectedIndex !== undefined}
        onDelete={confirmDelete}
        onClose={() => setSelectedIndex(undefined)}
      />
    </>
  );
};

export default CultureSkillRankTable;
