import React, { FC } from 'react';
import { t } from 'i18next';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import RefreshButton from '../../shared/buttons/RefreshButton';

const SkillCategoryListActions: FC<{
  onRefresh: () => void;
}> = ({ onRefresh }) => {
  const breadcrumbs = [{ name: t('core'), link: '/core' }, { name: t('skill-categories') }];

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={onRefresh} />
    </RmuBreadcrumbs>
  );
};

export default SkillCategoryListActions;
