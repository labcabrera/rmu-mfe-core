import React, { FC } from 'react';
import { t } from 'i18next';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import RefreshButton from '../../shared/buttons/RefreshButton';

interface Props {
  onRefresh: () => void;
}

const ProfessionListActions: FC<Props> = ({ onRefresh }) => {
  const breadcrumbs = [{ name: t('Core'), link: '/core' }, { name: t('Professions') }];

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={onRefresh} />
    </RmuBreadcrumbs>
  );
};

export default ProfessionListActions;
