import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Button, Stack } from '@mui/material';
import { NumericInput, ResistanceRollQuery } from '@labcabrera-rmu/rmu-react-shared-lib';

const ResistanceRollViewForm: FC<{
  formData: ResistanceRollQuery;
  setFormData: Dispatch<SetStateAction<ResistanceRollQuery>>;
  onRandom: () => void;
}> = ({ formData, setFormData, onRandom }) => {
  const { t } = useTranslation();
  return (
    <>
      <Grid container spacing={1}>
        <Grid size={12}>
          <NumericInput
            label={t('attack-level')}
            value={formData.attackLevel}
            onChange={(value) => setFormData({ ...formData, attackLevel: value || 0 })}
            integer
            min={0}
            max={1000}
          />
        </Grid>
        <Grid size={12}>
          <NumericInput
            label={t('target-level')}
            value={formData.targetLevel}
            onChange={(value) => setFormData({ ...formData, targetLevel: value || 0 })}
            integer
            min={0}
            max={1000}
          />
        </Grid>
        <Grid size={12}>
          <NumericInput
            label={t('other-modifiers')}
            value={formData.modifiers![0].value}
            onChange={(value) => setFormData({ ...formData, modifiers: [{ key: 'other', value: value || 0 }] })}
            integer
            min={0}
            max={1000}
          />
        </Grid>
        <Grid size={12}>
          <NumericInput
            label={t('roll')}
            value={formData.roll}
            onChange={(value) => setFormData({ ...formData, roll: value || 0 })}
            integer
            min={-1000}
            max={1000}
          />
        </Grid>
        <Grid size={12}>
          <Stack spacing={1} direction="row">
            <Button variant="contained" color="primary" onClick={onRandom}>
              {t('random')}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default ResistanceRollViewForm;
