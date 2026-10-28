import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Chip } from '@mui/material';
import {
  EntityCard,
  EnumPicker,
  FilterBar,
  fetchProfessions,
  gridSizeShowcase,
  ListPage,
  Profession,
  useListFilters,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { PROFESSION_ARCHETYPES } from '../../shared/enums';
import { bindSingle, equalsFilter, FilterTextField, regexFilter } from '../../shared/filters/list-filters';

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
      filters={
        <FilterBar>
          <FilterTextField filters={filters} filter="q" label={t('name')} />
          <EnumPicker {...archetype} variant="select" label={t('archetype')} values={PROFESSION_ARCHETYPES} />
        </FilterBar>
      }
      filterState={filters}
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
