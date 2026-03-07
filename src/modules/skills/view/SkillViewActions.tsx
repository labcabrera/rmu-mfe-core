import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { Skill } from '../../api/skill.dto';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import EditButton from '../../shared/buttons/EditButton';
import RefreshButton from '../../shared/buttons/RefreshButton';

const SkillViewActions: FC<{
  skill: Skill;
}> = ({ skill }) => {
  const navigate = useNavigate();
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('skill-categories'), link: '/core/skill-categories' },
    { name: t('skills'), link: '/core/skills' },
  ];

  const onRefresh = () => {};

  const onEdit = () => {
    navigate(`/core/skills/edit/${skill.id}`);
  };

  if (!skill) return <p>Loading...</p>;

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={onRefresh} />
      <EditButton onClick={onEdit} />
    </RmuBreadcrumbs>
  );
};

export default SkillViewActions;
