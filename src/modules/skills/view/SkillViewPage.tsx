/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  deleteSkill,
  DetailPage,
  Enumeration,
  fetchEnumerations,
  fetchSkill,
  Skill,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SkillViewInfo from './SkillViewInfo';
import SkillViewSpecializations from './SkillViewSpecializations';

export default function SkillViewPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { skillId } = useParams<{ skillId?: string }>();
  const state = useEntity<Skill>(skillId, (id) => fetchSkill(id, auth), {
    initial: location.state?.skill,
    onError: notify.error,
  });
  const skill = state.entity;
  const [enumerations, setEnumerations] = useState<Enumeration[]>();

  useEffect(() => {
    if (!skill?.specialization) return;
    fetchEnumerations(`category==${skill.specialization}`, 0, 100, auth)
      .then((response) => setEnumerations(response.content))
      .catch(notify.error);
  }, [skill]);

  const onDelete = (skill: Skill) =>
    deleteSkill(skill.id, auth)
      .then(() => navigate(`/core/skill-categories/view/${skill.categoryId}`))
      .catch(notify.error);

  return (
    <DetailPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('skill-categories'), link: '/core/skill-categories' },
        { name: t('skill'), link: '/core/skills' },
      ]}
      entity={state}
      summaryTitle={(entity) => t(entity.id)}
      onEdit={(skill) => navigate(`/core/skills/edit/${skill.id}`, { state: { skill } })}
      onDelete={onDelete}
    >
      {(skill) => (
        <>
          <SkillViewInfo skill={skill} />
          {skill.specialization && enumerations && <SkillViewSpecializations enumerations={enumerations} />}
        </>
      )}
    </DetailPage>
  );
}
