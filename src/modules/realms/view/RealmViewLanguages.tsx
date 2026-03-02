import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { Language } from '../../api/language.dto';
import { fetchLanguages } from '../../api/languages';
import { Realm } from '../../api/realm.dto';
import AddButton from '../../shared/buttons/AddButton';
import LanguageCard from '../../shared/cards/LanguageCard';

const RealmViewLanguages: FC<{
  realm: Realm;
}> = ({ realm }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [languages, setLanguages] = useState<Language[]>([]);

  const onAddLanguage = () => {
    navigate(`/core/languages/create?realmId=${realm.id}`);
  };

  useEffect(() => {
    if (realm) {
      fetchLanguages(`realmId==${realm.id}`, 0, 50)
        .then((response) => setLanguages(response))
        .catch((err) => showError(err.message));
    }
  }, [realm, showError]);

  return (
    <Grid container spacing={1} mt={5}>
      <Grid size={12}>
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
          <Typography variant="h6" color="primary" display="inline">
            {t('languages')}
          </Typography>
          <AddButton onClick={onAddLanguage} />
        </Box>
      </Grid>
      <Grid size={12}>
        <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
          {languages.map((language) => (
            <LanguageCard key={language.id} language={language} />
          ))}
          {languages.length === 0 && (
            <Typography variant="body1" color="textSecondary">
              No languages added
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default RealmViewLanguages;
