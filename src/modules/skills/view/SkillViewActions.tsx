import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RmuBreadcrumbs,
  RefreshButton,
  EditButton,
  DeleteButton,
  DeleteDialog,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { deleteSkill } from '../../api/skill';
import { Skill } from '../../api/skill.dto';

const SkillViewActions: FC<{
  skill: Skill;
  onRefresh: () => void;
}> = ({ skill, onRefresh }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const breadcrumbs = [
    { name: t('Core'), link: '/core' },
    { name: t('Skill Categories'), link: '/core/skill-categories' },
    { name: t('Skill'), link: '/core/skills' },
  ];

  const onDelete = () => {
    deleteSkill(skill.id)
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
