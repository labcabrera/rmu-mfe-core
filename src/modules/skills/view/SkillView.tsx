/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  DeleteButton,
  DeleteDialog,
  deleteSkill,
  EditButton,
  Enumeration,
  fetchEnumerations,
  fetchSkill,
  LayoutBase,
  RefreshButton,
  Skill,
  TechnicalInfo,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import SkillViewInfo from './SkillViewInfo';
import SkillViewSpecializations from './SkillViewSpecializations';

export default function SkillView() {
  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { showError } = useError();
  const { skillId } = useParams<{ skillId?: string }>();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [enumerations, setEnumerations] = useState<Enumeration[]>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const bindSkill = (skillId: string) => {
    fetchSkill(skillId, auth)
      .then((response) => setSkill(response))
      .catch((err) => showError(err.message));
  };

  const bindEnumerations = () => {
    if (!skill?.specialization) return;
    fetchEnumerations(`category==${skill?.specialization}`, 0, 100, auth)
      .then((response) => setEnumerations(response.content))
      .catch((err) => showError(err.message));
  };

  const onDelete = () => {
    deleteSkill(skill!.id, auth)
      .then(() => navigate(`/core/skill-categories/view/${skill!.categoryId}`))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    if (skill) {
      bindEnumerations();
    }
  }, [skill]);

  useEffect(() => {
    if (location.state && location.state.skill) {
      setSkill(location.state.skill);
    } else if (skillId) {
      bindSkill(skillId);
    }
  }, [location.state, skillId]);

  if (!skill) return <p>Loading...</p>;

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('skill-categories'), link: '/core/skill-categories' },
        { name: t('skill'), link: '/core/skills' },
      ]}
      actions={[
        <RefreshButton onClick={() => bindEnumerations()} />,
        <EditButton onClick={() => navigate(`/core/skills/edit/${skill.id}`)} />,
        <DeleteButton onClick={() => setDeleteDialogOpen(true)} />,
      ]}
    >
      <SkillViewInfo skill={skill} />
      {enumerations && <SkillViewSpecializations enumerations={enumerations} />}
      <DeleteDialog
        open={deleteDialogOpen}
        message={`Are you sure you want to delete skill ${skill.id}? This action cannot be undone.`}
        onDelete={() => onDelete()}
        onClose={() => setDeleteDialogOpen(false)}
      />
      <TechnicalInfo>
        <pre>Skill: {JSON.stringify(skill, null, 2)}</pre>
      </TechnicalInfo>
    </LayoutBase>
  );
}
