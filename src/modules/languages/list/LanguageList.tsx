import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { Language } from '../../api/language.dto';
import { fetchLanguages } from '../../api/languages';
import { fetchRealms } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import { imageBaseUrl } from '../../services/config';
import RmuTextCard from '../../shared/cards/RmuTextCard';
import RealmListActions from './LanguageListActions';
import LanguageListSearch from './LanguageListSearch';

const PAGE_SIZE = 24;

const LanguageList: FC = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [realms, setRealms] = useState<Realm[]>([]);
  const [queryString, setQueryString] = useState('');

  const bindRealms = () => {
    fetchRealms('', 0, 100)
      .then((response) => setRealms(response))
      .catch((err: Error) => showError(err.message));
  };

  const bindLanguages = () => {
    fetchLanguages(queryString, 0, PAGE_SIZE)
      .then((response) => setLanguages(response))
      .catch((err: Error) => showError(err.message));
  };

  useEffect(() => {
    bindLanguages();
  }, [queryString]);

  useEffect(() => {
    bindRealms();
  }, []);

  return (
    <>
      <RealmListActions onRefresh={bindLanguages} />
      <Grid container spacing={1}>
        <Grid size={12}>
          <LanguageListSearch setQueryString={setQueryString} realms={realms} />
        </Grid>
        <Grid size={12}>
          <Grid container spacing={1}>
            {languages.map((language) => (
              <Grid size={{ xs: 12, md: 4 }} key={language.id}>
                <RmuTextCard
                  value={language.name}
                  subtitle={language.realm.name}
                  image={`${imageBaseUrl}images/generic/language.png`}
                  onClick={() => navigate(`/core/languages/view/${language.id}`)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid size={12}>{languages.length === 0 ? <p>No languages found.</p> : null}</Grid>
      </Grid>
    </>
  );
};

export default LanguageList;
