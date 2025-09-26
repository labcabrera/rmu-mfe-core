import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Stack, Link } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { createRace } from '../../api/race';
import { CreateRaceDto } from '../../api/race.dto';
import { Realm } from '../../api/realm.dto';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const RaceCreationActions: FC<{
  formData: CreateRaceDto;
  realm: Realm;
  isValid?: boolean;
}> = ({ formData, realm, isValid = false }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showError } = useError();

  if (!realm) return <p>Loading...</p>;

  const handleSave = async () => {
    createRace(formData)
      .then((race) => {
        navigate(`/core/races/view/${race.id}`);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError('Unknown error occurred');
      });
  };

  const handleBack = () => {
    navigate(`/tactical/games`);
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            {t('home')}
          </Link>
          <Link component={RouterLink} to="/core" color="inherit">
            {t('core')}
          </Link>
          <Link component={RouterLink} to="/core/realms" color="inherit">
            {t('realms')}
          </Link>
          <Link component={RouterLink} to={`/core/realms/view/${realm.id}`} color="inherit">
            {realm.name}
          </Link>
          <span>{t('race')}</span>
          <span>{t('creation')}</span>
        </Breadcrumbs>
      </Box>
      <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end', alignItems: 'flex-start' }}>
        <CancelButton onClick={handleBack} />
        <SaveButton onClick={handleSave} disabled={!isValid} />
      </Stack>
    </Stack>
  );
};

export default RaceCreationActions;
