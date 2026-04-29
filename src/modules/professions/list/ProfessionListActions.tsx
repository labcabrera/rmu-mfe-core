import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AddButton, RefreshButton, RmuBreadcrumbs } from '@labcabrera-rmu/rmu-react-shared-lib';

interface Props {
  onRefresh: () => void;
}

const ProfessionListActions: FC<Props> = ({ onRefresh }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const breadcrumbs = [{ name: t('core'), link: '/core' }, { name: t('professions') }];

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={onRefresh} />
      <AddButton onClick={() => navigate('/core/professions/create')} />
    </RmuBreadcrumbs>
  );
};

export default ProfessionListActions;
