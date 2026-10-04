/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  CancelButton,
  EffectType,
  fetchEffectType,
  LayoutBase,
  SaveButton,
  TechnicalInfo,
  updateEffectType,
  UpdateEffectTypeDto,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import EffectTypeForm from '../form/EffectTypeForm';

const EffectTypeEdit: FC = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showError } = useError();
  const { effectTypeId } = useParams<{ effectTypeId?: string }>();
  const [effectType, setEffectType] = useState<EffectType>();
  const [formData, setFormData] = useState<EffectType>({} as EffectType);
  const [isValid, setIsValid] = useState(false);

  const bindEffectType = (id: string) => {
    fetchEffectType(id, auth)
      .then((response) => setEffectType(response))
      .catch((err) => showError(err.message));
  };

  const onUpdate = () => {
    if (!effectType) return;
    const { id, owner, entitySource, ...dto } = formData;
    updateEffectType(effectType.id, dto as UpdateEffectTypeDto, auth)
      .then((data) => navigate(`/core/effect-types/view/${data.id}`, { state: { effectType: data } }))
      .catch((err) => showError(err.message));
  };

  const validateForm = () => {
    if (!formData) return false;
    if (!formData.accessType) return false;
    return true;
  };

  useEffect(() => {
    if (location.state && location.state.effectType) {
      setEffectType(location.state.effectType);
    } else if (effectTypeId) {
      bindEffectType(effectTypeId);
    }
  }, [location.state, effectTypeId]);

  useEffect(() => {
    if (effectType) {
      setFormData(effectType);
    }
  }, [effectType]);

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  if (!effectType || !formData) return <p>Loading...</p>;

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('effect-types'), link: '/core/effect-types' },
        { name: t('edit') },
      ]}
      actions={[
        <CancelButton onClick={() => navigate(`/core/effect-types/view/${effectType.id}`, { state: { effectType } })} />,
        <SaveButton onClick={() => onUpdate()} disabled={!isValid} />,
      ]}
    >
      <EffectTypeForm formData={formData} setFormData={setFormData} create={false} />
      <TechnicalInfo>
        <pre>EffectType: {JSON.stringify(effectType, null, 2)}</pre>
        <pre>FormData: {JSON.stringify(formData, null, 2)}</pre>
      </TechnicalInfo>
    </LayoutBase>
  );
};

export default EffectTypeEdit;
