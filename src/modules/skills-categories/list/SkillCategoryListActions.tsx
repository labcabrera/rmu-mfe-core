import React, { Dispatch, FC, SetStateAction } from 'react';
import { t } from 'i18next';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import RefreshButton from '../../shared/buttons/RefreshButton';

const SkillCategoryListActions: FC<{
  setQueryString: Dispatch<SetStateAction<string>>;
}> = ({ setQueryString }) => {
  const breadcrumbs = [{ name: t('core'), link: '/core' }, { name: t('skill-categories') }];

  const onResetSearch = () => {
    setQueryString('');
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs} maxNameLength={30}>
      <RefreshButton onClick={onResetSearch} />
    </RmuBreadcrumbs>
  );
};

export default SkillCategoryListActions;
