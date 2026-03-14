import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchRealm } from '../../api/realm';
import { Realm, UpdateRealmDto } from '../../api/realm.dto';
import { imageBaseUrl } from '../../services/config';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import TechnicalInfo from '../../shared/display/TechnicalInfo';
import RealmForm from '../shared/RealmForm';
import RealmEditActions from './RealmEditActions';

const RealmEdit: FC = () => {
  const location = useLocation();
  const { showError } = useError();
  const { realmId } = useParams<{ realmId?: string }>();
  const [realm, setRealm] = useState<Realm | null>(null);
  const [formData, setFormData] = useState<UpdateRealmDto | null>(null);

  useEffect(() => {
    if (realm) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      const { id, ...rest } = realm;
      setFormData(rest);
    }
  }, [realm]);

  useEffect(() => {
    if (location.state && location.state.realm) {
      setRealm(location.state.realm);
    } else if (realmId) {
      fetchRealm(realmId)
        .then((response) => setRealm(response))
        .catch((err) => showError(err.message));
    }
  }, [location.state, realmId, showError]);

  if (!realm || !formData) return <div>Loading realm...</div>;

  return (
    <>
      <RealmEditActions realm={realm} formData={formData} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 2 }}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/realm.png`} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <RealmForm formData={formData} setFormData={setFormData} />
          <TechnicalInfo>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default RealmEdit;
