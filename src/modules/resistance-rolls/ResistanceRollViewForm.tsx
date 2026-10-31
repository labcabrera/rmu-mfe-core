import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { NumericInput, OPEN_D100, ResistanceRollQuery, RollField } from '@labcabrera-rmu/rmu-react-shared-lib';

/** Levels of the attack and the target, other modifiers (negative too) and the open-ended roll. */
const ResistanceRollViewForm: FC<{
  formData: ResistanceRollQuery;
  setFormData: Dispatch<SetStateAction<ResistanceRollQuery>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
      <NumericInput
        label={t('attack-level')}
        value={formData.attackLevel}
        onChange={(value) => setFormData({ ...formData, attackLevel: value ?? null })}
        integer
        min={0}
        max={1000}
      />
      <NumericInput
        label={t('target-level')}
        value={formData.targetLevel}
        onChange={(value) => setFormData({ ...formData, targetLevel: value ?? null })}
        integer
        min={0}
        max={1000}
      />
      <NumericInput
        label={t('other-modifiers')}
        value={formData.modifiers![0].value}
        onChange={(value) => setFormData({ ...formData, modifiers: [{ key: 'other', value: value || 0 }] })}
        integer
        min={-1000}
        max={1000}
      />
      <RollField
        spec={OPEN_D100}
        value={formData.roll ?? null}
        onChange={(value) => setFormData({ ...formData, roll: value.total })}
      />
    </Box>
  );
};

export default ResistanceRollViewForm;
