import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { deleteProfession, fetchProfession } from '../../api/profession';
import { Profession } from '../../api/profession.dto';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import DeleteButton from '../../shared/buttons/DeleteButton';
import EditButton from '../../shared/buttons/EditButton';
import RefreshButton from '../../shared/buttons/RefreshButton';
import DeleteDialog from '../../shared/dialogs/DeleteDialog';

const ProfessionViewActions: FC<{
  profession: Profession;
  setProfession: Dispatch<SetStateAction<Profession | undefined>>;
}> = ({ profession, setProfession }) => {
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
    fetchProfession(profession.id)
      .then((response) => setProfession(response))
      .catch((err) => showError(err.message));
  };

  const onDelete = () => {
    deleteProfession(profession.id)
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
