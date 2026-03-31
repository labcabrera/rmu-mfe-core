import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddButton, RefreshButton, RmuBreadcrumbs } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';

const CatalogListActions: FC<{ onRefresh: () => void }> = ({ onRefresh }) => {
  const navigate = useNavigate();

  const onAddRealmClick = () => {
    navigate('/core/catalogs');
  };

  return (
    <RmuBreadcrumbs items={[{ name: t('core'), link: '/core' }, { name: t('Catalogs') }]}>
      <RefreshButton onClick={() => onRefresh()} />
      <AddButton onClick={() => onAddRealmClick()} />
    </RmuBreadcrumbs>
  );
};

export default CatalogListActions;
