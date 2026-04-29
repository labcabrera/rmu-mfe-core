import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import HelpIcon from '@mui/icons-material/Help';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  AddButton,
  CategorySeparator,
  DeleteButton,
  DeleteDialog,
  deleteRaceTrait,
  fetchTrait,
  Race,
  RaceTrait,
  Trait,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import AddRaceTraitDialog from './traits/AddRaceTraitDialog';
import ViewTraitDialog from './traits/ViewTraitDialog';

const RaceViewTraits: FC<{
  race: Race;
  setRace: Dispatch<SetStateAction<Race | undefined>>;
}> = ({ race, setRace }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTrait, setSelectedTrait] = useState<Trait>();
  const [traitToDelete, setTraitToDelete] = useState<RaceTrait>();

  const getRomanNumeral = (num: number) => {
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return romanNumerals[num - 1] || num.toString();
  };

  const onTraitDialogView = (raceTrait: RaceTrait) => {
    fetchTrait(raceTrait.traitId, auth)
      .then(setSelectedTrait)
      .then(() => setDialogOpen(true))
      .catch((err) => showError(err.message));
  };

  const onPrepareDelete = (raceTrait: RaceTrait) => {
    setTraitToDelete(raceTrait);
    setDeleteDialogOpen(true);
  };

  const onDeleteTrait = () => {
    deleteRaceTrait(race.id, traitToDelete!.id, auth)
      .then((response) => {
        setRace(response);
        setTraitToDelete(undefined);
        setDeleteDialogOpen(false);
      })
      .catch((err) => showError(err.message));
  };

  if (!race) return <p>Loading...</p>;

  return (
    <>
      <CategorySeparator text={t('traits')}>
        <AddButton onClick={() => setAddDialogOpen(true)} />
      </CategorySeparator>
      {race.traits.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          Race has no traits.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('trait')}</TableCell>
                <TableCell>{t('tier')}</TableCell>
                <TableCell>{t('description')}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {race.traits.map((trait, index) => (
                <TableRow key={index}>
                  <TableCell>{t(trait.traitId)}</TableCell>
                  <TableCell>{trait.tier ? getRomanNumeral(trait.tier) : '-'}</TableCell>
                  <TableCell>{trait.description}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => onTraitDialogView(trait)} color="primary">
                      <HelpIcon />
                    </IconButton>
                    <DeleteButton onClick={() => onPrepareDelete(trait)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {selectedTrait && (
        <ViewTraitDialog
          race={race}
          setRace={setRace}
          trait={selectedTrait}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      )}
      <AddRaceTraitDialog open={addDialogOpen} race={race} setRace={setRace} onClose={() => setAddDialogOpen(false)} />
      <DeleteDialog
        message={`Are you sure you want to delete skill ${t(traitToDelete?.traitId || '')}? This action cannot be undone`}
        open={deleteDialogOpen}
        onDelete={() => onDeleteTrait()}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </>
  );
};

export default RaceViewTraits;
