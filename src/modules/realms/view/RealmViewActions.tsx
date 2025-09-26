import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Breadcrumbs, Link, Stack } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { deleteRealm, fetchRealm } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import DeleteButton from '../../shared/buttons/DeleteButton';
import EditButton from '../../shared/buttons/EditButton';
import RefreshButton from '../../shared/buttons/RefreshButton';
import DeleteDialog from '../../shared/dialogs/DeleteDialog';

const RealmViewActions: FC<{
  realm: Realm;
  setRealm: Dispatch<SetStateAction<Realm | null>>;
}> = ({ realm, setRealm }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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
      <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" underline="hover" href="/">
              {t('home')}
            </Link>
            <Link component={RouterLink} color="primary" underline="hover" to="/core/">
              {t('core')}
            </Link>
            <Link component={RouterLink} color="primary" underline="hover" to="/core/realms">
              {t('realms')}
            </Link>
            <span>{realm.name}</span>
          </Breadcrumbs>
        </Box>
        <Stack direction="row" spacing={2}>
          <RefreshButton onClick={() => onRefreshButtonClick()} />
          <EditButton onClick={() => onEditButtonClick()} />
          <DeleteButton onClick={() => onDeleteButtonClick()} />
        </Stack>
      </Stack>
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
