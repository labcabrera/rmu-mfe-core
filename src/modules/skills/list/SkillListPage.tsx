/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Chip, Fab, Link, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import {
  CollectionConfig,
  CollectionMode,
  CollectionModeSwitch,
  CollectionView,
  EmptyState,
  EntityCard,
  ErrorState,
  FilterBar,
  fetchSkillCategories,
  fetchSkills,
  LayoutBase,
  LoadingState,
  RefreshButton,
  RmuPagination,
  rsqlAnd,
  SearchField,
  Skill,
  SkillCategory,
  useCollectionMode,
  useNotify,
  usePagedQuery,
  useViewTransitionNavigate,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import StatChips from '../../shared/display/StatChips';
import SelectSkillCategory from '../../shared/selects/SelectSkillCategory';
import { skillDescriptionKey } from '../skill-utils';
import SkillManeuverIndicator from './SkillManeuverIndicator';

const modes: CollectionMode[] = ['grouped', 'table', 'cards'];

/**
 * The grouped view only groups the current page: it asks for a page large enough for the whole catalog (known
 * limit, spec 012 §2). The other views keep the usual page size.
 */
const pageSizeOf = (mode: CollectionMode) => (mode === 'grouped' ? 200 : 96);

/**
 * Skills catalog. It composes the list template itself (instead of `ListPage`) because the columns and the page size
 * depend on the chosen view: the grouped view hides the category column and needs a larger page.
 */
export default function SkillListPage() {
  const auth = useAuth();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const transitionNavigate = useViewTransitionNavigate();
  const notify = useNotify();
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [mode, setMode] = useCollectionMode('core.skills', modes);
  const query = usePagedQuery<Skill>({
    fetcher: (q, page, size) => fetchSkills(q, page, size, auth),
    rsql: rsqlAnd([
      ['id=re=', name],
      ['categoryId==', categoryId],
    ]),
    pageSize: pageSizeOf(mode),
    onError: notify.error,
  });

  useEffect(() => {
    fetchSkillCategories('', 0, 100, auth)
      .then((response) => setCategories(response.content))
      .catch(notify.error);
  }, []);

  const onModeChange = (next: CollectionMode) => {
    setMode(next);
    if (pageSizeOf(next) !== query.pageSize) query.setPageSize(pageSizeOf(next));
  };

  const categoriesById = useMemo(() => new Map(categories.map((c) => [c.id, c])), [categories]);
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
      render: (skill) => <SkillManeuverIndicator profile={skill.maneuver} />,
    },
    ...(mode === 'table'
      ? [{ key: 'category', header: t('category'), render: (skill: Skill) => t(skill.categoryId) }]
      : []),
  ];

  const renderItem = (skill: Skill) => (
    <EntityCard
      title={t(skill.id)}
      subtitle={[t(skill.categoryId), skill.specialization ? t(skill.specialization) : undefined]
        .filter(Boolean)
        .join(' · ')}
      imageRatio="none"
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

  const headerActions = [
    <CollectionModeSwitch key="mode" modes={modes} value={mode} onChange={onModeChange} />,
    <RefreshButton key="refresh" onClick={query.refresh} />,
    ...(!isPhone
      ? [
          <Button
            key="add"
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => navigate('/core/skills/create')}
            sx={{ ml: 1 }}
          >
            {t('add')}
          </Button>,
        ]
      : []),
  ];

  let content: ReactNode;
  if (query.error && !items) content = <ErrorState error={query.error} onRetry={query.refresh} />;
  else if (!items) content = <LoadingState variant="cards" />;
  else if (items.length === 0) content = <EmptyState />;
  else
    content = (
      <CollectionView
        items={items}
        getKey={(skill) => skill.id}
        renderItem={renderItem}
        mode={mode}
        config={{
          modes,
          storageKey: 'core.skills',
          columns,
          groupBy: (skill) => skill.categoryId,
          groupLabel,
          onSelect: openSkill,
        }}
      />
    );

  return (
    <LayoutBase
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('skills') }]}
      actions={headerActions}
    >
      <FilterBar>
        <SearchField value={name} onChange={setName} />
        <SelectSkillCategory
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          label={t('category')}
          categories={categories}
          allowEmpty
        />
        {mode === 'grouped' && query.totalPages > 1 && (
          <Chip size="small" color="warning" variant="outlined" label={t('skills-grouped-page-only')} />
        )}
      </FilterBar>
      {content}
      {items && query.totalPages > 0 && (
        <RmuPagination
          page={query.page}
          pageSize={query.pageSize}
          totalPages={query.totalPages}
          setPage={query.setPage}
          setPageSize={query.setPageSize}
        />
      )}
      {isPhone && (
        <Fab
          color="primary"
          aria-label={t('add')}
          onClick={() => navigate('/core/skills/create')}
          sx={{
            position: 'fixed',
            right: 16,
            bottom: 'calc(16px + var(--rmu-bottom-nav-height, 0px))',
            zIndex: (th) => th.zIndex.speedDial,
          }}
        >
          <AddIcon />
        </Fab>
      )}
    </LayoutBase>
  );
}
