import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { Language } from '../../api/language.dto';
import { fetchLanguage } from '../../api/languages';
import { fetchRealm } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import LanguageViewActions from './LanguageViewActions';
import LanguageViewInfo from './LanguageViewInfo';
import LanguageViewResume from './LanguageViewResume';

const imageBaseUrl = process.env.RMU_MFE_ASSETS!;

const LanguageView: FC = () => {
  const location = useLocation();
  const { showError } = useError();
  const { languageId } = useParams<{ languageId?: string }>();
  const [language, setLanguage] = useState<Language | null>(null);
  const [realm, setRealm] = useState<Realm | null>(null);

  useEffect(() => {
    if (language && language.realmId) {
      fetchRealm(language.realmId)
        .then((data) => setRealm(data))
        .catch((err) => showError(err.message));
    }
  }, [language, showError]);

  useEffect(() => {
    if (location.state && location.state.language) {
      setLanguage(location.state.language);
    } else {
      fetchLanguage(languageId)
        .then((data) => setLanguage(data))
        .catch((err) => showError(err.message));
    }
  }, [location.state, languageId, showError]);

  if (!language || !realm) return <p>Loading...</p>;

  return (
    <>
      <LanguageViewActions language={language} realm={realm} />
      <Grid container spacing={2}>
        <Grid size={2}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/language.png`} size={300} />
          <LanguageViewResume language={language} realm={realm} />
        </Grid>
        <Grid size={8}>
          <LanguageViewInfo language={language} />
        </Grid>
      </Grid>
    </>
  );
};

export default LanguageView;
