import React, { FC } from 'react';
import { RmuBreadcrumbs, RefreshButton } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';

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
