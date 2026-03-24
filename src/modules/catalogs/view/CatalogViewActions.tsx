import React, { FC } from 'react';
import { t } from 'i18next';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import RefreshButton from '../../shared/buttons/RefreshButton';

const CatalogViewActions: FC<{
  onRefresh: () => void;
}> = ({ onRefresh }) => {
  const breadcrumbs = [
    { name: t('Core'), link: '/core' },
    { name: t('Catalogs'), link: '/core/catalogs' },
  ];

  return (
    <>
      <RmuBreadcrumbs items={breadcrumbs}>
        <RefreshButton onClick={onRefresh} />
      </RmuBreadcrumbs>
    </>
  );
};

export default CatalogViewActions;
