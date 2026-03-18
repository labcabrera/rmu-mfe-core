import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchRealms } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import { imageBaseUrl } from '../../services/config';
import RmuTextCard from '../../shared/cards/RmuTextCard';
import RealmListActions from './RealmListActions';

const defaultImage = `${imageBaseUrl}images/generic/realm.png`;

const RealmList: FC = () => {
  const { showError } = useError();
  const [realms, setRealms] = useState<Realm[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRealms('', 0, 100)
      .then((response) => setRealms(response.content))
      .catch((err) => showError(err.message));
  }, [showError]);

  const handleRealmClick = (realm: Realm) => {
    navigate(`/core/realms/view/${realm.id}`, { state: { realm } });
  };
  return (
    <>
      <RealmListActions setRealms={setRealms} />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={1}>
            {realms.map((realm) => (
              <Grid size={{ xs: 12, md: 3 }} key={realm.id}>
                <RmuTextCard
                  key={realm.id}
                  value={realm.name}
                  subtitle={realm.shortDescription || t('No description')}
                  image={realm.imageUrl || defaultImage}
                  onClick={() => handleRealmClick(realm)}
                />
              </Grid>
            ))}
            {realms.length === 0 ? <p>No realms found.</p> : null}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RealmList;
