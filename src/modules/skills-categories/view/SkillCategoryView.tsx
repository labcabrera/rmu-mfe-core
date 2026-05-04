/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useParams } from 'react-router-dom';
import {
  fetchSkillCategory,
  fetchSkills,
  LayoutBase,
  RefreshButton,
  Skill,
  SkillCategory,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import SkillCategoryViewInfo from './SkillCategoryViewInfo';
import SkillCategoryViewSkills from './SkillCategoryViewSkills';

export default function SkillCategoryView() {
  const location = useLocation();
  const { t } = useTranslation();
  const auth = useAuth();
  const { skillCategoryId } = useParams<{ skillCategoryId?: string }>();
  const { showError } = useError();
  const [skillCategory, setSkillCategory] = useState<SkillCategory | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);

  const bindSkillCategory = () => {
    fetchSkillCategory(skillCategoryId!, auth)
      .then((response) => setSkillCategory(response))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    if (location.state && location.state.skillCategory) {
      setSkillCategory(location.state.skillCategory);
    } else if (skillCategoryId) {
      bindSkillCategory();
    }
  }, [location.state, skillCategoryId, showError]);

  useEffect(() => {
    if (skillCategory) {
      fetchSkills(`categoryId==${skillCategory.id}`, 0, 100, auth)
        .then((response) => setSkills(response.content))
        .catch((err: unknown) => {
          if (err instanceof Error) showError(err.message);
          else showError(String(err));
        });
    }
  }, [skillCategory]);

  if (!skillCategory) return <p>Loading...</p>;

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('skill-categories'), link: '/core/skill-categories' },
        { name: t('view') },
      ]}
      actions={[<RefreshButton onClick={() => bindSkillCategory()} />]}
    >
      <SkillCategoryViewInfo skillCategory={skillCategory} />
      <SkillCategoryViewSkills skills={skills} />
    </LayoutBase>
  );
}
