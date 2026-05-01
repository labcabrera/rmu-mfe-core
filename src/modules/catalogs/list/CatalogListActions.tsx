import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AddButton, RefreshButton, RmuBreadcrumbs } from '@labcabrera-rmu/rmu-react-shared-lib';

const CatalogListActions: FC<{ onRefresh: () => void }> = ({ onRefresh }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onAddRealmClick = () => {
    navigate('/core/catalogs');
  };

  return (
    <RmuBreadcrumbs items={[{ name: t('core'), link: '/core' }, { name: t('catalogs') }]}>
      <RefreshButton onClick={() => onRefresh()} />
      <AddButton onClick={() => onAddRealmClick()} />
    </RmuBreadcrumbs>
  );
};

export default CatalogListActions;
