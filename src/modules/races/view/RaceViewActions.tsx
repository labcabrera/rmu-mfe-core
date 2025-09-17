import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Breadcrumbs, Link, Stack } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { Race } from '../../api/race';
import CloseButton from '../../shared/buttons/CloseButton';
import DeleteButton from '../../shared/buttons/DeleteButton';
import EditButton from '../../shared/buttons/EditButton';
import PlayButton from '../../shared/buttons/PlayButton';
import DeleteDialog from '../../shared/dialogs/DeleteDialog';

const RaceViewActions: FC<{
  race: Race;
}> = ({ race }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const { t } = useTranslation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteTacticalGame = async () => {};

  const handleEditClick = () => {
    navigate(`/core/races/edit/${race.id}`, { state: { race } });
  };

  const handleOpenClick = async () => {
    navigate(`/core/races/combat/${race.id}`, { state: { race } });
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDialogDeleteClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDialogDelete = () => {
    handleDeleteTacticalGame();
    setDeleteDialogOpen(false);
  };

  if (!race) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              {t('home')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/tactical/games">
              {t('tactical')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/tactical/games">
              {t('games')}
            </Link>
            <span>{race.name}</span>
          </Breadcrumbs>
        </Box>
        <Stack direction="row" spacing={2}>
          <CloseButton onClick={() => {}} />
          <PlayButton onClick={handleOpenClick} />
          <EditButton onClick={handleEditClick} />
          <DeleteButton onClick={handleDeleteClick} />
        </Stack>
      </Stack>
      <DeleteDialog
        message={`Are you sure you want to delete ${race.name} race? This action cannot be undone.`}
        onDelete={handleDialogDelete}
        open={deleteDialogOpen}
        onClose={handleDialogDeleteClose}
      />
    </>
  );
};

export default RaceViewActions;
