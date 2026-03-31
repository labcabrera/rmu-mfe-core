import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { RmuBreadcrumbs, CancelButton, SaveButton } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { updateRealm } from '../../api/realm';
import { Realm, UpdateRealmDto } from '../../api/realm.dto';

const RealmEditActions: FC<{
  realm: Realm;
  formData: UpdateRealmDto;
}> = ({ realm, formData }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbItems = [
    { name: t('core'), link: '/core' },
    { name: t('realms'), link: '/core/realms' },
    { name: t('edit') },
  ];

  const onSaveButtonClick = async () => {
    updateRealm(realm.id, formData)
      .then((data) => {
        navigate(`/core/realms/view/${realm.id}`, { state: { realm: data } });
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError('An unknown error occurred');
      });
  };

  const onCancelButtonClick = () => {
    navigate(`/core/realms/view/${realm.id}`, { state: { realm } });
  };

  if (!realm) return <p>Loading...</p>;

  return (
    <RmuBreadcrumbs items={breadcrumbItems}>
      <CancelButton onClick={onCancelButtonClick} />
      <SaveButton onClick={onSaveButtonClick} />
    </RmuBreadcrumbs>
  );
};

export default RealmEditActions;
