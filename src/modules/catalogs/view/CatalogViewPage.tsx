/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import {
  CategorySeparator,
  DeleteButton,
  deleteEnumeration,
  Enumeration,
  fetchEnumerations,
  fetchRealms,
  FilterBar,
  imageBaseUrl,
  ListPage,
  Realm,
  RmuCard,
  rsqlAnd,
  SearchField,
  SelectRealm,
  TechnicalInfo,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import AddEnumerationDialog from './AddEnumerationDialog';

// Up to 1000 values of the category in a single page, as the page always did (no pagination).
const ALL = 1000;

/** Values (enumerations) of one catalog category, filtered by key and realm. */
export default function CatalogViewPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const { category } = useParams<{ category?: string }>();
  const [realms, setRealms] = useState<Realm[]>([]);
  const [name, setName] = useState('');
  const [realmId, setRealmId] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const query = usePagedQuery<Enumeration>({
    fetcher: (q) =>
      fetchEnumerations(q, 0, ALL, auth).then((response) => ({
        ...response,
        pagination: { ...response.pagination, totalPages: 0 },
      })),
    rsql: rsqlAnd([
      ['category==', category],
      ['key=re=', name.length > 2 ? name : undefined],
      ['realmId==', realmId],
    ]),
    enabled: !!category,
    onError: notify.error,
  });

  useEffect(() => {
    fetchRealms('', 0, 100, auth)
      .then((response) => setRealms(response.content))
      .catch(notify.error);
  }, []);

  const getRealmName = (enumeration: Enumeration) =>
    enumeration.realmId ? realms.find((realm) => realm.id === enumeration.realmId)?.name : undefined;

  const onDelete = (enumeration: Enumeration) =>
    deleteEnumeration(enumeration.id, auth).then(query.refresh).catch(notify.error);

  return (
    <ListPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('catalogs'), link: '/core/catalogs' },
        { name: t('view') },
      ]}
      query={query}
      onAdd={() => setAddDialogOpen(true)}
      filters={
        <>
          <CategorySeparator text={t(category || '')} />
          <FilterBar>
            <SearchField value={name} onChange={setName} />
            <SelectRealm value={realmId} onChange={(id) => setRealmId(id ?? '')} realms={realms} />
          </FilterBar>
        </>
      }
      renderItem={(enumeration) => (
        <RmuCard image={`${imageBaseUrl}images/generic/configuration.png`}>
          <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            <Stack direction="column">
              <Typography>{t(enumeration.key)}</Typography>
              <Typography color="secondary">
                <em>{getRealmName(enumeration)}</em>
              </Typography>
            </Stack>
            <DeleteButton onClick={() => onDelete(enumeration)} />
          </Stack>
        </RmuCard>
      )}
    >
      {category && (
        <AddEnumerationDialog
          category={category}
          realms={realms}
          open={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          onAdd={query.refresh}
        />
      )}
      {query.items && (
        <TechnicalInfo>
          <pre>{JSON.stringify(query.items, null, 2)}</pre>
        </TechnicalInfo>
      )}
    </ListPage>
  );
}
