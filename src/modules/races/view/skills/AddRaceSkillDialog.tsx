/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField } from '@mui/material';
import {
  addRaceSkillBonus,
  NumericInput,
  Race,
  RaceSkillBonus,
  TechnicalInfo,
  SkillSelector,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../../ErrorContext';

const EMPTY_TEMPLATE = {
  skillId: '',
  specialization: null,
  bonus: 0,
};

const AddRaceSkillDialog: FC<{
  race: Race;
  setRace: Dispatch<SetStateAction<Race | undefined>>;
  open: boolean;
  onClose: () => void;
}> = ({ race, setRace, open: open, onClose }) => {
  const { showError } = useError();
  const [formData, setFormData] = useState<RaceSkillBonus>(EMPTY_TEMPLATE);
  const [validForm, setValidForm] = useState<boolean>(false);

  const isValidForm = () => {
    if (!formData.skillId || formData.skillId === '') return false;
    return true;
  };

  const onSave = () => {
    addRaceSkillBonus(race.id, formData)
      .then((updatedRace) => {
        setRace(updatedRace);
        setFormData(EMPTY_TEMPLATE);
        onClose();
      })
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    setValidForm(isValidForm());
  }, [formData]);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
        <DialogTitle>{t('Add skill')}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid size={{ xs: 12, md: 12 }}>
              <SkillSelector
                realmId={race.realm.id}
                onSkillChange={(s) => setFormData({ ...formData, skillId: s || '', specialization: null })}
                onSpecializationChange={(s) => setFormData({ ...formData, specialization: s })}
                onError={(err) => showError(err)}
                t={(label) => t(label)}
              />
            </Grid>
            <Grid size={12}>
              <NumericInput
                label={t('Bonus')}
                value={formData.bonus}
                onChange={(v) => setFormData({ ...formData, bonus: v || 0 })}
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
          <Button onClick={onSave} variant="contained" disabled={!validForm}>
            {t('Add')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddRaceSkillDialog;
