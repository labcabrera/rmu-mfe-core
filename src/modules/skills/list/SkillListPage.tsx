/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Chip, Link, Stack, Typography } from '@mui/material';
import {
  CollectionConfig,
  CollectionMode,
  CollectionModeSwitch,
  EntityCard,
  fetchSkillCategories,
  fetchSkills,
  FilterSection,
  ListPage,
  Skill,
  SkillCategory,
  SkillCategoryPicker,
  useCollectionMode,
  useListFilters,
  useNotify,
  usePagedQuery,
  useViewTransitionNavigate,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import StatChips from '../../shared/display/StatChips';
import { bindSingle, equalsFilter, FilterTextField, regexFilter } from '../../shared/filters/list-filters';
import { skillDescriptionKey } from '../skill-utils';
import SkillManeuverIndicator from './SkillManeuverIndicator';

const modes: CollectionMode[] = ['grouped', 'table', 'cards'];

/**
 * The grouped view only groups the current page: it asks for a page large enough for the whole catalog (known
 * limit, spec 012 §2). The other views keep the usual page size.
 */
const pageSizeOf = (mode: CollectionMode) => (mode === 'grouped' ? 200 : 96);

/**
 * Skills catalog (spec 046): filters in the side panel and kept in the URL. The view is chosen here, not in ListPage,
 * because the columns and the page size depend on it: the grouped view hides the category column and needs a larger
 * page. ListPage only gets the current view (it is remounted when the view changes).
 */
export default function SkillListPage() {
  const auth = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const transitionNavigate = useViewTransitionNavigate();
  const notify = useNotify();
  const [categories, setCategories] = useState<SkillCategory[]>();
  const [mode, setMode] = useCollectionMode('core.skills', modes);
  const filters = useListFilters<Skill>({
    q: regexFilter(t('name'), 'id'),
    category: equalsFilter(t('category'), 'categoryId', { format: (value) => t(value) }),
  });
  const query = usePagedQuery<Skill>({
    fetcher: (q, page, size) => fetchSkills(q, page, size, auth),
    rsql: filters.rsql,
    pageSize: pageSizeOf(mode),
    onError: notify.error,
  });
  const categoryFilter = bindSingle(filters, 'category');

  useEffect(() => {
    fetchSkillCategories('', 0, 100, auth)
      .then((response) => setCategories(response.content))
      .catch(notify.error);
  }, []);

  const onModeChange = (next: CollectionMode) => {
    setMode(next);
    if (pageSizeOf(next) !== query.pageSize) query.setPageSize(pageSizeOf(next));
  };

  const categoriesById = useMemo(() => new Map((categories ?? []).map((c) => [c.id, c])), [categories]);
  const compare = (a: string, b: string) => a.localeCompare(b, i18n.language);

  // Groups follow the order of the items: sort by translated category, then by translated name.
  const items = useMemo(() => {
    if (!query.items || mode !== 'grouped') return query.items;
    return [...query.items].sort((a, b) => compare(t(a.categoryId), t(b.categoryId)) || compare(t(a.id), t(b.id)));
  }, [query.items, mode, i18n.language]);

  const openSkill = (skill: Skill) => transitionNavigate(`/core/skills/view/${skill.id}`, { state: { skill } });

  const groupLabel = (group: string): ReactNode => {
    const category = categoriesById.get(group);
    return (
      <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        <Link
          component={RouterLink}
          to={`/core/skill-categories/view/${group}`}
          state={category ? { skillCategory: category } : undefined}
          underline="hover"
          sx={{ fontWeight: 700 }}
        >
          {t(group)}
        </Link>
        {category && <StatChips stats={category.bonus} realmBonus={category.realmBonus} inline />}
      </Box>
    );
  };

  // Fixed widths for every column but the name: each category of the grouped view is its own table, and without
  // them every group laid its columns out differently (spec 017).
  const columns: CollectionConfig<Skill>['columns'] = [
    {
      key: 'name',
      header: t('skill'),
      render: (skill) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {t(skill.id)}
          </Typography>
          {skill.specialization && (
            <Typography variant="caption" color="text.secondary">
              {t(skill.specialization)}
            </Typography>
          )}
        </Box>
      ),
    },
    {
      key: 'stats',
      header: t('stats'),
      width: 200,
      render: (skill) => (
        <Stack
          direction="row"
          useFlexGap
          sx={{ flexWrap: 'wrap', gap: 0.5, justifyContent: { xs: 'flex-end', sm: 'flex-start' } }}
        >
          <StatChips stats={skill.bonus} realmBonus={skill.realmBonus} />
        </Stack>
      ),
    },
    {
      key: 'maneuver',
      header: t('maneuver'),
      align: 'center',
      width: 140,
      render: (skill) => <SkillManeuverIndicator profile={skill.maneuver} />,
    },
    ...(mode === 'table'
      ? [{ key: 'category', header: t('category'), width: 220, render: (skill: Skill) => t(skill.categoryId) }]
      : []),
  ];

  const renderItem = (skill: Skill) => (
    <EntityCard
      title={t(skill.id)}
      subtitle={[t(skill.categoryId), skill.specialization ? t(skill.specialization) : undefined]
        .filter(Boolean)
        .join(' · ')}
      noImage
      chips={
        <>
          <StatChips stats={skill.bonus} realmBonus={skill.realmBonus} />
          {skill.maneuver && <SkillManeuverIndicator profile={skill.maneuver} />}
        </>
      }
      description={i18n.exists(skillDescriptionKey(skill)) ? t(skillDescriptionKey(skill)) : undefined}
      locked={skill.accessType === 'private'}
      lockedLabel={t('private')}
      onClick={() => openSkill(skill)}
    />
  );

  return (
    <ListPage
      key={mode}
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('skills') }]}
      query={{ ...query, items }}
      getKey={(skill) => skill.id}
      onAdd={() => navigate('/core/skills/create')}
      actions={[<CollectionModeSwitch key="mode" modes={modes} value={mode} onChange={onModeChange} />]}
      filtersLayout="side"
      filterState={filters}
      filtersStorageKey="core.skills"
      filters={
        <>
          <FilterSection title={t('search')} collapsible={false}>
            <FilterTextField filters={filters} filter="q" label={t('name')} />
          </FilterSection>
          <FilterSection title={t('category')}>
            <SkillCategoryPicker {...categoryFilter} variant="select" label={t('category')} categories={categories} />
          </FilterSection>
        </>
      }
      resultsActions={
        mode === 'grouped' &&
        query.totalPages > 1 && (
          <Chip size="small" color="warning" variant="outlined" label={t('skills-grouped-page-only')} />
        )
      }
      collection={{
        modes: [mode],
        storageKey: `core.skills.${mode}`,
        columns,
        groupBy: (skill) => skill.categoryId,
        groupLabel,
        onSelect: openSkill,
      }}
      renderItem={renderItem}
    />
  );
}
