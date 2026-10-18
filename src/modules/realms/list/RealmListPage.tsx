import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  FilterBar,
  fetchRealms,
  ListPage,
  Realm,
  RmuTextCard,
  rsqlAnd,
  SearchField,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { DEFAULT_REALM_IMAGE } from '../../services/image-service';

export default function RealmListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const [name, setName] = useState('');
  const query = usePagedQuery<Realm>({
    fetcher: (q, page, size) => fetchRealms(q, page, size, auth),
    rsql: rsqlAnd([['name=re=', name]]),
    onError: notify.error,
  });

  return (
    <ListPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('realms') }]}
      query={query}
      onAdd={() => navigate('/core/realms/create')}
      filters={
        <FilterBar>
          <SearchField value={name} onChange={setName} />
        </FilterBar>
      }
      renderItem={(realm) => (
        <RmuTextCard
          value={realm.name}
          subtitle={realm.shortDescription || t('no-description')}
          image={realm.imageUrl || DEFAULT_REALM_IMAGE}
          lock={realm.accessType === 'private'}
          onClick={() => navigate(`/core/realms/view/${realm.id}`, { state: { realm } })}
        />
      )}
    />
  );
}
