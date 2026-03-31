import React, { FC } from 'react';
import { RmuBreadcrumbs, RefreshButton } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';

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
