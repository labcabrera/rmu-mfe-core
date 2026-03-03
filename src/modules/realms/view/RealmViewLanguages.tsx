import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { Language } from '../../api/language.dto';
import { fetchLanguages } from '../../api/languages';
import { Realm } from '../../api/realm.dto';
import { imageBaseUrl } from '../../services/config';
import RmuTextCard from '../../shared/cards/RmuTextCard';

const RealmViewLanguages: FC<{
  realm: Realm;
}> = ({ realm }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    if (realm) {
      fetchLanguages(`realmId==${realm.id}`, 0, 50)
        .then((response) => setLanguages(response))
        .catch((err) => showError(err.message));
    }
  }, [realm, showError]);

  return (
    <Grid container spacing={1}>
      {languages.map((language) => (
        <Grid size={{ xs: 12, md: 3 }} key={language.id}>
          <RmuTextCard
            size="medium"
            key={language.id}
            value={language.name}
            subtitle={t('language')}
            image={`${imageBaseUrl}images/generic/language.png`}
            onClick={() => navigate(`/core/languages/view/${language.id}`, { state: { language: language } })}
          />
        </Grid>
      ))}
      {languages.length === 0 && (
        <Typography variant="body1" color="textSecondary">
          No languages added
        </Typography>
      )}
    </Grid>
  );
};

export default RealmViewLanguages;
