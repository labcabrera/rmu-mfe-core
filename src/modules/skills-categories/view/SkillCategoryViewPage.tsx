/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useParams } from 'react-router-dom';
import {
  DetailPage,
  fetchSkillCategory,
  fetchSkills,
  Skill,
  SkillCategory,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SkillCategoryViewInfo from './SkillCategoryViewInfo';
import SkillCategoryViewSkills from './SkillCategoryViewSkills';

export default function SkillCategoryViewPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const notify = useNotify();
  const { skillCategoryId } = useParams<{ skillCategoryId?: string }>();
  const state = useEntity<SkillCategory>(skillCategoryId, (id) => fetchSkillCategory(id, auth), {
    initial: location.state?.skillCategory,
    onError: notify.error,
  });
  const skillCategory = state.entity;
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    if (!skillCategory) return;
    fetchSkills(`categoryId==${skillCategory.id}`, 0, 100, auth)
      .then((response) => setSkills(response.content))
      .catch(notify.error);
  }, [skillCategory]);

  return (
    <DetailPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('skill-categories'), link: '/core/skill-categories' },
        { name: t('view') },
      ]}
      entity={state}
      summaryTitle={(entity) => t(entity.id)}
      technicalInfo={false}
    >
      {(skillCategory) => (
        <>
          <SkillCategoryViewInfo skillCategory={skillCategory} />
          <SkillCategoryViewSkills skills={skills} />
        </>
      )}
    </DetailPage>
  );
}
