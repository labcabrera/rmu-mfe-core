import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Breadcrumbs, Link, Stack } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { deleteRace } from '../../api/race';
import { Race } from '../../api/race.dto';
import DeleteButton from '../../shared/buttons/DeleteButton';
import EditButton from '../../shared/buttons/EditButton';
import DeleteDialog from '../../shared/dialogs/DeleteDialog';

const RaceViewActions: FC<{
  race: Race;
}> = ({ race }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const { t } = useTranslation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleEditClick = () => {
    navigate(`/core/races/edit/${race.id}`, { state: { race } });
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const onRaceDelete = () => {
    deleteRace(race.id)
      .then(() => {
        navigate(`/core/realms/view/${race.realmId}`);
      })
      .catch((error) => {
        showError(t('errors.delete', { error }));
      });
  };

  if (!race) {
    return <p>Loading...</p>;
  }

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
          <EditButton onClick={handleEditClick} />
          <DeleteButton onClick={handleDeleteClick} />
        </Stack>
      </Stack>
      <DeleteDialog
        message={`Are you sure you want to delete ${race.name} race? This action cannot be undone.`}
        onDelete={onRaceDelete}
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
      />
    </>
  );
};

export default RaceViewActions;
