import React, { Dispatch, FC, SetStateAction } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Link, Stack } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchRealms } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import AddButton from '../../shared/buttons/AddButton';
import RefreshButton from '../../shared/buttons/RefreshButton';

const RealmListActions: FC<{ setRealms: Dispatch<SetStateAction<Realm[]>> }> = ({ setRealms }) => {
  const navigate = useNavigate();
  const { showError } = useError();

  const onAddRealmClick = () => {
    navigate('/core/realms/create');
  };

  const onRefreshButtonClick = () => {
    fetchRealms('', 0, 20)
      .then((response) => setRealms(response))
      .catch((err) => showError(err.message));
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
      <Stack spacing={1} direction="row">
        <RefreshButton onClick={() => onRefreshButtonClick()} />
        <AddButton onClick={() => onAddRealmClick()} />
      </Stack>
    </Stack>
  );
};

export default RealmListActions;
