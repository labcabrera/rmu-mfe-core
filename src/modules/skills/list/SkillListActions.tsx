import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddButton, RefreshButton, RmuBreadcrumbs } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';

const SkillListActions: FC = () => {
  const navigate = useNavigate();
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('skill-categories'), link: '/core/skill-categories' },
    { name: t('skills') },
  ];

  const onRefresh = () => {};

  const onCreate = () => {
    navigate('/core/skills/create');
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={onRefresh} />
      <AddButton onClick={onCreate} />
    </RmuBreadcrumbs>
  );
};

export default SkillListActions;
