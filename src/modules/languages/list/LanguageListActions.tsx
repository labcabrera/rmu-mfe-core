import React, { FC } from 'react';
import { t } from 'i18next';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';

const RealmListActions: FC = () => {
  const breadcrumbs = [{ name: t('core'), link: '/core' }, { name: t('languages') }];

  return <RmuBreadcrumbs items={breadcrumbs}></RmuBreadcrumbs>;
};

export default RealmListActions;
