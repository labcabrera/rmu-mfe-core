import React, { FC } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  CancelButton,
  createRace,
  CreateRaceDto,
  Race,
  RmuBreadcrumbs,
  SaveButton,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';

const RaceCreationActions: FC<{
  formData: Race;
  isValid: boolean;
}> = ({ formData, isValid }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('Core'), link: '/core' },
    { name: t('Races'), link: '/core/races' },
    { name: t('Creation') },
  ];

  const onSave = () => {
    const dto = formData as unknown as CreateRaceDto;
    createRace(dto, auth)
      .then((race) => navigate(`/core/races/view/${race.id}`))
      .catch((err) => showError(err.message));
  };

  const onCancel = () => {
    navigate(`/tactical/games`);
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <CancelButton onClick={onCancel} />
      <SaveButton onClick={onSave} disabled={!isValid} />
    </RmuBreadcrumbs>
  );
};

export default RaceCreationActions;
