import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Link } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchRealms } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import RealmCard from '../../shared/cards/RealmCard';
import RealmListActions from './RealmListActions';

const RealmList: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const [realms, setRealms] = useState<Realm[]>([]);

  const bindRealms = () => {
    fetchRealms('', 0, 20)
      .then((response) => {
        setRealms(response);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError('An unknown error occurred');
      });
  };

  const handleNewRealm = () => {
    navigate('/core/realms/create');
  };

  useEffect(() => {
    bindRealms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <RealmListActions />
      <Grid container spacing={2} mb={2} alignItems="center">
        <Grid size={12}>
          <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
            {realms.map((realm) => (
              <RealmCard key={realm.id} realm={realm} />
            ))}
          </Box>
        </Grid>
      </Grid>
      {realms.length === 0 ? (
        <p>
          No realms found.{' '}
          <Link component="button" onClick={handleNewRealm}>
            {t('create-new')}
          </Link>
        </p>
      ) : null}
    </>
  );
};

export default RealmList;
