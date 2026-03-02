import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { createRace } from '../../api/race';
import { CreateRaceDto } from '../../api/race.dto';
import { Realm } from '../../api/realm.dto';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const RaceCreationActions: FC<{
  formData: CreateRaceDto;
  realm: Realm;
  isValid: boolean;
}> = ({ formData, realm, isValid }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('realms'), link: '/core/realms' },
    { name: realm.name, link: `/core/realms/view/${realm.id}` },
    { name: t('race-creation') },
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
