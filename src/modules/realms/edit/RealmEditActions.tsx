import React, { FC } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { updateRealm } from '../../api/realm';
import { Realm, UpdateRealmDto } from '../../api/realm.dto';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const RealmEditActions: FC<{
  realm: Realm;
  formData: UpdateRealmDto;
}> = ({ realm, formData }) => {
  const navigate = useNavigate();
  const { showError } = useError();

  const onSaveButtonClick = async () => {
    updateRealm(realm.id, formData)
      .then((data) => {
        navigate(`/core/realms/view/${realm.id}`, { state: { realm: data } });
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError('An unknown error occurred');
      });
  };

  const onCancelButtonClick = () => {
    navigate(`/core/realms/view/${realm.id}`, { state: { realm } });
  };

  if (!realm) return <p>Loading...</p>;

  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="primary" underline="hover" href="/">
          {t('home')}
        </Link>
        <Link component={RouterLink} color="primary" underline="hover" to="/core">
          {t('core')}
        </Link>
        <Link component={RouterLink} color="primary" underline="hover" to="/core/realms">
          {t('realms')}
        </Link>
        <Link
          color="primary"
          underline="hover"
          component={RouterLink}
          to={'/core/realms/view/' + realm.id}
          state={{ realm }}
        >
          {realm.name}
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{t('edit')}</Typography>
      </Breadcrumbs>
      <Stack direction="row" spacing={1}>
        <CancelButton onClick={onCancelButtonClick} />
        <SaveButton onClick={onSaveButtonClick} />
      </Stack>
    </Stack>
  );
};

export default RealmEditActions;
