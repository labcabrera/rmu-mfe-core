import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Realm, UpdateRealmDto } from '../../api/realm.dto';
import RealmEditActions from './RealmEditActions';
import RealmEditAttributes from './RealmEditAttributes';

const RealmEdit: FC = () => {
  const location = useLocation();
  const realm = (location.state as { realm?: Realm })?.realm;

  const [formData, setFormData] = useState<UpdateRealmDto>({
    name: realm?.name || '',
    description: realm?.description || '',
  });

  if (!realm) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <RealmEditActions realm={realm} formData={formData} />
      <Grid container spacing={1}>
        <Grid size={4}>
          <RealmEditAttributes formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
    </>
  );
};

export default RealmEdit;
