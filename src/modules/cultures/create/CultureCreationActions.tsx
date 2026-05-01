import React, { FC } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  CancelButton,
  createCulture,
  CreateCultureDto,
  Culture,
  RmuBreadcrumbs,
  SaveButton,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';

const CultureCreationActions: FC<{
  formData: Culture;
  isValid: boolean;
}> = ({ formData, isValid }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('Core'), link: '/core' },
    { name: t('Races'), link: '/core/races' },
    { name: t('Creation') },
  ];

  const onSave = () => {
    const dto = formData as CreateCultureDto;
    createCulture(dto, auth)
      .then((response) => navigate(`/core/cultures/view/${response.id}`, { state: { culture: response } }))
      .catch((err) => showError(err.message));
  };

  const onCancel = () => {
    navigate(`/core/cultures`);
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <CancelButton onClick={onCancel} />
      <SaveButton onClick={onSave} disabled={!isValid} />
    </RmuBreadcrumbs>
  );
};

export default CultureCreationActions;
