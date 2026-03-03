import React, { FC } from 'react';
import { t } from 'i18next';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';

const SkillCategoryListActions: FC = () => {
  const breadcrumbs = [{ name: t('core'), link: '/core' }, { name: t('skills') }];
  return <RmuBreadcrumbs items={breadcrumbs}></RmuBreadcrumbs>;
};

export default SkillCategoryListActions;
