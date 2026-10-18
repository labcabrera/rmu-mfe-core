import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Chip, Grid, Typography } from '@mui/material';
import { EditableAvatar, imageBaseUrl, Realm, updateRealm, useNotify } from '@labcabrera-rmu/rmu-react-shared-lib';

const RealmViewResume: FC<{
  realm: Realm;
  setRealm: (realm: Realm) => void;
}> = ({ realm, setRealm }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();

  const onImageChange = (imageUrl: string) => {
    updateRealm(realm.id, { imageUrl }, auth)
      .then((updated) => setRealm(updated))
      .catch((err) => notify.error(err));
  };

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <EditableAvatar
          imageUrl={realm.imageUrl || `${imageBaseUrl}images/generic/realm.png`}
          onImageChange={(image) => onImageChange(image)}
        />
        <Chip
          size="small"
          label={t(realm.accessType)}
          color={realm.accessType === 'public' ? 'success' : 'error'}
          sx={{ mt: 2 }}
        />
      </Grid>
      <Grid size={12}>
        <Typography variant="h6" color="primary" gutterBottom>
          {realm.name}
        </Typography>
        <Typography variant="caption" color="secondary" sx={{ whiteSpace: 'pre-line' }}>
          {realm.description}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RealmViewResume;
