/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  FilterBar,
  fetchSkillCategories,
  fetchSkills,
  imageBaseUrl,
  ListPage,
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const query = usePagedQuery<Skill>({
    fetcher: (q, page, size) => fetchSkills(q, page, size, auth),
    rsql: rsqlAnd([
      ['id=re=', name],
      ['categoryId==', categoryId],
    ]),
    onError: notify.error,
  });

  useEffect(() => {
    fetchSkillCategories('', 0, 100, auth)
      .then((response) => setCategories(response.content))
      .catch(notify.error);
  }, []);

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
      renderItem={(skill) => (
        <RmuTextCard
          value={`${t(skill.id)}${skill.specialization ? ' *' : ''}`}
          subtitle={t(skill.categoryId)}
          image={`${imageBaseUrl}images/generic/configuration.png`}
          onClick={() => navigate(`/core/skills/view/${skill.id}`, { state: { skill } })}
        />
      )}
    />
  );
}
