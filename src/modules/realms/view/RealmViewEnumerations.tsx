/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import {
  CardGrid,
  EmptyState,
  EntityCard,
  Enumeration,
  fetchEnumerations,
  Realm,
  useNotify,
  fetchFullPage,
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
      fetchFullPage((rsql, page, size) => fetchEnumerations(rsql, page, size, auth), `realmId==${realm.id};category==${category}`)
        .then((response) => setEnumerations(response.content))
        .catch((err) => notify.error(err));
    }
  }, [realm, notify]);

  if (enumerations.length === 0) {
    return <EmptyState dense title={t('no-results')} />;
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
