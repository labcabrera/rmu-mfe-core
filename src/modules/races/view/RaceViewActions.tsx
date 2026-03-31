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
import { deleteRace, fetchRace } from '../../api/race';
import { Race } from '../../api/race.dto';

const RaceViewActions: FC<{
  race: Race;
  setRace: Dispatch<SetStateAction<Race | undefined>>;
}> = ({ race, setRace }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('races'), link: '/core/races' },
  ];

  const handleEditClick = () => {
    navigate(`/core/races/edit/${race.id}`, { state: { race } });
  };

  const onOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const onCloseDialog = () => {
    setDeleteDialogOpen(false);
  };

  const onRefresh = () => {
    fetchRace(race.id)
      .then((response) => setRace(response))
      .catch((err) => showError(err.message));
  };

  const onDelete = () => {
    deleteRace(race.id)
      .then(() => navigate(`/core/realms/view/${race.realm.id}`))
      .catch((err) => showError(err.message));
  };

  if (!race) return <p>Loading...</p>;

  return (
    <>
      <RmuBreadcrumbs items={breadcrumbs}>
        <RefreshButton onClick={onRefresh} />
        <EditButton onClick={handleEditClick} />
        <DeleteButton onClick={onOpenDeleteDialog} />
      </RmuBreadcrumbs>
      <DeleteDialog
        message={`Are you sure you want to delete ${race.name} race? This action cannot be undone.`}
        onDelete={onDelete}
        open={deleteDialogOpen}
        onClose={onCloseDialog}
      />
    </>
  );
};

export default RaceViewActions;
