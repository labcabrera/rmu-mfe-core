import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  RmuBreadcrumbs,
  RefreshButton,
  EditButton,
  DeleteButton,
  DeleteDialog,
  Culture,
  deleteCulture,
  fetchCulture,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';

const CultureViewActions: FC<{
  culture: Culture;
  setCulture: Dispatch<SetStateAction<Culture>>;
}> = ({ culture, setCulture }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const breadcrumbs = [
    { name: t('Core'), link: '/core' },
    { name: t('Cultures'), link: '/core/cultures' },
  ];

  const handleEditClick = () => {
    navigate(`/core/cultures/edit/${culture.id}`, { state: { culture } });
  };

  const onOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const onCloseDialog = () => {
    setDeleteDialogOpen(false);
  };

  const onRefresh = () => {
    fetchCulture(culture.id, auth)
      .then((response) => setCulture(response))
      .catch((err) => showError(err.message));
  };

  const onDelete = () => {
    deleteCulture(culture.id, auth)
      .then(() => navigate(`/core/cultures`))
      .catch((err) => showError(err.message));
  };

  if (!culture) return <p>Loading...</p>;

  return (
    <>
      <RmuBreadcrumbs items={breadcrumbs}>
        <RefreshButton onClick={onRefresh} />
        <EditButton onClick={handleEditClick} />
        <DeleteButton onClick={onOpenDeleteDialog} />
      </RmuBreadcrumbs>
      <DeleteDialog
        message={`Are you sure you want to delete ${culture.name} culture? This action cannot be undone.`}
        onDelete={onDelete}
        open={deleteDialogOpen}
        onClose={onCloseDialog}
      />
    </>
  );
};

export default CultureViewActions;
