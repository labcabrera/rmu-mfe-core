import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import {
  emptyResistanceRollQuery,
  LayoutBase,
  resistanceRoll,
  ResistanceRollQuery,
  ResistanceRollResult,
  TechnicalInfo,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../ErrorContext';
import { openEndedRoll } from '../services/random-service';
import ResistanceRollViewForm from './ResistanceRollViewForm';
import ResistanceRollViewResult from './ResistanceRollViewResult';

export default function ResistanceRollView() {
  const { showError } = useError();
  const auth = useAuth();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ResistanceRollQuery>(emptyResistanceRollQuery);
  const [result, setResult] = useState<ResistanceRollResult>();

  const onRandom = () => {
    setFormData({ ...formData, roll: openEndedRoll() });
  };

  const onSubmit = () => {
    resistanceRoll(formData, auth)
      .then((result) => setResult(result))
      .catch((err) => showError(err.message));
  };

  const isValidForm = (): boolean => {
    if (!formData || !formData.attackLevel || !formData.targetLevel || !formData.roll) return false;
    return true;
  };

  useEffect(() => {
    const isValid = isValidForm();
    if (isValid) {
      onSubmit();
    }
  }, [formData]);

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('resistance-rolls') },
      ]}
    >
      <ResistanceRollViewForm formData={formData} setFormData={setFormData} onRandom={onRandom} />
      <ResistanceRollViewResult result={result} />
      <TechnicalInfo>
        <pre>FormData: {JSON.stringify(formData, null, 2)}</pre>
        <pre>Result: {JSON.stringify(result, null, 2)}</pre>
      </TechnicalInfo>
    </LayoutBase>
  );
}
