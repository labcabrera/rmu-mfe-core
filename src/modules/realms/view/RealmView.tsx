import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchRealm, Realm } from '../../api/realm';
import RealmRaces from './RealmRaces';
import RealmViewActions from './RealmViewActions';
import RealmViewInfo from './RealmViewInfo';

const RealmView: FC = () => {
  const location = useLocation();
  const { realmId } = useParams<{ realmId?: string }>();
  const { showError } = useError();
  const [realm, setRealm] = useState<Realm | null>(null);

  const bindRealm = async (realmId?: string) => {
    if (!realmId) return;
    fetchRealm(realmId)
      .then((response) => {
        setRealm(response);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError(String(err));
      });
  };

  useEffect(() => {
    if (location.state && location.state.realm) {
      setRealm(location.state.realm);
    } else {
      bindRealm(realmId);
    }
  }, [location.state, realmId]);

  if (!realm) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <RealmViewActions realm={realm} />
      <Grid container spacing={1}>
        <Grid size={4}>
          <RealmViewInfo realm={realm} />
        </Grid>
        <Grid size={12}></Grid>
        <Grid size={12}>
          <RealmRaces realm={realm} />
        </Grid>
      </Grid>
    </>
  );
};

export default RealmView;
