import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchRealms, Realm } from '../../api/realm';
import RealmListActions from './RealmListActions';
import RealmListItem from './RealmListItem';

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
      {realms.map((realm) => (
        <RealmListItem key={realm.id} realm={realm} />
      ))}
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
