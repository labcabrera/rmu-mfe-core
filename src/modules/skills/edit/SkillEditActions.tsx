import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { RmuBreadcrumbs, CancelButton, SaveButton } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { updateSkill } from '../../api/skill';
import { Skill, UpdateSkillDto } from '../../api/skill.dto';

const SkillEditActions: FC<{
  skill: Skill;
  formData: UpdateSkillDto;
  isValid?: boolean;
}> = ({ skill, formData, isValid = false }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('Core'), link: '/core' },
    { name: t('Skills'), link: '/core/skills' },
    { name: t('Edit') },
  ];

  const handleSave = async () => {
    updateSkill(skill.id, formData)
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
