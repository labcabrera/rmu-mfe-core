import React, { FC, useState } from 'react';
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
  LoadingState,
  Race,
  RaceTrait,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import AddRaceTraitDialog from './traits/AddRaceTraitDialog';
import ViewTraitDialog from './traits/ViewTraitDialog';

const RaceViewTraits: FC<{
  race: Race;
  setRace: (race: Race) => void;
}> = ({ race, setRace }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTrait, setSelectedTrait] = useState<RaceTrait>();
  const [traitToDelete, setTraitToDelete] = useState<RaceTrait>();

  const getRomanNumeral = (num: number) => {
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return romanNumerals[num - 1] || num.toString();
  };

  const onTraitDialogView = (raceTrait: RaceTrait) => {
    // The dialog shows (and deletes) the race's trait entry, not the trait from the catalog.
    setSelectedTrait(raceTrait);
    setDialogOpen(true);
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
      .catch((err) => notify.error(err));
  };

  if (!race) return <LoadingState />;

  return (
    <>
      <CategorySeparator text={t('traits')}>
        <AddButton onClick={() => setAddDialogOpen(true)} />
      </CategorySeparator>
      {race.traits.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          {t('race-has-no-traits')}
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
        message={t('confirmation-delete-message')}
        open={deleteDialogOpen}
        onDelete={() => onDeleteTrait()}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </>
  );
};

export default RaceViewTraits;
