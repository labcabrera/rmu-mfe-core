import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { Language } from '../../api/language.dto';
import { deleteLanguage } from '../../api/languages';
import { Realm } from '../../api/realm.dto';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
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
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('realms'), link: '/core/realms' },
    { name: realm.name, link: `/core/realms/view/${realm.id}` },
    { name: language.name },
  ];

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
      <RmuBreadcrumbs items={breadcrumbs}>
        <EditButton onClick={onEdit} />
        <DeleteButton onClick={onOpenDeleteDialog} />
      </RmuBreadcrumbs>
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
