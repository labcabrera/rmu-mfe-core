import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Breadcrumbs, IconButton, Link, Stack } from '@mui/material';

const RealmListActions: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNewRealm = async () => {
    navigate('/core/realms/create');
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="primary" underline="hover" href="/">
            {t('home')}
          </Link>
          <Link component={RouterLink} color="primary" underline="hover" to="/core">
            {t('core')}
          </Link>
          <span>{t('realms')}</span>
        </Breadcrumbs>
      </Box>
      <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end', alignItems: 'flex-start' }}>
        <IconButton onClick={handleNewRealm}>
          <AddCircleIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default RealmListActions;
