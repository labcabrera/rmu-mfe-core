/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  defaultImages,
  EntityCard,
  fetchEnumerationCategories,
  FilterBar,
  FilterSearchField,
  ListPage,
  normalizeText,
  useListFilters,
  useLocalPagedQuery,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';

/** The categories endpoint is not paginated: the list is filtered by translated name on the client. */
export default function CatalogListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const [categories, setCategories] = useState<string[]>();
  const [error, setError] = useState<unknown>();
  const filters = useListFilters<string>({
    q: {
      kind: 'text',
      label: t('name'),
      match: (category, value) => normalizeText(t(category)).includes(normalizeText(String(value))),
    },
  });

  const load = () => {
    setError(undefined);
    fetchEnumerationCategories(auth)
      .then(setCategories)
      .catch((err) => {
        setError(err);
        notify.error(err);
      });
  };

  useEffect(load, []);

  const query = useLocalPagedQuery(categories?.filter(filters.match), {
    pageSize: 96,
    resetKey: filters.key,
    error,
    refresh: load,
  });

  return (
    <ListPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('catalogs') }]}
      query={query}
      getKey={(category) => category}
      filters={
        <FilterBar>
          <FilterSearchField filters={filters} filter="q" label={t('name')} />
        </FilterBar>
      }
      filterState={filters}
      collection={{ modes: ['cards'], storageKey: 'core.catalogs' }}
      renderItem={(category) => (
        <EntityCard
          title={t(category)}
          subtitle={t('category')}
          image={defaultImages.generic}
          onClick={() => navigate(`/core/catalogs/view/${category}`)}
        />
      )}
    />
  );
}
