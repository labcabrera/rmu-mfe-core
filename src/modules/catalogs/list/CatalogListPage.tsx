import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  fetchEnumerationCategories,
  imageBaseUrl,
  ListPage,
  Page,
  RmuTextCard,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';

// The categories endpoint is not paginated: wrap it as a single page (totalPages 0 hides the pagination).
const asSinglePage = (content: string[]): Page<string> => ({
  content,
  pagination: { page: 0, size: content.length, totalElements: content.length, totalPages: 0 },
});

export default function CatalogListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const query = usePagedQuery<string>({
    fetcher: () => fetchEnumerationCategories(auth).then(asSinglePage),
    onError: notify.error,
  });

  return (
    <ListPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('catalogs') }]}
      query={query}
      getKey={(category) => category}
      renderItem={(category) => (
        <RmuTextCard
          value={t(category)}
          subtitle={t('category')}
          image={`${imageBaseUrl}images/generic/configuration.png`}
          onClick={() => navigate(`/core/catalogs/view/${category}`)}
        />
      )}
    />
  );
}
