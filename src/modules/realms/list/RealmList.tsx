import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import { CircularProgress, Grid } from '@mui/material';
import {
  RmuPagination,
  RmuTextCard,
  Realm,
  fetchRealms,
  LayoutBase,
  RefreshButton,
  AddButton,
  RmuCard,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { imageBaseUrl } from '../../services/config';
import { gridSizeCard } from '../../services/display';
import RealmListSearch from './RealmListSearch';

const defaultImage = `${imageBaseUrl}images/generic/realm.png`;

export default function RealmList() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const [realms, setRealms] = useState<Realm[]>();
  const [queryString, setQueryString] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(24);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    fetchRealms(queryString, page, pageSize, auth)
      .then((response) => {
        setRealms(response.content);
        setTotalPages(response.pagination.totalPages);
      })
      .catch((err) => showError(err.message));
  }, [queryString, auth]);

  const onAddRealmClick = () => {
    navigate('/core/realms/create');
  };

  const onRefreshButtonClick = () => {
    fetchRealms('', 0, 20, auth)
      .then((response) => setRealms(response.content))
      .catch((err) => showError(err.message));
  };

  const handleRealmClick = (realm: Realm) => {
    navigate(`/core/realms/view/${realm.id}`, { state: { realm } });
  };

  return (
    <>
      <LayoutBase
        breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('realms') }]}
        actions={[
          <RefreshButton onClick={() => onRefreshButtonClick()} />,
          <AddButton onClick={() => onAddRealmClick()} />,
        ]}
      >
        <RealmListSearch setQueryString={setQueryString} />
        {!realms ? (
          <CircularProgress />
        ) : (
          <>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              {realms.map((realm) => (
                <Grid size={gridSizeCard} key={realm.id}>
                  <RmuTextCard
                    key={realm.id}
                    value={realm.name}
                    subtitle={realm.shortDescription || t('no-description')}
                    image={realm.imageUrl || defaultImage}
                    lock={realm.accessType === 'private'}
                    onClick={() => handleRealmClick(realm)}
                  />
                </Grid>
              ))}
              {realms.length === 0 ? <p>No realms found.</p> : null}
            </Grid>
            <RmuPagination
              page={page}
              pageSize={pageSize}
              totalPages={totalPages}
              setPage={setPage}
              setPageSize={setPageSize}
            />
          </>
        )}
      </LayoutBase>
    </>
  );
}
