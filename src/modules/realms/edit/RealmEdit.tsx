import React, { FC, useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useLocation, useParams } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import { EditableAvatar, TechnicalInfo, Realm, UpdateRealmDto, fetchRealm } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { imageBaseUrl } from '../../services/config';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import { getAvatarImages } from '../../services/image-service';
import RealmForm from '../shared/RealmForm';
import RealmEditActions from './RealmEditActions';

const RealmEdit: FC = () => {
  const location = useLocation();
  const auth = useAuth();
  const { showError } = useError();
  const { realmId } = useParams<{ realmId?: string }>();
  const [realm, setRealm] = useState<Realm | null>(null);
  const [formData, setFormData] = useState<Realm>({} as unknown as Realm);

  useEffect(() => {
    if (!realm) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { id, ...rest } = realm;
    setFormData(rest as unknown as Realm);
  }, [realm]);

  useEffect(() => {
    if (location.state && location.state.realm) {
      setRealm(location.state.realm);
    } else if (realmId) {
      fetchRealm(realmId, auth)
        .then((response) => setRealm(response))
        .catch((err) => showError(err.message));
    }
  }, [location.state, realmId, showError]);

  if (!realm || !formData) return <div>Loading realm...</div>;

  return (
    <Grid container spacing={1}>
      <Grid size={gridSizeResume}>
        <EditableAvatar
          imageUrl={`${imageBaseUrl}images/generic/realm.png`}
          images={getAvatarImages()}
          onImageChange={(imageUrl) => setFormData({ ...formData, imageUrl: imageUrl })}
        />
      </Grid>
      <Grid size={gridSizeMain}>
        <RealmEditActions realm={realm} formData={formData} />
        <Paper sx={{ p: 2 }}>
          <RealmForm formData={formData} setFormData={setFormData} />
        </Paper>
        <TechnicalInfo>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </TechnicalInfo>
      </Grid>
    </Grid>
  );
};

export default RealmEdit;
