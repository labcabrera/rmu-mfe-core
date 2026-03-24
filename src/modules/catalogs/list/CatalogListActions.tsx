import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import AddButton from '../../shared/buttons/AddButton';
import RefreshButton from '../../shared/buttons/RefreshButton';

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
