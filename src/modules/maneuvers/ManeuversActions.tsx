import React, { FC } from 'react';
import { RmuBreadcrumbs } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';

const ManeuversActions: FC = () => {
  const breadcrumbs = [{ name: t('core'), link: '/core' }, { name: t('maneuvers') }];

  return <RmuBreadcrumbs items={breadcrumbs}></RmuBreadcrumbs>;
};

export default ManeuversActions;
