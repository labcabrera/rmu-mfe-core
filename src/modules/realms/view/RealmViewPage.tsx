import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { deleteRealm, DetailPage, fetchRealm, Realm, useEntity, useNotify } from '@labcabrera-rmu/rmu-react-shared-lib';
import RealmViewResume from './RealmViewResume';
import RealmViewTabs from './RealmViewTabs';

export default function RealmViewPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { realmId } = useParams<{ realmId?: string }>();
  const state = useEntity<Realm>(realmId, (id) => fetchRealm(id, auth), {
    initial: location.state?.realm,
    onError: notify.error,
  });

  const onDelete = (realm: Realm) =>
    deleteRealm(realm.id, auth)
      .then(() => navigate('/core/realms'))
      .catch(notify.error);

  return (
    <DetailPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('realms'), link: '/core/realms' },
        { name: t('view') },
      ]}
      entity={state}
      summaryTitle={(entity) => t(entity.name)}
      onEdit={(realm) => navigate(`/core/realms/edit/${realm.id}`, { state: { realm } })}
      onDelete={onDelete}
      leftPanel={(realm) => <RealmViewResume realm={realm} setRealm={state.setEntity} />}
    >
      {(realm) => <RealmViewTabs realm={realm} />}
    </DetailPage>
  );
}
