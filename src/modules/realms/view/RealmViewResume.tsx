import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Chip, Grid, Typography } from '@mui/material';
import { EditableAvatar, Realm, updateRealm } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { imageBaseUrl } from '../../services/config';
import { getAvatarImages } from '../../services/image-service';

const RealmViewResume: FC<{
  realm: Realm;
  setRealm: Dispatch<SetStateAction<Realm | undefined>>;
}> = ({ realm, setRealm }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();

  const onImageChange = (imageUrl: string) => {
    updateRealm(realm.id, { imageUrl }, auth)
      .then((updated) => setRealm(updated))
      .catch((err) => showError(err.message));
  };

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <EditableAvatar
          imageUrl={realm.imageUrl || `${imageBaseUrl}images/generic/realm.png`}
          onImageChange={(image) => onImageChange(image)}
          images={getAvatarImages()}
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
