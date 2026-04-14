/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, FC, Dispatch, SetStateAction } from 'react';
import { Grid } from '@mui/material';
import {
  addCultureFixedSkillRank,
  Culture,
  CultureSkillRank,
  fetchSkill,
  NumericInput,
  RmuDialog,
  Skill,
  SkillSelector,
  TechnicalInfo,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../../ErrorContext';
import { gridSizeCard } from '../../../services/display';

const AddCultureFixedSkillDialog: FC<{
  open: boolean;
  culture: Culture;
  setCulture: Dispatch<SetStateAction<Culture>>;
  onClose: () => void;
}> = ({ open, culture, setCulture, onClose }) => {
  const { showError } = useError();
  const [formData, setFormData] = useState<CultureSkillRank>({} as CultureSkillRank);
  const [validFormData, setValidFormData] = useState<boolean>(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill>();

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const onSelectedSkill = (skillId: string) => {
    if (!skillId) return;
    fetchSkill(skillId)
      .then((response) => {
        setSelectedSkill(response);
        setFormData({ ...formData, skillId });
      })
      .catch((err) => showError(err.message));
  };

  const onAddSkill = async () => {
    addCultureFixedSkillRank(culture.id, formData!)
      .then((response) => {
        setCulture(response);
        resetForm();
        onClose();
      })
      .catch((err) => showError(err.message));
  };

  const isValid = (): boolean => {
    if (!selectedSkill) return false;
    if (!formData.skillId) return false;
    if (!formData.specialization && selectedSkill.specialization) return false;
    if (!formData.ranks) return false;
    return true;
  };

  const resetForm = () => {
    setFormData({} as CultureSkillRank);
  };

  useEffect(() => {
    setValidFormData(isValid());
  }, [formData]);

  return (
    <RmuDialog
      title={t('Add fixed culture skill')}
      open={open}
      onCancel={handleClose}
      onConfirm={onAddSkill}
      onConfirmDisabled={!validFormData}
    >
      <Grid container spacing={1}>
        <Grid size={12}>
          <SkillSelector
            onSkillChange={(v) => onSelectedSkill(v || '')}
            onSpecializationChange={(v) => setFormData({ ...formData, specialization: v })}
            onError={(err) => showError(err)}
            t={(msg) => t(msg)}
          />
        </Grid>
        <Grid size={gridSizeCard} mt={5}>
          <NumericInput
            label={t('Ranks')}
            value={formData.ranks}
            onChange={(v) => setFormData({ ...formData, ranks: v || 0 })}
          />
        </Grid>
        <Grid size={12}>
          <TechnicalInfo>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </RmuDialog>
  );
};

export default AddCultureFixedSkillDialog;
