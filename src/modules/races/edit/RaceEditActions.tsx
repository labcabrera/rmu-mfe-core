import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  RmuBreadcrumbs,
  CancelButton,
  SaveButton,
  Race,
  updateRace,
  UpdateRaceDto,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';

const RaceEditActions: FC<{
  race: Race;
  formData: Race;
}> = ({ race, formData }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('races'), link: '/core/races' },
    { name: t('edit') },
  ];

  if (!race || !formData) return <p>Loading race...</p>;

  const onSave = async () => {
    const { id, ...rest } = formData;
    const dto = rest as unknown as UpdateRaceDto;
    updateRace(id, dto, auth)
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
