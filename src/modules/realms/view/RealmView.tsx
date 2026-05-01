import React, { FC, useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { TechnicalInfo, Realm, fetchRealm } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import RealmViewActions from './RealmViewActions';
import RealmViewResume from './RealmViewResume';
import RealmViewTabs from './RealmViewTabs';

const RealmView: FC = () => {
  const location = useLocation();
  const auth = useAuth();
  const { showError } = useError();
  const { realmId } = useParams<{ realmId?: string }>();
  const [realm, setRealm] = useState<Realm>();

  useEffect(() => {
    if (location.state && location.state.realm) {
      setRealm(location.state.realm);
    } else if (realmId) {
      fetchRealm(realmId, auth)
        .then((response) => setRealm(response))
        .catch((err) => showError(err.message));
    }
  }, [location.state, realmId, auth, showError]);

  if (!realm) return <p>Loading realm...</p>;

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}>
          <RealmViewResume realm={realm} setRealm={setRealm} />
        </Grid>
        <Grid size={gridSizeMain}>
          <RealmViewActions realm={realm} setRealm={setRealm} />
          <RealmViewTabs realm={realm} />
          <TechnicalInfo>
            <pre>{JSON.stringify(realm, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default RealmView;
