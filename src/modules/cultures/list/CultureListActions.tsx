import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RmuBreadcrumbs, RefreshButton, AddButton } from '@labcabrera-rmu/rmu-react-shared-lib';

interface Props {
  onRefresh: () => void;
}

const CultureListActions: FC<Props> = ({ onRefresh }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const breadcrumbs = [{ name: t('core'), link: '/core' }, { name: t('Cultures') }];

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <AddButton onClick={() => navigate('/core/cultures/create')} />
      <RefreshButton onClick={onRefresh} />
    </RmuBreadcrumbs>
  );
};

export default CultureListActions;
