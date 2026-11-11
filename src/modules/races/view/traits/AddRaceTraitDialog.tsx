import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Button, Grid, TextField } from '@mui/material';
import {
  addRaceTrait,
  AddRaceTraitDto,
  Race,
  RmuDialog,
  TechnicalInfo,
  Trait,
  TraitSelector,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';

const EMPTY_TEMPLATE = {
  traitId: '',
  specialization: undefined,
  isTalent: false,
  tier: undefined,
  description: undefined,
};

const AddRaceTraitDialog: FC<{
  race: Race;
  setRace: (race: Race) => void;
  open: boolean;
  onClose: () => void;
}> = ({ race, setRace, open: open, onClose }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
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
    addRaceTrait(race.id, formData, auth)
      .then((updatedRace) => {
        setRace(updatedRace);
        setFormData(EMPTY_TEMPLATE);
        setTrait(null);
        onClose();
      })
      .catch((err: Error) => notify.error(err));
  };

  return (
    <>
      <RmuDialog
        open={open}
        title={t('add-trait')}
        maxWidth="md"
        onDismiss={onClose}
        buttons={[
          <Button key="cancel" onClick={onClose}>
            {t('cancel')}
          </Button>,
          <Button key="add" onClick={onSave} variant="contained" disabled={!formData.traitId}>
            {t('add')}
          </Button>,
        ]}
      >
        <Grid container spacing={1}>
          <TraitSelector
            onTraitChange={(v) => onTraitChange(v)}
            onTierChange={(v) => setFormData({ ...formData, tier: v || undefined })}
            onSpecializationChange={(v) => setFormData({ ...formData, specialization: v || undefined })}
            onError={(err) => notify.error(err)}
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
      </RmuDialog>
    </>
  );
};

export default AddRaceTraitDialog;
