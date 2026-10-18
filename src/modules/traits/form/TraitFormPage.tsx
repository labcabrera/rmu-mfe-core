import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  createTrait,
  fetchTrait,
  FormPage,
  GenericAvatar,
  LoadingState,
  TechnicalInfo,
  Trait,
  updateTrait,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { getTraitImage } from '../../services/trait-image-service';
import { FormMode, useFormData } from '../../shared/form/useFormData';
import TraitForm from './TraitForm';

const EMPTY_TRAIT = {
  name: '',
  isTalent: true,
  specialization: 'none',
  isTierBased: false,
  maxTier: null,
  adquisitionCost: null,
  tierCost: null,
  description: '',
} as unknown as Trait;

/** Create and edit page of a trait. */
export default function TraitFormPage({ mode }: { mode: FormMode }) {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { traitId } = useParams<{ traitId?: string }>();
  const existing = useEntity<Trait>(mode === 'edit' ? traitId : undefined, (id) => fetchTrait(id, auth), {
    initial: location.state?.trait,
    onError: notify.error,
  });
  const { formData, setFormData, dirty } = useFormData<Trait>(mode, existing.entity, () => EMPTY_TRAIT);

  const onSave = () => {
    if (!formData) return;
    const request = mode === 'create' ? createTrait(formData, auth) : updateTrait(traitId!, formData, auth);
    request.then((trait) => navigate(`/core/traits/view/${trait.id}`, { state: { trait } })).catch(notify.error);
  };

  const onCancel = () =>
    mode === 'create'
      ? navigate('/core/traits')
      : navigate(`/core/traits/view/${traitId}`, { state: existing.entity && { trait: existing.entity } });

  return (
    <FormPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('traits'), link: '/core/traits' },
        { name: t(mode === 'create' ? 'creation' : 'edit') },
      ]}
      onSave={onSave}
      onCancel={onCancel}
      saveDisabled={!formData?.name}
      dirty={dirty}
      leftPanel={
        mode === 'edit' && existing.entity ? <GenericAvatar imageUrl={getTraitImage(existing.entity)} /> : undefined
      }
    >
      {formData ? (
        <>
          <TraitForm formData={formData} setFormData={setFormData} />
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
