import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { Language } from '../../api/language.dto';
import { fetchLanguage } from '../../api/languages';
import { fetchRealm } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import { imageBaseUrl } from '../../services/config';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import LanguageViewActions from './LanguageViewActions';
import LanguageViewInfo from './LanguageViewInfo';
import LanguageViewResume from './LanguageViewResume';

const LanguageView: FC = () => {
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
    if (languageId) {
      fetchLanguage(languageId)
        .then((data) => setLanguage(data))
        .catch((err) => showError(err.message));
    }
  }, [languageId, showError]);

  if (!language || !realm) return <p>Loading...</p>;

  return (
    <>
      <LanguageViewActions language={language} realm={realm} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 2 }}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/language.png`} />
          <LanguageViewResume realm={realm} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <LanguageViewInfo language={language} />
        </Grid>
      </Grid>
    </>
  );
};

export default LanguageView;
