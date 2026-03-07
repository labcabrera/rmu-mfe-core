import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import AddButton from '../../shared/buttons/AddButton';
import RefreshButton from '../../shared/buttons/RefreshButton';

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
