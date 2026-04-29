import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { RmuBreadcrumbs, RefreshButton } from '@labcabrera-rmu/rmu-react-shared-lib';

const SkillCategoryListActions: FC<{
  onRefresh: () => void;
}> = ({ onRefresh }) => {
  const { t } = useTranslation();
  const breadcrumbs = [{ name: t('core'), link: '/core' }, { name: t('skill-categories') }];

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={onRefresh} />
    </RmuBreadcrumbs>
  );
};

export default SkillCategoryListActions;
