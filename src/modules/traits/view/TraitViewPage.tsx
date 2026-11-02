import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Chip } from '@mui/material';
import {
  canEditEntity,
  deleteTrait,
  DetailPage,
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
        { name: state.entity ? t(state.entity.name) : t('view') },
      ]}
      entity={state}
      technicalInfo={false}
      onEdit={editable ? (trait) => navigate(`/core/traits/edit/${trait.id}`, { state: { trait } }) : undefined}
      onDelete={editable ? onDelete : undefined}
      hero={(trait) => ({
        title: t(trait.name),
        overline: t(trait.category),
        image: getTraitImage(trait),
        chips: [
          <Chip
            key="type"
            size="small"
            color={trait.isTalent ? 'primary' : 'warning'}
            variant="outlined"
            label={t(trait.isTalent ? 'trait' : 'flaw')}
          />,
          <EntitySourceChip key="source" entity={trait} />,
        ],
      })}
    >
      {(trait) => <TraitViewInfo trait={trait} />}
    </DetailPage>
  );
}
