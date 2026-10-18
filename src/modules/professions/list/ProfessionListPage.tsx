import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  FilterBar,
  fetchProfessions,
  ListPage,
  Profession,
  ProfessionArchetype,
  RmuTextCard,
  rsqlAnd,
  SearchField,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectProfessionArchetype from '../../shared/selects/SelectProfessionArchetype';

export default function ProfessionListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const [name, setName] = useState('');
  const [archetype, setArchetype] = useState<ProfessionArchetype | null>(null);
  const query = usePagedQuery<Profession>({
    fetcher: (q, page, size) => fetchProfessions(q, page, size, auth),
    rsql: rsqlAnd([
      ['id=re=', name],
      ['archetype==', archetype],
    ]),
    onError: notify.error,
  });

  return (
    <ListPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('professions') }]}
      query={query}
      onAdd={() => navigate('/core/professions/create')}
      filters={
        <FilterBar>
          <SearchField value={name} onChange={setName} />
          <SelectProfessionArchetype
            label={t('archetype')}
            name="archetype"
            value={archetype}
            required={false}
            allowAll
            onChange={(value) => setArchetype(value || null)}
          />
        </FilterBar>
      }
      renderItem={(profession) => (
        <RmuTextCard
          value={t(profession.id)}
          subtitle={t('profession')}
          image={profession.imageUrl || ''}
          grayscale={0.2}
          lock={profession.accessType === 'private'}
          onClick={() => navigate(`/core/professions/view/${profession.id}`, { state: { profession } })}
        />
      )}
    />
  );
}
