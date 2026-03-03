import React, { FC } from 'react';
import { t } from 'i18next';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import RefreshButton from '../../shared/buttons/RefreshButton';

const RaceListActions: FC = () => {
  const breadcrumbs = [{ name: t('core'), link: '/core' }, { name: t('races') }];

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={handleRefresh} />
    </RmuBreadcrumbs>
  );
};

export default RaceListActions;
