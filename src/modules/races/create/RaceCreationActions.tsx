import React, { FC } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Stack, Link } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { createRace } from '../../api/race';
import { CreateRaceDto } from '../../api/race.dto';
import { Realm } from '../../api/realm.dto';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const RaceCreationActions: FC<{
  formData: CreateRaceDto;
  realm: Realm;
  isValid: boolean;
}> = ({ formData, realm, isValid }) => {
  const navigate = useNavigate();
  const { showError } = useError();

  const onSave = () => {
    createRace(formData)
      .then((race) => navigate(`/core/races/view/${race.id}`))
      .catch((err) => showError(err.message));
  };

  const onCancel = () => {
    navigate(`/tactical/games`);
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="primary" underline="hover" href="/">
            {t('home')}
          </Link>
          <Link component={RouterLink} underline="hover" to="/core" color="primary">
            {t('core')}
          </Link>
          <Link component={RouterLink} underline="hover" to="/core/realms" color="primary">
            {t('realms')}
          </Link>
          <Link component={RouterLink} underline="hover" to={`/core/realms/view/${realm.id}`} color="primary">
            {realm.name}
          </Link>
          <span>{t('race-creation')}</span>
        </Breadcrumbs>
      </Box>
      <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end', alignItems: 'flex-start' }}>
        <CancelButton onClick={onCancel} />
        <SaveButton onClick={onSave} disabled={!isValid} />
      </Stack>
    </Stack>
  );
};

export default RaceCreationActions;
