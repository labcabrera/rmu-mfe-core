import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField } from '@mui/material';
import {
  addRaceTrait,
  AddRaceTraitDto,
  Race,
  TechnicalInfo,
  Trait,
  TraitSelector,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../../ErrorContext';

const EMPTY_TEMPLATE = {
  traitId: '',
  specialization: undefined,
  isTalent: false,
  tier: undefined,
  description: undefined,
};

const AddRaceTraitDialog: FC<{
  race: Race;
  setRace: Dispatch<SetStateAction<Race | undefined>>;
  open: boolean;
  onClose: () => void;
}> = ({ race, setRace, open: open, onClose }) => {
  const { showError } = useError();
  const [trait, setTrait] = useState<Trait | null>();
  const [formData, setFormData] = useState<AddRaceTraitDto>(EMPTY_TEMPLATE);

  const onTraitChange = (trait: Trait | null) => {
    setTrait(trait);
    setFormData({ ...formData, traitId: trait ? trait.id : '' });
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      traitId: trait ? trait.id : '',
      specialization: undefined,
      isTalent: trait?.isTalent ?? false,
      tier: undefined,
      description: undefined,
    }));
  }, [trait]);

  const onSave = () => {
    addRaceTrait(race.id, formData)
      .then((updatedRace) => {
        setRace(updatedRace);
        setFormData(EMPTY_TEMPLATE);
        setTrait(null);
        onClose();
      })
      .catch((err: Error) => showError(err.message));
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
        <DialogTitle>{t('Add trait')}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={1}>
            <TraitSelector
              onTraitChange={(v) => onTraitChange(v)}
              onTierChange={(v) => setFormData({ ...formData, tier: v || undefined })}
              onSpecializationChange={(v) => setFormData({ ...formData, specialization: v || undefined })}
              onError={(err) => showError(err)}
            />
            <Grid size={12}>
              <TextField
                label={t('description')}
                value={formData.description ?? ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value || undefined })}
                fullWidth
                multiline
                rows={3}
                size="small"
              />
            </Grid>
            <Grid size={12}>
              <TechnicalInfo>
                <pre>{JSON.stringify(formData, null, 2)}</pre>
              </TechnicalInfo>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t('Cancel')}</Button>
          <Button onClick={onSave} variant="contained" disabled={!formData.traitId}>
            {t('Add')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddRaceTraitDialog;
