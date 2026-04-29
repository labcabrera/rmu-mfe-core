import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AddButton, RefreshButton, RmuBreadcrumbs } from '@labcabrera-rmu/rmu-react-shared-lib';

const SkillListActions: FC = () => {
  const { t } = useTranslation();
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
