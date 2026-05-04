import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  CancelButton,
  fetchTrait,
  GenericAvatar,
  LayoutBase,
  SaveButton,
  TechnicalInfo,
  Trait,
  updateTrait,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { getTraitImage } from '../../services/trait-image-service';
import TraitForm from '../form/TraitForm';

export default function TraitEdit() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showError } = useError();
  const { traitId } = useParams<{ traitId: string }>();
  const [trait, setTrait] = useState<Trait | null>(null);
  const [formData, setFormData] = useState<Trait>({} as unknown as Trait);

  const onUpdate = () => {
    if (!trait) return;
    updateTrait(trait.id, formData, auth)
      .then((data) => navigate(`/core/traits/view/${trait.id}`, { state: { trait: data } }))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    if (trait) {
      setFormData(trait);
    }
  }, [trait]);

  useEffect(() => {
    if (location.state && location.state.trait) {
      setTrait(location.state.trait);
    } else if (traitId) {
      fetchTrait(traitId, auth)
        .then((data) => setTrait(data))
        .catch((err: Error) => showError(err.message));
    }
  }, [location.state, traitId, showError]);

  if (!trait || !formData) return <div>Loading trait...</div>;

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('core'), link: '/core' },
        { name: t('traits'), link: '/core/traits' },
        { name: t('edit') },
      ]}
      actions={[
        <CancelButton onClick={() => navigate(`/core/traits/view/${trait.id}`, { state: { trait } })} />,
        <SaveButton onClick={() => onUpdate()} />,
      ]}
      leftPanel={<GenericAvatar imageUrl={getTraitImage(trait)} />}
    >
      <TraitForm formData={formData} setFormData={setFormData} />
      <TechnicalInfo>
        <pre>FormData: {JSON.stringify(formData, null, 2)}</pre>
      </TechnicalInfo>
    </LayoutBase>
  );
}
