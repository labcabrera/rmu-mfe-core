import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CancelButton, RmuBreadcrumbs, SaveButton } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { createRace } from '../../api/race';
import { CreateRaceDto } from '../../api/race.dto';

const RaceCreationActions: FC<{
  formData: CreateRaceDto;
  isValid: boolean;
}> = ({ formData, isValid }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('Core'), link: '/core' },
    { name: t('Races'), link: '/core/races' },
    { name: t('Creation') },
  ];

  const onSave = () => {
    createRace(formData)
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
