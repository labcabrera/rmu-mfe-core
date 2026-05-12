import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  CancelButton,
  createTrait,
  LayoutBase,
  SaveButton,
  TechnicalInfo,
  Trait,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import TraitForm from '../form/TraitForm';

const template = {
  name: '',
  isTalent: true,
  specialization: 'none',
  isTierBased: false,
  maxTier: null,
  adquisitionCost: null,
  tierCost: null,
  description: '',
} as unknown as Trait;

export default function TraitCreation() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const [formData, setFormData] = useState<Trait>(template);
  const [isValid, setIsValid] = useState(false);

  const onCreate = async () => {
    createTrait(formData, auth)
      .then((trait) => navigate(`/core/traits/view/${trait.id}`))
      .catch((err) => showError(err.message));
  };

  const validateForm = () => {
    if (!formData.name) return false;
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
        { name: t('traits'), link: '/core/traits' },
        { name: t('creation') },
      ]}
      actions={[
        <CancelButton onClick={() => navigate(`/core/traits`)} />,
        <SaveButton onClick={() => onCreate()} disabled={!isValid} />,
      ]}
    >
      <TraitForm formData={formData} setFormData={setFormData} />
      <TechnicalInfo>
        <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
      </TechnicalInfo>
    </LayoutBase>
  );
}
