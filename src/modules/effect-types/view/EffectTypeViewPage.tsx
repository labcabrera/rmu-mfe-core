import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  deleteEffectType,
  DetailPage,
  EffectType,
  fetchEffectType,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import EffectTypeViewInfo from './EffectTypeViewInfo';

export default function EffectTypeViewPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { effectTypeId } = useParams<{ effectTypeId?: string }>();
  const state = useEntity<EffectType>(effectTypeId, (id) => fetchEffectType(id, auth), {
    initial: location.state?.effectType,
    onError: notify.error,
  });

  const onDelete = (effectType: EffectType) =>
    deleteEffectType(effectType.id, auth)
      .then(() => navigate('/core/effect-types'))
      .catch(notify.error);

  return (
    <DetailPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('effect-types'), link: '/core/effect-types' },
        { name: t('view') },
      ]}
      entity={state}
      summaryTitle={(entity) => t(entity.id)}
      onEdit={(effectType) => navigate(`/core/effect-types/edit/${effectType.id}`, { state: { effectType } })}
      onDelete={onDelete}
    >
      {(effectType) => <EffectTypeViewInfo effectType={effectType} />}
    </DetailPage>
  );
}
