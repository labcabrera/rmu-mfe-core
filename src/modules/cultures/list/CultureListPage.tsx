import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  Culture,
  fetchCultures,
  ListPage,
  RmuTextCard,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import NameRealmFilters from '../../shared/filters/NameRealmFilters';

export default function CultureListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const [rsql, setRsql] = useState('');
  const query = usePagedQuery<Culture>({
    fetcher: (q, page, size) => fetchCultures(q, page, size, auth),
    rsql,
    onError: notify.error,
  });

  return (
    <ListPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('cultures') }]}
      query={query}
      onAdd={() => navigate('/core/cultures/create')}
      filters={<NameRealmFilters onChange={setRsql} realmField="realm.id" />}
      renderItem={(culture) => (
        <RmuTextCard
          value={culture.name}
          subtitle={t('culture')}
          image={culture.imageUrl || ''}
          onClick={() => navigate(`/core/cultures/view/${culture.id}`, { state: { culture } })}
        />
      )}
    />
  );
}
