import React, { FC } from 'react';
import { t } from 'i18next';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import RefreshButton from '../../shared/buttons/RefreshButton';

const RealmListActions: FC<{ onRefresh: () => void }> = ({ onRefresh }) => {
  const breadcrumbs = [{ name: t('core'), link: '/core' }, { name: t('languages') }];

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={onRefresh} />
    </RmuBreadcrumbs>
  );
};

export default RealmListActions;
