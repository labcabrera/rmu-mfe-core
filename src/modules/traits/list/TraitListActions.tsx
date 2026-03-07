import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import AddButton from '../../shared/buttons/AddButton';
import RefreshButton from '../../shared/buttons/RefreshButton';

const TraitListActions: FC<{
  onRefresh: () => void;
}> = ({ onRefresh }) => {
  const navigate = useNavigate();
  const breadcrumbs = [{ name: t('core'), link: '/core' }, { name: t('traits') }];

  const onNewTrait = async () => {
    navigate('/core/traits/create');
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={onRefresh} />
      <AddButton onClick={onNewTrait} />
    </RmuBreadcrumbs>
  );
};

export default TraitListActions;
