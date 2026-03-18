import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { deleteSkill } from '../../api/skill';
import { Skill } from '../../api/skill.dto';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import DeleteButton from '../../shared/buttons/DeleteButton';
import EditButton from '../../shared/buttons/EditButton';
import RefreshButton from '../../shared/buttons/RefreshButton';
import DeleteDialog from '../../shared/dialogs/DeleteDialog';

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

  const onEdit = () => {
    navigate(`/core/skills/edit/${skill.id}`);
  };

  const onDelete = () => {
    deleteSkill(skill.id)
      .then(() => navigate(`/core/skills`))
      .catch((err) => showError(err.message));
  };

  if (!skill) return <p>Loading...</p>;

  return (
    <>
      <RmuBreadcrumbs items={breadcrumbs}>
        <RefreshButton onClick={onRefresh} />
        <EditButton onClick={onEdit} />
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
