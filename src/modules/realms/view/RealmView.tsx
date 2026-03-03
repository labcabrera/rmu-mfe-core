import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchRealm } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import AddButton from '../../shared/buttons/AddButton';
import CategorySeparator from '../../shared/display/CategorySeparator';
import RealmViewActions from './RealmViewActions';
import RealmViewLanguages from './RealmViewLanguages';
import RealmViewRaces from './RealmViewRaces';

const RealmView: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showError } = useError();
  const { realmId } = useParams<{ realmId?: string }>();
  const [realm, setRealm] = useState<Realm | null>(null);

  const onAddRace = () => {
    navigate(`/core/races/create?realmId=${realm!.id}`);
  };

  const onAddLanguage = () => {
    navigate(`/core/languages/create?realmId=${realm!.id}`);
  };

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
      <Grid container spacing={1} padding={1}>
        <Grid size={{ xs: 12, md: 2 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            {realm.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {realm.shortDescription}
          </Typography>
          <Typography variant="body1" color="secondary" sx={{ whiteSpace: 'pre-line' }}>
            {realm.description}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CategorySeparator text={t('races')}>
            <AddButton onClick={onAddRace} />
          </CategorySeparator>
          <RealmViewRaces realm={realm} />
          <CategorySeparator text={t('languages')}>
            <AddButton onClick={onAddLanguage} />
          </CategorySeparator>
          <RealmViewLanguages realm={realm} />
        </Grid>
      </Grid>
    </>
  );
};

export default RealmView;
