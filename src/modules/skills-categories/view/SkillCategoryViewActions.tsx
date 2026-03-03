import React, { FC } from 'react';
import { t } from 'i18next';
import { Skill } from '../../api/skill.dto';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';

const SkillCategoryViewActions: FC<{
  skill: Skill;
}> = ({ skill }) => {
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('skill-categories'), link: '/core/skill-categories' },
  ];

  if (!skill) return <p>Loading...</p>;

  return <RmuBreadcrumbs items={breadcrumbs} maxNameLength={30}></RmuBreadcrumbs>;
};

export default SkillCategoryViewActions;
