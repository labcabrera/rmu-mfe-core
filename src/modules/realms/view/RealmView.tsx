import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchRealm } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import RealmViewActions from './RealmViewActions';
import RealmViewLanguages from './RealmViewLanguages';
import RealmViewRaces from './RealmViewRaces';

const RealmView: FC = () => {
  const location = useLocation();
  const { showError } = useError();
  const { realmId } = useParams<{ realmId?: string }>();
  const [realm, setRealm] = useState<Realm | null>(null);

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
      <Grid container spacing={2}>
        <Grid size={2}>
          <Typography variant="h6" color="primary">
            {realm.name}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }} mt={5}>
            {realm.description}
          </Typography>
        </Grid>
        <Grid size={9}>
          <RealmViewRaces realm={realm} />
          <RealmViewLanguages realm={realm} />
        </Grid>
      </Grid>
    </>
  );
};

export default RealmView;
