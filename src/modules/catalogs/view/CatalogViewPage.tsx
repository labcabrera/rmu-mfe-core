import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useParams } from 'react-router-dom';
import {
  bindSingle,
  canEditEntity,
  DeleteButton,
  deleteEnumeration,
  EntityCard,
  EntitySourceChip,
  Enumeration,
  equalsFilter,
  fetchEnumerations,
  FilterSearchField,
  FilterSection,
  ListPage,
  realmName,
  RealmPicker,
  rsqlAnd,
  TechnicalInfo,
  useListFilters,
  useNotify,
  usePagedQuery,
  useRealms,
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
  const realms = useRealms();
  const filters = useListFilters<Enumeration>({
    // The name is only searched from its third character, as the page always did.
    q: { kind: 'text', label: t('name'), toRsql: (value) => (value.length > 2 ? `name=re=${value}` : undefined) },
    realm: equalsFilter(t('realm'), 'realmId', { format: (id) => realmName(realms, id) }),
  });
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const query = usePagedQuery<Enumeration>({
    fetcher: (q) =>
      fetchEnumerations(q, 0, ALL, auth).then((response) => ({
        ...response,
        pagination: { ...response.pagination, totalPages: 0 },
      })),
    rsql: [rsqlAnd([['category==', category]]), filters.rsql].filter(Boolean).join(';'),
    enabled: !!category,
    onError: notify.error,
  });

  const realmFilter = bindSingle(filters, 'realm');

  const getRealmName = (enumeration: Enumeration) =>
    enumeration.realmId ? realms?.find((realm) => realm.id === enumeration.realmId)?.name : undefined;

  const onDelete = (enumeration: Enumeration) =>
    deleteEnumeration(enumeration.id, auth).then(query.refresh).catch(notify.error);

  return (
    <ListPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('catalogs'), link: '/core/catalogs' },
        { name: category ? t(category) : t('view') },
      ]}
      query={query}
      onAdd={() => setAddDialogOpen(true)}
      filtersLayout="side"
      filterState={filters}
      filtersStorageKey="core.catalog-values"
      filters={
        <>
          <FilterSection title={t('search')} collapsible={false}>
            <FilterSearchField filters={filters} filter="q" label={t('name')} />
          </FilterSection>
          <FilterSection title={t('realm')}>
            <RealmPicker {...realmFilter} variant="select" realms={realms} />
          </FilterSection>
        </>
      }
      renderItem={(enumeration) => (
        <EntityCard
          noImage
          title={t(enumeration.key, { defaultValue: enumeration.name ?? enumeration.key })}
          subtitle={getRealmName(enumeration)}
          chips={<EntitySourceChip entity={enumeration} />}
          actions={
            // Spec 063: rulebook values only for admins, user values for their owner.
            canEditEntity(enumeration, auth) && <DeleteButton onClick={() => onDelete(enumeration)} />
          }
        />
      )}
    >
      {category && (
        <AddEnumerationDialog
          category={category}
          realms={realms ?? []}
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
