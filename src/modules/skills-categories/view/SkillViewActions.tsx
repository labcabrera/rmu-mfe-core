import React, { FC } from 'react';
import { t } from 'i18next';
import { Skill } from '../../api/skill.dto';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';

const SkillViewActions: FC<{
  skill: Skill;
}> = ({ skill }) => {
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('skills'), link: '/core/skills' },
  ];

  if (!skill) return <p>Loading...</p>;

  return <RmuBreadcrumbs items={breadcrumbs}></RmuBreadcrumbs>;
};

export default SkillViewActions;
