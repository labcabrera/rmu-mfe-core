import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { updateRace } from '../../api/race';
import { Race, UpdateRaceDto } from '../../api/race.dto';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const RaceEditActions: FC<{
  race: Race;
  formData: UpdateRaceDto;
}> = ({ race, formData }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('realms'), link: '/core/realms' },
    { name: race.realmName, link: `/core/realms/view/${race.realmId}` },
    { name: t('edit') },
  ];

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
    <RmuBreadcrumbs items={breadcrumbs}>
      <CancelButton onClick={onCancel} />
      <SaveButton onClick={onSave} />
    </RmuBreadcrumbs>
  );
};

export default RaceEditActions;
