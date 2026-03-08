import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../../ErrorContext';
import { addRaceTrait } from '../../../api/race';
import { Race, AddRaceTraitDto } from '../../../api/race.dto';
import { fetchTraits } from '../../../api/trait';
import { Trait } from '../../../api/trait.dto';
import { NumericInput } from '../../../shared/inputs/NumericInput';
import SelectTrait from '../../../shared/selects/SelectTrait';
import SelectTraitCategory from '../../../shared/selects/SelectTraitCategory';

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
  const [traitCategory, setTraitCategory] = useState<string | null>(null);
  const [trait, setTrait] = useState<Trait | null>();
  const [traits, setTraits] = useState<Trait[]>([]);
  const [formData, setFormData] = useState<AddRaceTraitDto>(EMPTY_TEMPLATE);

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

  const bindTraits = () => {
    const rsql = traitCategory ? `category==${traitCategory}` : '';
    fetchTraits(rsql, 0, 1000)
      .then((res) => setTraits(res))
      .catch(() => setTraits([]));
  };

  useEffect(() => {
    bindTraits();
  }, [traitCategory]);

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
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <SelectTraitCategory
                label={t('Category')}
                value={traitCategory}
                name="traitCategory"
                onChange={(e) => setTraitCategory(e.target.value || null)}
                addAllOption
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <SelectTrait
                label={t('Trait')}
                value={formData.traitId}
                name="trait"
                onChange={(trait) => setTrait(trait)}
                traits={traits}
                required
              />
            </Grid>

            {trait && (
              <>
                {trait.specialization !== 'none' && (
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      label={t('Specialization')}
                      value={formData.specialization ?? ''}
                      fullWidth
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value || undefined })}
                      size="small"
                      error={trait.specialization !== 'none' && !formData.specialization}
                    />
                  </Grid>
                )}

                {trait.isTierBased && (
                  <Grid size={{ xs: 12 }}>
                    <NumericInput
                      label={t('Tier')}
                      value={formData.tier || null}
                      onChange={(value) => setFormData({ ...formData, tier: value || undefined })}
                    />
                  </Grid>
                )}

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
              </>
            )}
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
