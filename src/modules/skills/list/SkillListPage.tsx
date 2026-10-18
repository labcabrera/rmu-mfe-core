/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Chip, Stack, Typography } from '@mui/material';
import {
  FilterBar,
  fetchSkillCategories,
  fetchSkills,
  imageBaseUrl,
  ListPage,
  PreviewDrawer,
  RmuTextCard,
  rsqlAnd,
  SearchField,
  Skill,
  SkillCategory,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectSkillCategory from '../../shared/selects/SelectSkillCategory';

export default function SkillListPage() {
  const auth = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [preview, setPreview] = useState<Skill | null>(null);
  // Large pages: the grouped view groups the skills of the current page by category.
  const query = usePagedQuery<Skill>({
    fetcher: (q, page, size) => fetchSkills(q, page, size, auth),
    rsql: rsqlAnd([
      ['id=re=', name],
      ['categoryId==', categoryId],
    ]),
    pageSize: 96,
    onError: notify.error,
  });

  useEffect(() => {
    fetchSkillCategories('', 0, 100, auth)
      .then((response) => setCategories(response.content))
      .catch(notify.error);
  }, []);

  const stats = (skill: Skill) => (skill.bonus?.length ? skill.bonus.map((bonus) => t(bonus)).join(' + ') : '-');
  const openSkill = (skill: Skill) => navigate(`/core/skills/view/${skill.id}`, { state: { skill } });
  const descriptionKey = (skill: Skill) => `skill-${skill.id.split('@')[0]}-description`;

  return (
    <ListPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('skills') }]}
      query={query}
      onAdd={() => navigate('/core/skills/create')}
      filters={
        <FilterBar>
          <SearchField value={name} onChange={setName} />
          <SelectSkillCategory
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            label={t('category')}
            categories={categories}
            allowEmpty
          />
        </FilterBar>
      }
      collection={{
        modes: ['grouped', 'table', 'cards'],
        storageKey: 'core.skills',
        groupBy: (skill) => skill.categoryId,
        groupLabel: (group) => t(group),
        columns: [
          { key: 'name', header: t('skill'), render: (skill) => t(skill.id) },
          { key: 'category', header: t('category'), render: (skill) => t(skill.categoryId) },
          { key: 'stats', header: t('stats'), render: stats },
          {
            key: 'specialization',
            header: t('specialization'),
            render: (skill) => (skill.specialization ? t(skill.specialization) : '-'),
          },
        ],
        onSelect: setPreview,
      }}
      renderItem={(skill) => (
        <RmuTextCard
          value={`${t(skill.id)}${skill.specialization ? ' *' : ''}`}
          subtitle={t(skill.categoryId)}
          image={`${imageBaseUrl}images/generic/skills.png`}
          onClick={() => setPreview(skill)}
        />
      )}
    >
      <PreviewDrawer
        open={Boolean(preview)}
        title={preview ? t(preview.id) : undefined}
        subtitle={preview ? t(preview.categoryId) : undefined}
        onClose={() => setPreview(null)}
        onOpen={preview ? () => openSkill(preview) : undefined}
      >
        {preview && (
          <Stack spacing={1.5}>
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.5 }}>
              <Chip size="small" label={`${t('stats')}: ${stats(preview)}`} />
              {preview.specialization && (
                <Chip size="small" variant="outlined" label={`${t('specialization')}: ${t(preview.specialization)}`} />
              )}
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
              {i18n.exists(descriptionKey(preview))
                ? t(descriptionKey(preview))
                : t('this-skill-has-no-associated-description')}
            </Typography>
          </Stack>
        )}
      </PreviewDrawer>
    </ListPage>
  );
}
