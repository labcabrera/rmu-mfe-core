/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Pagination } from '@mui/material';
import { RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchRealms } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import { imageBaseUrl } from '../../services/config';
import { gridSizeResume, gridSizeMain, gridSizeCard } from '../../services/display';
import RealmListActions from './RealmListActions';
import RealmListSearch from './RealmListSearch';

const defaultImage = `${imageBaseUrl}images/generic/realm.png`;

const RealmList: FC = () => {
  const { showError } = useError();
  const [realms, setRealms] = useState<Realm[]>([]);
  const [queryString, setQueryString] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  useEffect(() => {
    fetchRealms(queryString, 0, 100)
      .then((response) => {
        setRealms(response.content);
        setTotalPages(response.pagination.totalPages);
      })
      .catch((err) => showError(err.message));
  }, [queryString]);

  const handleRealmClick = (realm: Realm) => {
    navigate(`/core/realms/view/${realm.id}`, { state: { realm } });
  };
  return (
    <>
      <RealmListActions setRealms={setRealms} />
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <RealmListSearch setQueryString={setQueryString} />
            </Grid>
            <Grid size={12}>
              <Grid container spacing={1}>
                {realms.map((realm) => (
                  <Grid size={gridSizeCard} key={realm.id}>
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
            <Grid size={12}>
              <Box mt={2} display="flex" justifyContent="center">
                <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} color="primary" />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RealmList;
