import React, { FC } from 'react';
import { RmuBreadcrumbs, RefreshButton } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { Skill } from '../../api/skill.dto';

const SkillCategoryViewActions: FC<{
  skill: Skill;
  onRefresh: () => void;
}> = ({ skill, onRefresh }) => {
  const breadcrumbs = [
    { name: t('Core'), link: '/core' },
    { name: t('Skill categories'), link: '/core/skill-categories' },
  ];

  if (!skill) return <p>Loading...</p>;

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={onRefresh} />
    </RmuBreadcrumbs>
  );
};

export default SkillCategoryViewActions;
