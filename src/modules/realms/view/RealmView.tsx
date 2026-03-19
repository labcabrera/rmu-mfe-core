import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchRealm } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import TechnicalInfo from '../../shared/display/TechnicalInfo';
import RealmViewActions from './RealmViewActions';
import RealmViewResume from './RealmViewResume';
import RealmViewTabs from './RealmViewTabs';

const RealmView: FC = () => {
  const location = useLocation();
  const { showError } = useError();
  const { realmId } = useParams<{ realmId?: string }>();
  const [realm, setRealm] = useState<Realm>();

  useEffect(() => {
    if (location.state && location.state.realm) {
      setRealm(location.state.realm);
    } else if (realmId) {
      fetchRealm(realmId)
        .then((response) => setRealm(response))
        .catch((err) => showError(err.message));
    }
  }, [location.state, realmId, showError]);

  if (!realm) return <p>Loading realm...</p>;

  return (
    <>
      <RealmViewActions realm={realm} setRealm={setRealm} />
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}>
          <RealmViewResume realm={realm} setRealm={setRealm} />
        </Grid>
        <Grid size={gridSizeMain}>
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
