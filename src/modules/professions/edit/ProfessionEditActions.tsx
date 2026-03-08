import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { updateProfession } from '../../api/profession';
import { Profession, UpdateProfessionDto } from '../../api/profession.dto';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const ProfessionEditActions: FC<{
  profession: Profession;
  formData: UpdateProfessionDto;
}> = ({ profession, formData }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('Core'), link: '/core' },
    { name: t('Profession'), link: `/core/professions/view/${profession.id}` },
    { name: t('Edit') },
  ];

  if (!profession || !formData) return <p>Loading profession...</p>;

  const onSave = async () => {
    updateProfession(profession.id, formData)
      .then((data) => navigate(`/core/professions/view/${profession.id}`, { state: { profession: data } }))
      .catch((err) => showError(err.message));
  };

  const onCancel = () => {
    navigate(`/core/professions/view/${profession.id}`, { state: { profession: profession } });
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <CancelButton onClick={onCancel} />
      <SaveButton onClick={onSave} />
    </RmuBreadcrumbs>
  );
};

export default ProfessionEditActions;
