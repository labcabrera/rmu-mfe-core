import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { createRealm } from '../../api/realm';
import { CreateRealmDto } from '../../api/realm.dto';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const RealmCreationActions: FC<{
  formData: CreateRealmDto;
  isValid: boolean;
}> = ({ formData, isValid }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('realms'), link: '/core/realms' },
    { name: t('realm-creation') },
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
    <RmuBreadcrumbs items={breadcrumbs} maxNameLength={30}>
      <CancelButton onClick={onBackClick} />
      <SaveButton onClick={onSaveClick} disabled={!isValid} />
    </RmuBreadcrumbs>
  );
};

export default RealmCreationActions;
