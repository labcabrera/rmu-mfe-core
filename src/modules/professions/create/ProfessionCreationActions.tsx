import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { createProfession } from '../../api/profession';
import { CreateProfessionDto } from '../../api/profession.dto';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const ProfessionCreationActions: FC<{
  formData: CreateProfessionDto;
  isValid: boolean;
}> = ({ formData, isValid }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('Core'), link: '/core' },
    { name: t('Professions'), link: '/core/professions' },
    { name: t('Create') },
  ];

  const onSave = () => {
    createProfession(formData)
      .then((result) => navigate(`/core/professions/view/${result.id}`))
      .catch((err: Error) => showError(err.message));
  };

  const onCancel = () => {
    navigate(`/core/professions`);
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <CancelButton onClick={onCancel} />
      <SaveButton onClick={onSave} disabled={!isValid} />
    </RmuBreadcrumbs>
  );
};

export default ProfessionCreationActions;
