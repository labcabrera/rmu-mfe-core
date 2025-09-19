import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Breadcrumbs, Link, Stack } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { Language } from '../../api/language.dto';
import { deleteLanguage } from '../../api/languages';
import CloseButton from '../../shared/buttons/CloseButton';
import DeleteButton from '../../shared/buttons/DeleteButton';
import EditButton from '../../shared/buttons/EditButton';
import DeleteDialog from '../../shared/dialogs/DeleteDialog';

const LanguageViewActions: FC<{
  language: Language;
}> = ({ language }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const { t } = useTranslation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteLanguage = () => {
    deleteLanguage(language.id)
      .then(() => {
        navigate('/core/languages');
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError(String(err));
      });
  };

  const handleEditClick = () => {
    navigate(`/core/languages/edit/${language.id}`, { state: { language } });
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDialogDeleteClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDialogDelete = () => {
    handleDeleteLanguage();
    setDeleteDialogOpen(false);
  };

  if (!language) return <p>Loading...</p>;

  return (
    <>
      <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              {t('home')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/core/">
              {t('core')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/core/languages">
              {t('languages')}
            </Link>
            <span>{language.name}</span>
          </Breadcrumbs>
        </Box>
        <Stack direction="row" spacing={2}>
          <CloseButton onClick={() => {}} />
          <EditButton onClick={handleEditClick} />
          <DeleteButton onClick={handleDeleteClick} />
        </Stack>
      </Stack>
      <DeleteDialog
        message={`Are you sure you want to delete ${language.name} language? This action cannot be undone.`}
        onDelete={handleDialogDelete}
        open={deleteDialogOpen}
        onClose={handleDialogDeleteClose}
      />
    </>
  );
};

export default LanguageViewActions;
