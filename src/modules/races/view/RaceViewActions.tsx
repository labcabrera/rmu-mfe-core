import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { deleteRace, fetchRace } from '../../api/race';
import { Race } from '../../api/race.dto';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import DeleteButton from '../../shared/buttons/DeleteButton';
import EditButton from '../../shared/buttons/EditButton';
import RefreshButton from '../../shared/buttons/RefreshButton';
import DeleteDialog from '../../shared/dialogs/DeleteDialog';

const RaceViewActions: FC<{
  race: Race;
  setRace: React.Dispatch<React.SetStateAction<Race | null>>;
}> = ({ race, setRace }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('realms'), link: '/core/realms  ' },
    { name: race.realmName, link: `/core/realms/view/${race.realmId}` },
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
      .then(() => navigate(`/core/realms/view/${race.realmId}`))
      .catch((err) => showError(err.message));
  };

  if (!race) return <p>Loading...</p>;

  return (
    <>
      <RmuBreadcrumbs items={breadcrumbs} maxNameLength={35}>
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
