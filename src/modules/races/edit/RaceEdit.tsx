import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import {
  CancelButton,
  EditableAvatar,
  fetchRace,
  LayoutBase,
  Race,
  SaveButton,
  TechnicalInfo,
  updateRace,
  UpdateRaceDto,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { getAvatarImages } from '../../services/image-service';
import RaceForm from '../form/RaceForm';

export default function RaceEdit() {
  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { showError } = useError();
  const { raceId } = useParams<{ raceId: string }>();
  const [race, setRace] = useState<Race | null>(null);
  const [formData, setFormData] = useState<Race>({} as unknown as Race);

  const onSave = async () => {
    const { id, ...rest } = formData;
    const dto = rest as unknown as UpdateRaceDto;
    updateRace(id, dto, auth)
      .then((data) => navigate(`/core/races/view/${race!.id}`, { state: { race: data } }))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    if (race) {
      setFormData(race);
    }
  }, [race]);

  useEffect(() => {
    if (location.state && location.state.realm) {
      setRace(location.state.realm);
    } else if (raceId) {
      fetchRace(raceId, auth)
        .then((response) => setRace(response))
        .catch((err) => showError(err.message));
    }
  }, [location.state, raceId]);

  if (!race || !formData) return <div>Loading race...</div>;

  return (
    <LayoutBase
      breadcrumbs={[{ name: t('core'), link: '/core' }, { name: t('races'), link: '/core/races' }, { name: t('edit') }]}
      actions={[
        <CancelButton onClick={() => navigate(`/core/races/view/${race.id}`, { state: { race: race } })} />,
        <SaveButton onClick={onSave} />,
      ]}
      leftPanel={
        <EditableAvatar
          imageUrl={formData.imageUrl || ''}
          onImageChange={(image) => setFormData({ ...formData, imageUrl: image })}
          images={getAvatarImages()}
        />
      }
    >
      <RaceForm realmId={race.realmId} formData={formData} setFormData={setFormData} />
      <TechnicalInfo>
        <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
      </TechnicalInfo>
    </LayoutBase>
  );
}
