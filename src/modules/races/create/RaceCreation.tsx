import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  EditableAvatar,
  TechnicalInfo,
  Realm,
  fetchRealm,
  Race,
  LayoutBase,
  CancelButton,
  SaveButton,
  createRace,
  CreateRaceDto,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { imageBaseUrl } from '../../services/config';
import RaceForm from '../form/RaceForm';

export const RACE_CREATE_TEMPLATE = {
  name: '',
  realmId: '',
  archetype: '',
  sizeId: 'medium',
  stats: {
    ag: 0,
    co: 0,
    em: 0,
    in: 0,
    me: 0,
    pr: 0,
    qu: 0,
    re: 0,
    sd: 0,
    st: 0,
  },
  resistances: {
    channeling: 0,
    mentalism: 0,
    essence: 0,
    physical: 0,
    poison: 0,
    disease: 0,
    fear: 0,
  },
  averageHeight: {
    male: 0,
    female: 0,
  },
  averageWeight: {
    male: 0,
    female: 0,
  },
  strideBonus: 0,
  enduranceBonus: 0,
  recoveryMultiplier: 1,
  baseHits: 0,
  baseDevPoints: 60,
  baseAt: 1,
  talents: [],
  traits: [],
  defaultLanguage: null,
  description: '',
  imageUrl: `${imageBaseUrl}images/races/unknown-alt.png`,
} as unknown as Race;

export default function RaceCreation() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const realmId = searchParams.get('realmId');
  const { showError } = useError();
  const [realm, setRealm] = useState<Realm | null>(null);
  const [formData, setFormData] = useState<Race>(RACE_CREATE_TEMPLATE);
  const [isValid, setIsValid] = useState(false);

  const validateForm = (formData: Race) => {
    if (!formData.name) return false;
    if (!formData.realmId) return false;
    return true;
  };

  const onSave = () => {
    const dto = formData as unknown as CreateRaceDto;
    createRace(dto, auth)
      .then((race) => navigate(`/core/races/view/${race.id}`))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    setIsValid(validateForm(formData));
  }, [formData]);

  useEffect(() => {
    if (!realm || !formData || !setFormData) return;
    setFormData({ ...formData, realmId: realm.id });
  }, [realm]);

  useEffect(() => {
    if (!realmId || !auth) return;
    fetchRealm(realmId, auth)
      .then((response) => setRealm(response))
      .catch((err) => showError(err.message));
  }, [realmId]);

  if (!realm || !formData) return <div>Loading...</div>;

  return (
    <>
      <LayoutBase
        breadcrumbs={[
          { name: t('home'), link: '/' },
          { name: t('core'), link: '/core' },
          { name: t('races'), link: '/core/races' },
          { name: t('create') },
        ]}
        actions={[
          <CancelButton onClick={() => navigate(`/tactical/games`)} />,
          <SaveButton onClick={onSave} disabled={!isValid} />,
        ]}
        leftPanel={
          <EditableAvatar
            imageUrl={formData.imageUrl || ''}
            onImageChange={(avatar) => setFormData({ ...formData, imageUrl: avatar })}
          />
        }
      >
        <RaceForm realmId={realm.id} formData={formData} setFormData={setFormData} />
        <TechnicalInfo>
          <pre>FormData: {JSON.stringify(formData, null, 2)}</pre>
        </TechnicalInfo>
      </LayoutBase>
    </>
  );
}
