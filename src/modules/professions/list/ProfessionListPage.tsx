import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Chip } from '@mui/material';
import {
  FilterBar,
  fetchProfessions,
  ListPage,
  Profession,
  ProfessionArchetype,
  EntityCard,
  gridSizeShowcase,
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
      collection={{ modes: ['cards'], storageKey: 'core.professions', cardSize: gridSizeShowcase }}
      renderItem={(profession) => (
        <EntityCard
          title={t(profession.id)}
          subtitle={t(profession.archetype)}
          image={profession.imageUrl}
          imageRatio="square"
          chips={profession.availableRealmTypes.map((realmType) => (
            <Chip key={realmType} size="small" variant="outlined" label={t(realmType)} />
          ))}
          metrics={[{ label: t('professional-skills'), value: profession.professionalSkills.length }]}
          locked={profession.accessType === 'private'}
          lockedLabel={t('private')}
          onClick={() => navigate(`/core/professions/view/${profession.id}`, { state: { profession } })}
        />
      )}
    />
  );
}
