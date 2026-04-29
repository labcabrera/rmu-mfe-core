import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  CancelButton,
  createSkill,
  CreateSkillDto,
  RmuBreadcrumbs,
  SaveButton,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';

const SkillCreationActions: FC<{
  formData: CreateSkillDto;
  isValid?: boolean;
}> = ({ formData, isValid = false }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('skill-categories'), link: '/core/skill-categories' },
    { name: t('skills'), link: '/core/skills' },
    { name: t('create') },
  ];

  const handleSave = async () => {
    createSkill(formData, auth)
      .then((skill) => navigate(`/core/skills/view/${skill.id}`, { state: skill }))
      .catch((err) => showError(err.message));
  };

  const handleBack = () => {
    navigate(`/core/skills`);
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <CancelButton onClick={handleBack} />
      <SaveButton onClick={handleSave} disabled={!isValid} />
    </RmuBreadcrumbs>
  );
};

export default SkillCreationActions;
