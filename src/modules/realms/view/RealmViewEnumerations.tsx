/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Grid, Typography } from '@mui/material';
import { EntityCard, Enumeration, fetchEnumerations, Realm, useNotify } from '@labcabrera-rmu/rmu-react-shared-lib';

const RealmViewEnumerations: FC<{
  realm: Realm;
  category: string;
  imageUrl: string;
}> = ({ realm, category, imageUrl }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [enumerations, setEnumerations] = useState<Enumeration[]>([]);

  useEffect(() => {
    if (realm) {
      fetchEnumerations(`realmId==${realm.id};category==${category}`, 0, 100, auth)
        .then((response) => setEnumerations(response.content))
        .catch((err) => notify.error(err));
    }
  }, [realm, notify]);

  return (
    <Grid container spacing={1}>
      {enumerations.map((language) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={language.id}>
          <EntityCard title={language.key} subtitle={t(category)} image={imageUrl} />
        </Grid>
      ))}
      {enumerations.length === 0 && (
        <Typography variant="body1" color="textSecondary">
          {t('no-results')}
        </Typography>
      )}
    </Grid>
  );
};

export default RealmViewEnumerations;
