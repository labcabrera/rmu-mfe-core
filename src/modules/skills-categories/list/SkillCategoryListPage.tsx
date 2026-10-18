import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  FilterBar,
  fetchSkillCategories,
  imageBaseUrl,
  ListPage,
  RmuTextCard,
  rsqlAnd,
  SearchField,
  SkillCategory,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';

export default function SkillCategoryListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const [name, setName] = useState('');
  const query = usePagedQuery<SkillCategory>({
    fetcher: (q, page, size) => fetchSkillCategories(q, page, size, auth),
    rsql: rsqlAnd([['id=re=', name]]),
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
          <SearchField value={name} onChange={setName} />
        </FilterBar>
      }
      renderItem={(category) => (
        <RmuTextCard
          value={t(category.id)}
          subtitle={t('skill-category')}
          image={`${imageBaseUrl}images/generic/configuration.png`}
          onClick={() => navigate(`/core/skill-categories/view/${category.id}`, { state: { skillCategory: category } })}
        />
      )}
    />
  );
}
