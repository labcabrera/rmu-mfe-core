import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chip, Grid, Stack } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { Language } from '../../api/language.dto';
import { fetchLanguage } from '../../api/languages';
import { fetchRealm } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import { imageBaseUrl } from '../../services/config';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import TechnicalInfo from '../../shared/display/TechnicalInfo';
import LanguageViewActions from './LanguageViewActions';
import LanguageViewInfo from './LanguageViewInfo';

const LanguageView: FC = () => {
  const { showError } = useError();
  const { languageId } = useParams<{ languageId?: string }>();
  const [language, setLanguage] = useState<Language | null>(null);
  const [realm, setRealm] = useState<Realm | null>(null);

  useEffect(() => {
    if (language) {
      fetchRealm(language.realm.id)
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

  if (!language || !realm) return <p>Loading language...</p>;

  return (
    <>
      <LanguageViewActions language={language} realm={realm} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 2 }}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/language.png`} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack direction="row" spacing={1}>
            <Chip label={t(language.accessType)} color={language.accessType === 'public' ? 'success' : 'error'} />
          </Stack>
          <LanguageViewInfo language={language} />
          <TechnicalInfo>
            <pre>{JSON.stringify(language, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default LanguageView;
