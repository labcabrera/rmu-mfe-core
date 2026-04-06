import React, { Dispatch, FC, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddButton, RefreshButton, RmuBreadcrumbs, Realm, fetchRealms } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';

const RealmListActions: FC<{ setRealms: Dispatch<SetStateAction<Realm[]>> }> = ({ setRealms }) => {
  const navigate = useNavigate();
  const { showError } = useError();

  const onAddRealmClick = () => {
    navigate('/core/realms/create');
  };

  const onRefreshButtonClick = () => {
    fetchRealms('', 0, 20)
      .then((response) => setRealms(response))
      .catch((err) => showError(err.message));
  };

  return (
    <RmuBreadcrumbs items={[{ name: t('core'), link: '/core' }, { name: t('realms') }]}>
      <RefreshButton onClick={() => onRefreshButtonClick()} />
      <AddButton onClick={() => onAddRealmClick()} />
    </RmuBreadcrumbs>
  );
};

export default RealmListActions;
