import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { Language } from '../../api/language.dto';
import { fetchLanguage } from '../../api/languages';
import LanguageViewActions from './LanguageViewActions';
import LanguageViewInfo from './LanguageViewInfo';

const LanguageView: FC = () => {
  const location = useLocation();
  const { languageId } = useParams<{ languageId?: string }>();
  const { showError } = useError();
  const [language, setLanguage] = useState<Language | null>(null);

  const bindLanguage = async (languageId?: string) => {
    if (!languageId) return;
    fetchLanguage(languageId)
      .then((response) => {
        setLanguage(response);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError(String(err));
      });
  };

  useEffect(() => {
    if (location.state && location.state.language) {
      setLanguage(location.state.language);
    } else {
      bindLanguage(languageId);
    }
  }, [location.state, languageId]);

  if (!language) return <p>Loading...</p>;

  return (
    <>
      <LanguageViewActions language={language} />
      <Grid container spacing={1}>
        <Grid size={4}>
          <LanguageViewInfo language={language} />
        </Grid>
      </Grid>
    </>
  );
};

export default LanguageView;
