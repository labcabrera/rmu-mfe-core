import React, { FC } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { updateRace } from '../../api/race';
import { Race, UpdateRaceDto } from '../../api/race.dto';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const RaceEditActions: FC<{
  race: Race;
  formData: UpdateRaceDto;
}> = ({ race, formData }) => {
  const navigate = useNavigate();
  const { showError } = useError();

  if (!race || !formData) return <p>Loading race...</p>;

  const onSave = async () => {
    updateRace(race.id, formData)
      .then((data) => navigate(`/core/races/view/${race.id}`, { state: { race: data } }))
      .catch((err) => showError(err.message));
  };

  const onCancel = () => {
    navigate(`/core/races/view/${race.id}`, { state: { race: race } });
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="primary" underline="hover" href="/">
          {t('home')}
        </Link>
        <Link color="primary" underline="hover" component={RouterLink} to={'/core/'}>
          {t('core')}
        </Link>
        <Link color="primary" underline="hover" component={RouterLink} to={'/core/realms'}>
          {t('realms')}
        </Link>
        <Link color="primary" underline="hover" component={RouterLink} to={`/core/realms/view/${race.realmId}`}>
          {race.realmName}
        </Link>
        <Link color="primary" underline="hover" component={RouterLink} to={`/core/races/view/${race.id}`}>
          {race.name}
        </Link>
        <span>{t('edit')}</span>
      </Breadcrumbs>
      <div style={{ flexGrow: 1 }} />
      <CancelButton onClick={onCancel} />
      <SaveButton onClick={onSave} />
    </Stack>
  );
};

export default RaceEditActions;
