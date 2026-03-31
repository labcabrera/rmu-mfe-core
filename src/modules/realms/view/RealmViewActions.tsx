import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RmuBreadcrumbs,
  RefreshButton,
  EditButton,
  DeleteButton,
  DeleteDialog,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { deleteRealm, fetchRealm } from '../../api/realm';
import { Realm } from '../../api/realm.dto';

const RealmViewActions: FC<{
  realm: Realm;
  setRealm: Dispatch<SetStateAction<Realm | undefined>>;
}> = ({ realm, setRealm }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('realms'), link: '/core/realms' },
  ];

  const onDeleteRealm = () => {
    deleteRealm(realm.id)
      .then(() => navigate('/core/realms'))
      .catch((err) => showError(err.message));
  };

  const onRefreshButtonClick = () => {
    fetchRealm(realm.id)
      .then((response) => setRealm(response))
      .catch((err) => showError(err.message));
  };

  const onEditButtonClick = () => {
    navigate(`/core/realms/edit/${realm.id}`, { state: { realm } });
  };

  const onDeleteButtonClick = () => {
    setDeleteDialogOpen(true);
  };

  const onCloseDialogClick = () => {
    setDeleteDialogOpen(false);
  };

  const onDeleteDialogClick = () => {
    onDeleteRealm();
    setDeleteDialogOpen(false);
  };

  if (!realm) return <p>Loading realm...</p>;

  return (
    <>
      <RmuBreadcrumbs items={breadcrumbs}>
        <RefreshButton onClick={() => onRefreshButtonClick()} />
        <EditButton onClick={() => onEditButtonClick()} />
        <DeleteButton onClick={() => onDeleteButtonClick()} />
      </RmuBreadcrumbs>
      <DeleteDialog
        open={deleteDialogOpen}
        message={`Are you sure you want to delete ${realm.name} realm? This action cannot be undone.`}
        onDelete={() => onDeleteDialogClick()}
        onClose={() => onCloseDialogClick()}
      />
    </>
  );
};

export default RealmViewActions;
