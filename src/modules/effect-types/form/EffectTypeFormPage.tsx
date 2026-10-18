/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  createEffectType,
  CreateEffectTypeDto,
  EffectType,
  fetchEffectType,
  FormPage,
  LoadingState,
  TechnicalInfo,
  updateEffectType,
  UpdateEffectTypeDto,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { FormMode, useFormData } from '../../shared/form/useFormData';
import EffectTypeForm from './EffectTypeForm';

const EMPTY_EFFECT_TYPE: EffectType = {
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

/** Create and edit page of an effect type. */
export default function EffectTypeFormPage({ mode }: { mode: FormMode }) {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { effectTypeId } = useParams<{ effectTypeId?: string }>();
  const existing = useEntity<EffectType>(
    mode === 'edit' ? effectTypeId : undefined,
    (id) => fetchEffectType(id, auth),
    { initial: location.state?.effectType, onError: notify.error }
  );
  const { formData, setFormData, dirty } = useFormData<EffectType>(mode, existing.entity, () => EMPTY_EFFECT_TYPE);

  const isValid = !!formData?.accessType && (mode === 'edit' || !!formData.id);

  const onSave = () => {
    if (!formData) return;
    const { owner, entitySource, ...createDto } = formData;
    const { id, ...updateDto } = createDto;
    const request =
      mode === 'create'
        ? createEffectType(createDto as CreateEffectTypeDto, auth)
        : updateEffectType(effectTypeId!, updateDto as UpdateEffectTypeDto, auth);
    request
      .then((effectType) => navigate(`/core/effect-types/view/${effectType.id}`, { state: { effectType } }))
      .catch(notify.error);
  };

  const onCancel = () =>
    mode === 'create'
      ? navigate('/core/effect-types')
      : navigate(`/core/effect-types/view/${effectTypeId}`, {
          state: existing.entity && { effectType: existing.entity },
        });

  return (
    <FormPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('effect-types'), link: '/core/effect-types' },
        { name: t(mode === 'create' ? 'creation' : 'edit') },
      ]}
      onSave={onSave}
      onCancel={onCancel}
      saveDisabled={!isValid}
      dirty={dirty}
    >
      {formData ? (
        <>
          <EffectTypeForm formData={formData} setFormData={setFormData} create={mode === 'create'} />
          <TechnicalInfo>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </>
      ) : (
        <LoadingState variant="detail" />
      )}
    </FormPage>
  );
}
