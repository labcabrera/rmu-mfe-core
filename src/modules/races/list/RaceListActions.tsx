import React, { FC } from 'react';
import { t } from 'i18next';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import RefreshButton from '../../shared/buttons/RefreshButton';

interface Props {
  onRefresh: () => void;
}

const RaceListActions: FC<Props> = ({ onRefresh }) => {
  const breadcrumbs = [{ name: t('core'), link: '/core' }, { name: t('races') }];

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={onRefresh} />
    </RmuBreadcrumbs>
  );
};

export default RaceListActions;
