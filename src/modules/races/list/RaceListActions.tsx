import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { RmuBreadcrumbs, RefreshButton } from '@labcabrera-rmu/rmu-react-shared-lib';

interface Props {
  onRefresh: () => void;
}

const RaceListActions: FC<Props> = ({ onRefresh }) => {
  const { t } = useTranslation();
  const breadcrumbs = [{ name: t('core'), link: '/core' }, { name: t('races') }];

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={onRefresh} />
    </RmuBreadcrumbs>
  );
};

export default RaceListActions;
