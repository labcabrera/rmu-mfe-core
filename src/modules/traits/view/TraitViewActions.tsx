import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Breadcrumbs, Link, Stack } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { deleteTrait } from '../../api/trait';
import { Trait } from '../../api/trait.dto';
import DeleteButton from '../../shared/buttons/DeleteButton';
import EditButton from '../../shared/buttons/EditButton';
import DeleteDialog from '../../shared/dialogs/DeleteDialog';

const TraitViewActions: FC<{
  trait: Trait;
}> = ({ trait }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const { t } = useTranslation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteTrait = () => {
    deleteTrait(trait.id)
      .then(() => {
        navigate('/core/traits');
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError(String(err));
      });
  };

  const handleEditClick = () => {
    navigate(`/core/traits/edit/${trait.id}`, { state: { trait } });
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDialogDeleteClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDialogDelete = () => {
    handleDeleteTrait();
    setDeleteDialogOpen(false);
  };

  if (!trait) return <p>Loading...</p>;

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
            <Link component={RouterLink} color="primary" underline="hover" to="/core/traits">
              {t('traits')}
            </Link>
            <span>{t(trait.id)}</span>
          </Breadcrumbs>
        </Box>
        <Stack direction="row" spacing={2}>
          <EditButton onClick={handleEditClick} />
          <DeleteButton onClick={handleDeleteClick} />
        </Stack>
      </Stack>
      <DeleteDialog
        message={`Are you sure you want to delete ${t(trait.id)} trait? This action cannot be undone.`}
        onDelete={handleDialogDelete}
        open={deleteDialogOpen}
        onClose={handleDialogDeleteClose}
      />
    </>
  );
};

export default TraitViewActions;
