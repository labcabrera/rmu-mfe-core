import React, { Dispatch, FC, SetStateAction } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../../ErrorContext';
import { deleteRaceTrait } from '../../../api/race';
import { Race, RaceTrait } from '../../../api/race.dto';

const ViewTraitDialog: FC<{
  race: Race;
  setRace: Dispatch<SetStateAction<Race | undefined>>;
  trait: RaceTrait | null;
  open: boolean;
  onClose: () => void;
}> = ({ race, setRace, trait, open, onClose }) => {
  const { showError } = useError();

  if (!trait) return null;

  const onDelete = () => {
    if (!trait) return;
    deleteRaceTrait(race.id, trait.id)
      .then((updated) => {
        setRace(updated);
        onClose();
      })
      .catch((err: Error) => showError(err.message));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t(trait.traitId)}</DialogTitle>
      <DialogContent dividers>
        {!trait ? (
          <Typography color="textSecondary">{t('no-data')}</Typography>
        ) : (
          <Grid container spacing={2} sx={{ pt: 1 }}>
            {trait.modifier && (
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2">{t('modifier')}</Typography>
                <Typography>{trait.modifier}</Typography>
              </Grid>
            )}
            {trait.description && (
              <Grid size={{ xs: 12 }}>
                <Typography color="secondary">{trait.description}</Typography>
              </Grid>
            )}
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('close') || 'Close'}</Button>
        <Button color="error" variant="contained" onClick={onDelete} disabled={!trait}>
          {t('delete') || 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewTraitDialog;
