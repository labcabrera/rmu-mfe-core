import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { deleteRealm, fetchRealm } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import RefreshButton from '../../shared/buttons/RefreshButton';

const CatalogViewActions: FC<{
  onRefresh: () => void;
}> = ({ onRefresh }) => {
  const breadcrumbs = [
    { name: t('Core'), link: '/core' },
    { name: t('Catalogs'), link: '/core/catalogs' },
  ];

  return (
    <>
      <RmuBreadcrumbs items={breadcrumbs}>
        <RefreshButton onClick={onRefresh} />
      </RmuBreadcrumbs>
    </>
  );
};

export default CatalogViewActions;
