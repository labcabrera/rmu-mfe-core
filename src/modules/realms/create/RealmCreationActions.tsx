import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  RmuBreadcrumbs,
  CancelButton,
  SaveButton,
  createRealm,
  CreateRealmDto,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';

const RealmCreationActions: FC<{
  formData: CreateRealmDto;
  isValid: boolean;
}> = ({ formData, isValid }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('realms'), link: '/core/realms' },
    { name: t('creation') },
  ];

  const onSaveClick = async () => {
    createRealm(formData, auth)
      .then((realm) => navigate(`/core/realms/view/${realm.id}`))
      .catch((err) => showError(err.message));
  };

  const onBackClick = () => {
    navigate(`/core/realms`);
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <CancelButton onClick={onBackClick} />
      <SaveButton onClick={onSaveClick} disabled={!isValid} />
    </RmuBreadcrumbs>
  );
};

export default RealmCreationActions;
