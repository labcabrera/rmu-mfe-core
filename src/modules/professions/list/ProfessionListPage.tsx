import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Chip } from '@mui/material';
import {
  bindSingle,
  EntityCard,
  EntitySourceChip,
  EnumPicker,
  equalsFilter,
  fetchProfessions,
  FilterSearchField,
  FilterSection,
  ListPage,
  Profession,
  regexFilter,
  useListFilters,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { PROFESSION_ARCHETYPES } from '../../shared/enums';

export default function ProfessionListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const filters = useListFilters<Profession>({
    q: regexFilter(t('name'), 'id'),
    archetype: equalsFilter(t('archetype'), 'archetype', {
      options: PROFESSION_ARCHETYPES,
      format: (value) => t(value),
    }),
  });
  const archetype = bindSingle(filters, 'archetype');
  const query = usePagedQuery<Profession>({
    fetcher: (q, page, size) => fetchProfessions(q, page, size, auth),
    rsql: filters.rsql,
    onError: notify.error,
  });

  return (
    <ListPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('professions') }]}
      query={query}
      onAdd={() => navigate('/core/professions/create')}
      filtersLayout="side"
      filterState={filters}
      filtersStorageKey="core.professions"
      filters={
        <>
          <FilterSection title={t('search')} collapsible={false}>
            <FilterSearchField filters={filters} filter="q" label={t('name')} />
          </FilterSection>
          <FilterSection title={t('archetype')}>
            <EnumPicker {...archetype} variant="select" label={t('archetype')} values={PROFESSION_ARCHETYPES} />
          </FilterSection>
        </>
      }
      collection={{ modes: ['cards'], storageKey: 'core.professions' }}
      renderItem={(profession) => (
        <EntityCard
          title={t(profession.id)}
          subtitle={t(profession.archetype)}
          image={profession.imageUrl}
          chips={[
            ...profession.fixedRealmTypes.map((realmType) => (
              <Chip key={realmType} size="small" variant="outlined" label={t(realmType)} />
            )),
            <EntitySourceChip key="source" entity={profession} />,
          ]}
          locked={profession.accessType === 'private'}
          lockedLabel={t('private')}
          onClick={() => navigate(`/core/professions/view/${profession.id}`, { state: { profession } })}
        />
      )}
    />
  );
}
