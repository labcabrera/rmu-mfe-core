import React, { FC, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchEnumerations } from '../../api/enumerations';
import { Enumeration } from '../../api/enumerations.dto';
import { Realm } from '../../api/realm.dto';
import RmuTextCard from '../../shared/cards/RmuTextCard';

const RealmViewEnumerations: FC<{
  realm: Realm;
  category: string;
  imageUrl: string;
}> = ({ realm, category, imageUrl }) => {
  const { showError } = useError();
  const [enumerations, setEnumerations] = useState<Enumeration[]>([]);

  useEffect(() => {
    if (realm) {
      fetchEnumerations(`realmId==${realm.id};category==${category}`, 0, 100)
        .then((response) => setEnumerations(response.content))
        .catch((err) => showError(err.message));
    }
  }, [realm, showError]);

  return (
    <Grid container spacing={1}>
      {enumerations.map((language) => (
        <Grid size={{ xs: 12, md: 3 }} key={language.id}>
          <RmuTextCard key={language.id} value={language.key} subtitle={t(category)} image={imageUrl} />
        </Grid>
      ))}
      {enumerations.length === 0 && (
        <Typography variant="body1" color="textSecondary">
          Not enumeration defined.
        </Typography>
      )}
    </Grid>
  );
};

export default RealmViewEnumerations;
