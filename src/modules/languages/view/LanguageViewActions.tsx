import React, { FC, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Breadcrumbs, Link, Stack } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { Language } from '../../api/language.dto';
import { deleteLanguage } from '../../api/languages';
import { Realm } from '../../api/realm.dto';
import DeleteButton from '../../shared/buttons/DeleteButton';
import EditButton from '../../shared/buttons/EditButton';
import DeleteDialog from '../../shared/dialogs/DeleteDialog';

const LanguageViewActions: FC<{
  language: Language;
  realm: Realm;
}> = ({ language, realm }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const onDelete = () => {
    deleteLanguage(language.id)
      .then(() => navigate(`/core/realms/view/${realm.id}`, { state: { realm } }))
      .catch((err) => showError(err.message));
  };

  const onEdit = () => {
    navigate(`/core/languages/edit/${language.id}`, { state: { language } });
  };

  const onOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const onCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const onDeleteDialogClick = () => {
    onDelete();
    setDeleteDialogOpen(false);
  };

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
            <Link
              component={RouterLink}
              color="primary"
              underline="hover"
              to={`/core/realms/view/${realm.id}`}
              state={{ realm }}
            >
              {realm.name}
            </Link>
            <span>{language.name}</span>
          </Breadcrumbs>
        </Box>
        <Stack direction="row" spacing={1}>
          <EditButton onClick={onEdit} />
          <DeleteButton onClick={onOpenDeleteDialog} />
        </Stack>
      </Stack>
      <DeleteDialog
        message={`Are you sure you want to delete ${language.name} language? This action cannot be undone.`}
        onDelete={onDeleteDialogClick}
        open={deleteDialogOpen}
        onClose={onCloseDeleteDialog}
      />
    </>
  );
};

export default LanguageViewActions;
