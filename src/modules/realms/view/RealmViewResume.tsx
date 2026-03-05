import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, Typography } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { updateRealm } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import { imageBaseUrl } from '../../services/config';
import EditableAvatar from '../../shared/avatars/EditableAvatar';

const RealmViewResume: FC<{
  realm: Realm;
  setRealm: Dispatch<SetStateAction<Realm>>;
}> = ({ realm, setRealm }) => {
  const { showError } = useError();

  const onImageChange = (imageUrl: string) => {
    updateRealm(realm.id, { imageUrl })
      .then((updated) => setRealm(updated))
      .catch((err: Error) => showError(err.message));
  };

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <EditableAvatar
          imageUrl={realm.imageUrl || `${imageBaseUrl}images/generic/realm.png`}
          onImageChange={(image) => onImageChange(image)}
        />
      </Grid>
      <Typography variant="h6" color="primary" gutterBottom>
        {realm.name}
      </Typography>
      <Typography variant="body1" color="secondary" gutterBottom>
        {realm.shortDescription}
      </Typography>
      <Typography variant="body1" color="secondary" sx={{ whiteSpace: 'pre-line' }}>
        {realm.description}
      </Typography>
    </Grid>
  );
};

export default RealmViewResume;
