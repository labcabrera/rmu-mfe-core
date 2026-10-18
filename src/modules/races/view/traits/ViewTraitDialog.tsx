import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Typography } from '@mui/material';
import { deleteRaceTrait, Race, RaceTrait, useNotify } from '@labcabrera-rmu/rmu-react-shared-lib';

const ViewTraitDialog: FC<{
  race: Race;
  setRace: (race: Race) => void;
  trait: RaceTrait | null;
  open: boolean;
  onClose: () => void;
}> = ({ race, setRace, trait, open, onClose }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();

  if (!trait) return null;

  const onDelete = () => {
    if (!trait) return;
    deleteRaceTrait(race.id, trait.id, auth)
      .then((updated) => {
        setRace(updated);
        onClose();
      })
      .catch((err: Error) => notify.error(err));
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
        <Button onClick={onClose}>{t('cancel')}</Button>
        <Button color="error" variant="contained" onClick={onDelete} disabled={!trait}>
          {t('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewTraitDialog;
