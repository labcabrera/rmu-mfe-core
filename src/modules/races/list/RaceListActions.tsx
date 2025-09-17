import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Breadcrumbs, IconButton, Link, Stack } from '@mui/material';

const RaceListActions: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNewRace = async () => {
    navigate('/races/create');
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            {t('home')}
          </Link>
          <Link component={RouterLink} color="inherit" to="/races">
            {t('races')}
          </Link>
          <span>{t('races')}</span>
        </Breadcrumbs>
      </Box>
      <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end', alignItems: 'flex-start' }}>
        <IconButton onClick={handleNewRace}>
          <AddCircleIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default RaceListActions;
