import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  RmuBreadcrumbs,
  CancelButton,
  SaveButton,
  Profession,
  UpdateProfessionDto,
  updateProfession,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';

const ProfessionEditActions: FC<{
  profession: Profession;
  formData: UpdateProfessionDto;
}> = ({ profession, formData }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('Core'), link: '/core' },
    { name: t('Profession'), link: `/core/professions/view/${profession.id}` },
    { name: t('Edit') },
  ];

  if (!profession || !formData) return <p>Loading profession...</p>;

  const onSave = async () => {
    updateProfession(profession.id, formData, auth)
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
