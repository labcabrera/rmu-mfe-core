import React, { FC } from 'react';
import { t } from 'i18next';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';

const RaceListActions: FC = () => {
  const breadcrumbs = [{ name: t('core'), link: '/core' }, { name: t('races') }];

  return <RmuBreadcrumbs items={breadcrumbs}></RmuBreadcrumbs>;
};

export default RaceListActions;
