import React, { FC, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchEnumerations } from '../../api/enumerations';
import { Enumeration } from '../../api/enumerations.dto';
import { Realm } from '../../api/realm.dto';
import { imageBaseUrl } from '../../services/config';
import RmuTextCard from '../../shared/cards/RmuTextCard';

const RealmViewLanguages: FC<{
  realm: Realm;
}> = ({ realm }) => {
  const { showError } = useError();
  const [languages, setLanguages] = useState<Enumeration[]>([]);

  useEffect(() => {
    if (realm) {
      fetchEnumerations(`realmId==${realm.id};category==language`, 0, 100)
        .then((response) => setLanguages(response.content))
        .catch((err) => showError(err.message));
    }
  }, [realm, showError]);

  return (
    <Grid container spacing={1}>
      {languages.map((language) => (
        <Grid size={{ xs: 12, md: 3 }} key={language.id}>
          <RmuTextCard
            key={language.id}
            value={language.key}
            subtitle={t('language')}
            image={`${imageBaseUrl}images/generic/language.png`}
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
