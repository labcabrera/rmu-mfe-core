import React, { FC, useState } from 'react';
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
import { deleteTrait } from '../../api/trait';
import { Trait } from '../../api/trait.dto';

const TraitViewActions: FC<{
  trait: Trait;
  onRefresh: () => void;
}> = ({ trait, onRefresh }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('traits'), link: '/core/traits' },
  ];

  const onDelete = () => {
    deleteTrait(trait.id)
      .then(() => navigate('/core/traits'))
      .catch((err: Error) => showError(err.message));
  };

  const onEdit = () => {
    navigate(`/core/traits/edit/${trait.id}`, { state: { trait } });
  };

  const onOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const onCloseDeleteDiaglog = () => {
    setDeleteDialogOpen(false);
  };

  const onDeleteDialogClick = () => {
    onDelete();
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <RmuBreadcrumbs items={breadcrumbs}>
        <RefreshButton onClick={onRefresh} />
        <EditButton onClick={onEdit} />
        <DeleteButton onClick={onOpenDeleteDialog} />
      </RmuBreadcrumbs>
      <DeleteDialog
        message={`Are you sure you want to delete ${t(trait.id)} trait? This action cannot be undone.`}
        onDelete={onDeleteDialogClick}
        open={deleteDialogOpen}
        onClose={onCloseDeleteDiaglog}
      />
    </>
  );
};

export default TraitViewActions;
