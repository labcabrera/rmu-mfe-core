import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  defaultImages,
  EntityCard,
  FilterBar,
  fetchSkillCategories,
  ListPage,
  SkillCategory,
  useListFilters,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import StatChips from '../../shared/display/StatChips';
import { FilterTextField, regexFilter } from '../../shared/filters/list-filters';

export default function SkillCategoryListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const filters = useListFilters<SkillCategory>({ q: regexFilter(t('name'), 'id') });
  const query = usePagedQuery<SkillCategory>({
    fetcher: (q, page, size) => fetchSkillCategories(q, page, size, auth),
    rsql: filters.rsql,
    pageSize: 48,
    onError: notify.error,
  });

  return (
    <ListPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('skill-categories') },
      ]}
      query={query}
      filters={
        <FilterBar>
          <FilterTextField filters={filters} filter="q" label={t('name')} />
        </FilterBar>
      }
      filterState={filters}
      collection={{ modes: ['cards'], storageKey: 'core.skill-categories' }}
      renderItem={(category) => (
        <EntityCard
          title={t(category.id)}
          subtitle={t('skill-category')}
          image={defaultImages['skill-category']}
          chips={<StatChips stats={category.bonus} realmBonus={category.realmBonus} />}
          onClick={() => navigate(`/core/skill-categories/view/${category.id}`, { state: { skillCategory: category } })}
        />
      )}
    />
  );
}
