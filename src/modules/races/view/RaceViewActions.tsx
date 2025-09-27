import React, { FC, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Breadcrumbs, Link, Stack } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { deleteRace, fetchRace } from '../../api/race';
import { Race } from '../../api/race.dto';
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
            <Link component={RouterLink} color="primary" underline="hover" to={`/core/realms/view/${race.realmId}`}>
              {race.realmName}
            </Link>
            <span>{race.name}</span>
          </Breadcrumbs>
        </Box>
        <Stack direction="row" spacing={2}>
          <RefreshButton onClick={onRefresh} />
          <EditButton onClick={handleEditClick} />
          <DeleteButton onClick={onOpenDeleteDialog} />
        </Stack>
      </Stack>
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
