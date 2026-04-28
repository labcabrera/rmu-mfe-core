import React, { FC } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { RmuBreadcrumbs, CancelButton, SaveButton, Race, updateRace } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';

const RaceEditActions: FC<{
  race: Race;
  formData: Race;
}> = ({ race, formData }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('realms'), link: '/core/realms' },
    { name: t('edit') },
  ];

  if (!race || !formData) return <p>Loading race...</p>;

  const onSave = async () => {
    updateRace(race.id, formData, auth)
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
