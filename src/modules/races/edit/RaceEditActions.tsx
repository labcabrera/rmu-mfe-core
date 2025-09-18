import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useError } from '../../../ErrorContext';
import { updateRace } from '../../api/race';
import { Race, UpdateRaceDto } from '../../api/race.dto';
import BackButton from '../../shared/buttons/BackButton';
import SaveButton from '../../shared/buttons/SaveButton';

const RaceEditActions: FC<{
  race: Race;
  formData: UpdateRaceDto;
}> = ({ race, formData }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showError } = useError();

  if (!race || !formData) return <p>Loading...</p>;

  const handleSaveButtonClick = async () => {
    updateRace(race.id, formData)
      .then((data) => {
        navigate(`/core/races/view/${race.id}`, { state: { race: data } });
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError('An unknown error occurred');
      });
  };

  const handleBackButtonClick = () => {
    navigate(`/core/races/view/${race.id}`, { state: { race: race } });
    return;
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          {t('home')}
        </Link>
        <Link color="inherit" component={RouterLink} to={'/core/'}>
          {t('core')}
        </Link>
        <Link color="inherit" component={RouterLink} to={'/core/realms'}>
          {t('realms')}
        </Link>
        <Link color="inherit" component={RouterLink} to={`/core/realms/view/${race.realmId}`}>
          {race.realmName}
        </Link>
        <Link color="inherit" component={RouterLink} to={`/core/races/view/${race.id}`}>
          {race.name}
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{t('edit')}</Typography>
      </Breadcrumbs>

      <div style={{ flexGrow: 1 }} />

      <BackButton onClick={handleBackButtonClick} />
      <SaveButton onClick={handleSaveButtonClick} />
    </Stack>
  );
};

export default RaceEditActions;
