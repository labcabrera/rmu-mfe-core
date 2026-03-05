import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { t } from 'i18next';
import { Race, RaceTrait, AddRaceTraitDto } from '../../../api/race.dto';
import { fetchTraits } from '../../../api/trait';
import { Trait } from '../../../api/trait.dto';
import AddButton from '../../../shared/buttons/AddButton';

const AddRaceTraitDialog: FC<{
  race: Race;
  setRace: Dispatch<SetStateAction<Race>>;
  open: boolean;
  onClose: () => void;
}> = ({ race, setRace, open: open, onClose }) => {
  const [traits, setTraits] = useState<Trait[]>([]);
  const [formData, setFormData] = useState<AddRaceTraitDto>({
    traitId: '',
    specialization: undefined,
    isTalent: false,
    tier: undefined,
    description: undefined,
  });

  useEffect(() => {
    fetchTraits('', 0, 200)
      .then((res) => setTraits(res))
      .catch(() => setTraits([]));
  }, []);

  const closeDialog = () => {
    onClose();
  };

  const onSave = () => {
    if (!formData.traitId) return;

    // Compose a RaceTrait from AddRaceTraitDto (local id generation)
    const newTrait: RaceTrait = {
      id: `local-${Date.now()}`,
      traitId: formData.traitId,
      modifier: formData.specialization
        ? formData.specialization
        : formData.tier !== undefined
          ? String(formData.tier)
          : undefined,
      description: formData.description,
    };

    const newRace: Race = { ...race, traits: [...(race.traits || []), newTrait] };
    setRace(newRace);
    closeDialog();
  };

  return (
    <>
      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>{t('add_trait')}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                select
                label={t('trait')}
                value={formData.traitId}
                fullWidth
                onChange={(e) => setFormData({ ...formData, traitId: e.target.value })}
              >
                <MenuItem value="">
                  <em>{t('select')}</em>
                </MenuItem>
                {traits.map((tr) => (
                  <MenuItem key={tr.id} value={tr.id}>
                    {tr.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label={t('specialization')}
                value={formData.specialization ?? ''}
                fullWidth
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value || undefined })}
                size="small"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isTalent}
                    onChange={(e) => setFormData({ ...formData, isTalent: e.target.checked })}
                  />
                }
                label={t('is_talent')}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label={t('tier')}
                type="number"
                value={formData.tier ?? ''}
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, tier: e.target.value === '' ? undefined : Number(e.target.value) })
                }
                size="small"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>{t('cancel')}</Button>
          <Button onClick={onSave} variant="contained" disabled={!formData.traitId}>
            {t('add')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddRaceTraitDialog;
