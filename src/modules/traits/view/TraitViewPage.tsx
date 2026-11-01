import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  canEditEntity,
  deleteTrait,
  DetailPage,
  EntityImage,
  EntitySourceChip,
  fetchTrait,
  Trait,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { getTraitImage } from '../../services/trait-image-service';
import TraitViewInfo from './TraitViewInfo';

export default function TraitViewPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { traitId } = useParams<{ traitId?: string }>();
  const state = useEntity<Trait>(traitId, (id) => fetchTrait(id, auth), {
    initial: location.state?.trait,
    onError: notify.error,
  });

  // Spec 063: rulebook entities only for admins, user entities for their owner.
  const editable = canEditEntity(state.entity, auth);

  const onDelete = (trait: Trait) =>
    deleteTrait(trait.id, auth)
      .then(() => navigate('/core/traits'))
      .catch(notify.error);

  return (
    <DetailPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('traits'), link: '/core/traits' },
        { name: t('view') },
      ]}
      entity={state}
      summaryTitle={(entity) => t(entity.name)}
      onEdit={editable ? (trait) => navigate(`/core/traits/edit/${trait.id}`, { state: { trait } }) : undefined}
      onDelete={editable ? onDelete : undefined}
      actions={(trait) => [<EntitySourceChip key="source" entity={trait} />]}
      leftPanel={(trait) => <EntityImage image={getTraitImage(trait)} />}
    >
      {(trait) => <TraitViewInfo trait={trait} />}
    </DetailPage>
  );
}
