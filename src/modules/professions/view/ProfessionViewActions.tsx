import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  RmuBreadcrumbs,
  RefreshButton,
  EditButton,
  DeleteButton,
  DeleteDialog,
  Profession,
  deleteProfession,
  fetchProfession,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';

const ProfessionViewActions: FC<{
  profession: Profession;
  setProfession: Dispatch<SetStateAction<Profession | undefined>>;
}> = ({ profession, setProfession }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { showError } = useError();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const breadcrumbs = [
    { name: t('Core'), link: '/core' },
    { name: t('Professions'), link: '/core/professions' },
  ];

  const handleEditClick = () => {
    navigate(`/core/professions/edit/${profession.id}`, { state: { profession } });
  };

  const onOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const onCloseDialog = () => {
    setDeleteDialogOpen(false);
  };

  const onRefresh = () => {
    fetchProfession(profession.id, auth)
      .then((response) => setProfession(response))
      .catch((err) => showError(err.message));
  };

  const onDelete = () => {
    deleteProfession(profession.id, auth)
      .then(() => navigate(`/core/professions`))
      .catch((err) => showError(err.message));
  };

  if (!profession) return <p>Loading...</p>;

  return (
    <>
      <RmuBreadcrumbs items={breadcrumbs}>
        <RefreshButton onClick={onRefresh} />
        <EditButton onClick={handleEditClick} />
        <DeleteButton onClick={onOpenDeleteDialog} />
      </RmuBreadcrumbs>
      <DeleteDialog
        message={`Are you sure you want to delete ${profession.id} profession? This action cannot be undone.`}
        onDelete={onDelete}
        open={deleteDialogOpen}
        onClose={onCloseDialog}
      />
    </>
  );
};

export default ProfessionViewActions;
