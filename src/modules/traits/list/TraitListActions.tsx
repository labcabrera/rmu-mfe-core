import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RmuBreadcrumbs, RefreshButton, AddButton } from '@labcabrera-rmu/rmu-react-shared-lib';

const TraitListActions: FC<{
  onRefresh: () => void;
}> = ({ onRefresh }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
