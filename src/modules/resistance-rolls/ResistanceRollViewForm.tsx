import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { NumericInput, OPEN_D100, ResistanceRollQuery, RollField } from '@labcabrera-rmu/rmu-react-shared-lib';

const ResistanceRollViewForm: FC<{
  formData: ResistanceRollQuery;
  setFormData: Dispatch<SetStateAction<ResistanceRollQuery>>;
}> = ({ formData, setFormData }) => {
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
          <RollField
            spec={OPEN_D100}
            value={formData.roll || null}
            onChange={(value) => setFormData({ ...formData, roll: value.total })}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ResistanceRollViewForm;
