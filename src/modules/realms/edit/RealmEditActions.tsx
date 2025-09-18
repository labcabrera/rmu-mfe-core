import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useError } from '../../../ErrorContext';
import { updateRealm } from '../../api/realm';
import { Realm, UpdateRealmDto } from '../../api/realm.dto';
import BackButton from '../../shared/buttons/BackButton';
import SaveButton from '../../shared/buttons/SaveButton';

const RealmEditActions: FC<{
  realm: Realm;
  formData: UpdateRealmDto;
}> = ({ realm, formData }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showError } = useError();

  if (!realm) {
    return <p>Loading...</p>;
  }

  const handleSaveButtonClick = async () => {
    updateRealm(realm.id, formData)
      .then((data) => {
        navigate(`/core/realms/view/${realm.id}`, { state: { realm: data } });
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError('An unknown error occurred');
      });
  };

  const handleBackButtonClick = () => {
    navigate(`/core/realms/view/${realm.id}`, { state: { realm } });
    return;
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/tactical">
          {t('tactical-games')}
        </Link>
        <Link color="inherit" component={RouterLink} to={''}>
          {realm.name}
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{t('edit')}</Typography>
      </Breadcrumbs>

      <div style={{ flexGrow: 1 }} />

      <BackButton onClick={handleBackButtonClick} />
      <SaveButton onClick={handleSaveButtonClick} />
    </Stack>
  );
};

export default RealmEditActions;
