import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { RmuBreadcrumbs, CancelButton, SaveButton } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { createRealm } from '../../api/realm';
import { CreateRealmDto } from '../../api/realm.dto';

const RealmCreationActions: FC<{
  formData: CreateRealmDto;
  isValid: boolean;
}> = ({ formData, isValid }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('realms'), link: '/core/realms' },
    { name: t('creation') },
  ];

  const onSaveClick = async () => {
    createRealm(formData)
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
