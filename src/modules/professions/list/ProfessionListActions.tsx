import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddButton, RefreshButton, RmuBreadcrumbs } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';

interface Props {
  onRefresh: () => void;
}

const ProfessionListActions: FC<Props> = ({ onRefresh }) => {
  const navigate = useNavigate();
  const breadcrumbs = [{ name: t('Core'), link: '/core' }, { name: t('Professions') }];

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={onRefresh} />
      <AddButton onClick={() => navigate('/core/professions/create')} />
    </RmuBreadcrumbs>
  );
};

export default ProfessionListActions;
