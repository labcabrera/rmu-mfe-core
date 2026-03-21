import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, Button, Stack } from '@mui/material';
import { t } from 'i18next';
import { ResistanceRollQuery } from '../api/resistance-roll.dto';
import { NumericInput } from '../shared/inputs/NumericInput';

const ResistanceRollViewForm: FC<{
  formData: ResistanceRollQuery;
  setFormData: Dispatch<SetStateAction<ResistanceRollQuery>>;
  onRandom: () => void;
}> = ({ formData, setFormData, onRandom }) => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid size={12}>
          <NumericInput
            label={t('Attack level')}
            value={formData.attackLevel}
            onChange={(value) => setFormData({ ...formData, attackLevel: value || 0 })}
            integer
            min={0}
            max={1000}
          />
        </Grid>
        <Grid size={12}>
          <NumericInput
            label={t('Target level')}
            value={formData.targetLevel}
            onChange={(value) => setFormData({ ...formData, targetLevel: value || 0 })}
            integer
            min={0}
            max={1000}
          />
        </Grid>
        <Grid size={12}>
          <NumericInput
            label={t('Other modifiers')}
            value={formData.modifiers![0].value}
            onChange={(value) => setFormData({ ...formData, modifiers: [{ key: 'other', value: value || 0 }] })}
            integer
            min={0}
            max={1000}
          />
        </Grid>
        <Grid size={12}>
          <NumericInput
            label={t('Roll')}
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
              {t('Random')}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default ResistanceRollViewForm;
