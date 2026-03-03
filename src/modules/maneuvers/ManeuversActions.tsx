import React, { FC } from 'react';
import { t } from 'i18next';
import RmuBreadcrumbs from '../shared/breadcrumbs/RmuBreadcrumbs';

const ManeuversActions: FC = () => {
  const breadcrumbs = [{ name: t('core'), link: '/core' }, { name: t('maneuvers') }];

  return <RmuBreadcrumbs items={breadcrumbs} maxNameLength={35}></RmuBreadcrumbs>;
};

export default ManeuversActions;
