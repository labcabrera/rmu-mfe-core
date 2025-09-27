import React, { FC } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Link, Stack } from '@mui/material';
import { t } from 'i18next';
import AddButton from '../../shared/buttons/AddButton';

const TraitListActions: FC = () => {
  const navigate = useNavigate();

  const onNewTrait = async () => {
    navigate('/core/traits/create');
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
          <span>{t('traits')}</span>
        </Breadcrumbs>
      </Box>
      <Stack spacing={1} direction="row">
        <AddButton onClick={onNewTrait} />
      </Stack>
    </Stack>
  );
};

export default TraitListActions;
