import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { RmuBreadcrumbs, RefreshButton, SkillCategory } from '@labcabrera-rmu/rmu-react-shared-lib';

const SkillCategoryViewActions: FC<{
  skillCategory: SkillCategory;
  onRefresh: () => void;
}> = ({ skillCategory, onRefresh }) => {
  const { t } = useTranslation();
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('skill-categories'), link: '/core/skill-categories' },
  ];

  if (!skillCategory) return <p>Loading...</p>;

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={onRefresh} />
    </RmuBreadcrumbs>
  );
};

export default SkillCategoryViewActions;
