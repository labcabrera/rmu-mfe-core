/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Typography } from '@mui/material';
import {
  CardGrid,
  EntityCard,
  Enumeration,
  fetchEnumerations,
  Realm,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';

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

  if (enumerations.length === 0) {
    return (
      <Typography variant="body1" color="textSecondary">
        {t('no-results')}
      </Typography>
    );
  }
  return (
    <CardGrid
      items={enumerations}
      getKey={(language) => language.id}
      renderItem={(language) => (
        <EntityCard
          title={t(language.key, { defaultValue: language.name ?? language.key })}
          subtitle={t(category)}
          image={imageUrl}
        />
      )}
    />
  );
};

export default RealmViewEnumerations;
