import React, { FC } from 'react';
import { RmuBreadcrumbs, RefreshButton } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';

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
