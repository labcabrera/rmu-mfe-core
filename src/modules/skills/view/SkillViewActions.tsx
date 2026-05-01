import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  RmuBreadcrumbs,
  RefreshButton,
  EditButton,
  DeleteButton,
  DeleteDialog,
  deleteSkill,
  Skill,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';

const SkillViewActions: FC<{
  skill: Skill;
  onRefresh: () => void;
}> = ({ skill, onRefresh }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('skill-categories'), link: '/core/skill-categories' },
    { name: t('skill'), link: '/core/skills' },
  ];

  const onDelete = () => {
    deleteSkill(skill.id, auth)
      .then(() => navigate(`/core/skill-categories/view/${skill.categoryId}`))
      .catch((err) => showError(err.message));
  };

  if (!skill) return <p>Loading...</p>;

  return (
    <>
      <RmuBreadcrumbs items={breadcrumbs}>
        <RefreshButton onClick={onRefresh} />
        <EditButton onClick={() => navigate(`/core/skills/edit/${skill.id}`)} />
        <DeleteButton onClick={() => setDeleteDialogOpen(true)} />
      </RmuBreadcrumbs>
      <DeleteDialog
        open={deleteDialogOpen}
        message={`Are you sure you want to delete skill ${skill.id}? This action cannot be undone.`}
        onDelete={() => onDelete()}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </>
  );
};

export default SkillViewActions;
