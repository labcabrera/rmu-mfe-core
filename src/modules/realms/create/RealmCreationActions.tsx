import React, { FC } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Stack, Link } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { createRealm } from '../../api/realm';
import { CreateRealmDto } from '../../api/realm.dto';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const RealmCreationActions: FC<{
  formData: CreateRealmDto;
  isValid: boolean;
}> = ({ formData, isValid }) => {
  const navigate = useNavigate();
  const { showError } = useError();

  const onSaveClick = async () => {
    createRealm(formData)
      .then((realm) => navigate(`/core/realms/view/${realm.id}`))
      .catch((err) => showError(err.message));
  };

  const onBackClick = () => {
    navigate(`/core/realms`);
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="primary" underline="hover" href="/">
            {t('home')}
          </Link>
          <Link component={RouterLink} to="/core" color="primary" underline="hover">
            {t('core')}
          </Link>
          <Link component={RouterLink} to="/core/realms" color="primary" underline="hover">
            {t('realms')}
          </Link>
          <span>{t('creation')}</span>
        </Breadcrumbs>
      </Box>
      <Stack spacing={1} direction="row">
        <CancelButton onClick={onBackClick} />
        <SaveButton onClick={onSaveClick} disabled={!isValid} />
      </Stack>
    </Stack>
  );
};

export default RealmCreationActions;
