import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Chip, Grid, Stack, Tooltip, Typography } from '@mui/material';
import {
  EntityImage,
  EntitySourceChip,
  imageBaseUrl,
  Realm,
  updateRealm,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';

const RealmViewResume: FC<{
  realm: Realm;
  setRealm: (realm: Realm) => void;
  /** Spec 063: without permission the image cannot be changed. */
  editable?: boolean;
}> = ({ realm, setRealm, editable = true }) => {
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
        <EntityImage
          image={realm.imageUrl || `${imageBaseUrl}images/generic/realm.png`}
          onImageChange={editable ? (image) => onImageChange(image) : undefined}
        />
        <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
          <Chip size="small" label={t(realm.accessType)} color={realm.accessType === 'public' ? 'success' : 'error'} />
          <EntitySourceChip entity={realm} />
          {realm.generic && (
            <Tooltip title={t('realm-generic-help')}>
              <Chip size="small" label={t('realm-generic')} color="info" variant="outlined" />
            </Tooltip>
          )}
        </Stack>
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
