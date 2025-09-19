import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Link } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { Language } from '../../api/language.dto';
import { fetchLanguages } from '../../api/languages';
import LanguageCard from '../../shared/cards/language-card';
import RealmListActions from './LanguageListActions';

const LanguageList: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const [languages, setLanguages] = useState<Language[]>([]);

  const bindLanguages = () => {
    fetchLanguages('', 0, 20)
      .then((response) => {
        setLanguages(response);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError('An unknown error occurred');
      });
  };

  const handleNewLanguage = () => {
    navigate('/core/languages/create');
  };

  useEffect(() => {
    bindLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <RealmListActions />
      <Grid container spacing={2} mb={2} alignItems="center">
        <Grid size={8}>
          <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
            {languages.map((language) => (
              <LanguageCard key={language.id} language={language} />
            ))}
          </Box>
        </Grid>
      </Grid>
      {languages.length === 0 ? (
        <p>
          No languages found.{' '}
          <Link component="button" onClick={handleNewLanguage}>
            {t('create-new')}
          </Link>
        </p>
      ) : null}
    </>
  );
};

export default LanguageList;
