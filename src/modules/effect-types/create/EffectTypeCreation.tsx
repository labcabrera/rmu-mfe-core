import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  CancelButton,
  createEffectType,
  CreateEffectTypeDto,
  EffectType,
  LayoutBase,
  SaveButton,
  TechnicalInfo,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import EffectTypeForm from '../form/EffectTypeForm';

const template: EffectType = {
  id: '',
  isPersistent: false,
  isStackable: false,
  value: 'forbidden',
  modifier: 'forbidden',
  rounds: 'forbidden',
  text: 'optional',
  location: 'forbidden',
  delay: 'forbidden',
  owner: '',
  accessType: 'public',
  entitySource: 'user',
};

const EffectTypeCreation: FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const [formData, setFormData] = useState<EffectType>(template);
  const [isValid, setIsValid] = useState(false);

  const onCreate = () => {
    const { owner, entitySource, ...dto } = formData;
    createEffectType(dto as CreateEffectTypeDto, auth)
      .then((effectType) => navigate(`/core/effect-types/view/${effectType.id}`, { state: { effectType } }))
      .catch((err) => showError(err.message));
  };

  const validateForm = () => {
    if (!formData.id) return false;
    if (!formData.accessType) return false;
    return true;
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('effect-types'), link: '/core/effect-types' },
        { name: t('creation') },
      ]}
      actions={[
        <CancelButton onClick={() => navigate('/core/effect-types')} />,
        <SaveButton onClick={() => onCreate()} disabled={!isValid} />,
      ]}
    >
      <EffectTypeForm formData={formData} setFormData={setFormData} create={true} />
      <TechnicalInfo>
        <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
      </TechnicalInfo>
    </LayoutBase>
  );
};

export default EffectTypeCreation;
