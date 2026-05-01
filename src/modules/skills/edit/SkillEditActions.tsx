import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  RmuBreadcrumbs,
  CancelButton,
  SaveButton,
  Skill,
  updateSkill,
  UpdateSkillDto,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';

const SkillEditActions: FC<{
  skill: Skill;
  formData: UpdateSkillDto;
  isValid?: boolean;
}> = ({ skill, formData, isValid = false }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('Core'), link: '/core' },
    { name: t('Skills'), link: '/core/skills' },
    { name: t('Edit') },
  ];

  const handleSave = async () => {
    updateSkill(skill.id, formData, auth)
      .then((response) => navigate(`/core/skills/view/${response.id}`))
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

export default SkillEditActions;
