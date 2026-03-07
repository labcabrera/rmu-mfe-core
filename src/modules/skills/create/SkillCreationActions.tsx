import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { createSkill } from '../../api/skill';
import { CreateTraitDto } from '../../api/trait.dto';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const SkillCreationActions: FC<{
  formData: CreateTraitDto;
  isValid?: boolean;
}> = ({ formData, isValid = false }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('skill-categories'), link: '/core/skill-categories' },
    { name: t('skills'), link: '/core/skills' },
    { name: t('create') },
  ];

  const handleSave = async () => {
    createSkill(formData)
      .then((skill) => navigate(`/core/skills/view/${skill.id}`))
      .catch((err: Error) => showError(err.message));
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
