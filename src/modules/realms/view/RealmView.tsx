import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  TechnicalInfo,
  Realm,
  fetchRealm,
  LayoutBase,
  RefreshButton,
  EditButton,
  DeleteButton,
  deleteRealm,
  DeleteDialog,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import RealmViewResume from './RealmViewResume';
import RealmViewTabs from './RealmViewTabs';

const RealmView: FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();
  const { showError } = useError();
  const { realmId } = useParams<{ realmId?: string }>();
  const [realm, setRealm] = useState<Realm>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const bindRealm = (realmId: string) => {
    fetchRealm(realmId, auth)
      .then((response) => setRealm(response))
      .catch((err) => showError(err.message));
  };

  const onDelete = () => {
    deleteRealm(realm!.id, auth)
      .then(() => navigate('/core/realms'))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    if (location.state && location.state.realm) {
      setRealm(location.state.realm);
    } else if (realmId) {
      bindRealm(realmId);
    }
  }, [location.state, realmId, auth, showError]);

  if (!realm) return <p>Loading realm...</p>;

  return (
    <>
      <LayoutBase
        breadcrumbs={[
          { name: t('home'), link: '/' },
          { name: t('core'), link: '/core' },
          { name: t('realms'), link: '/core/realms' },
          { name: t('view') },
        ]}
        actions={[
          <RefreshButton onClick={() => bindRealm(realm.id)} />,
          <EditButton onClick={() => navigate(`/core/realms/edit/${realm.id}`, { state: { realm } })} />,
          <DeleteButton onClick={() => setDeleteDialogOpen(true)} />,
        ]}
        leftPanel={<RealmViewResume realm={realm} setRealm={setRealm} />}
      >
        <RealmViewTabs realm={realm} />
        <TechnicalInfo>
          <pre>{JSON.stringify(realm, null, 2)}</pre>
        </TechnicalInfo>
      </LayoutBase>
      <DeleteDialog
        open={deleteDialogOpen}
        message={`Are you sure you want to delete ${realm.name} realm? This action cannot be undone.`}
        onDelete={() => onDelete()}
        onClose={() => setDeleteDialogOpen(false)}
      />
      {/* <Grid container spacing={1}>
        <Grid size={gridSizeResume}>
          <RealmViewResume realm={realm} setRealm={setRealm} />
        </Grid>
        <Grid size={gridSizeMain}></Grid>
      </Grid> */}
    </>
  );
};

export default RealmView;
