import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { RmuBreadcrumbs } from '@labcabrera-rmu/rmu-react-shared-lib';

const ManeuversActions: FC = () => {
  const { t } = useTranslation();
  const breadcrumbs = [{ name: t('core'), link: '/core' }, { name: t('maneuvers') }];

  return <RmuBreadcrumbs items={breadcrumbs}></RmuBreadcrumbs>;
};

export default ManeuversActions;
