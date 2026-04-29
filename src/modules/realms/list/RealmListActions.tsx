import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { AddButton, RefreshButton, RmuBreadcrumbs, Realm, fetchRealms } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';

const RealmListActions: FC<{ setRealms: Dispatch<SetStateAction<Realm[]>> }> = ({ setRealms }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showError } = useError();

  const onAddRealmClick = () => {
    navigate('/core/realms/create');
  };

  const onRefreshButtonClick = () => {
    fetchRealms('', 0, 20, auth)
      .then((response) => setRealms(response.content))
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
