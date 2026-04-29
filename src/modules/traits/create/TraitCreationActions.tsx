import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  CancelButton,
  createTrait,
  CreateTraitDto,
  RmuBreadcrumbs,
  SaveButton,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';

const TraitCreationActions: FC<{
  formData: CreateTraitDto;
  isValid?: boolean;
}> = ({ formData, isValid = false }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('Core'), link: '/core' },
    { name: t('Traits'), link: '/core/traits' },
    { name: t('Creation') },
  ];

  const handleSave = async () => {
    createTrait(formData, auth)
      .then((trait) => navigate(`/core/traits/view/${trait.id}`))
      .catch((err) => showError(err.message));
  };

  const handleBack = () => {
    navigate(`/core/traits`);
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <CancelButton onClick={handleBack} />
      <SaveButton onClick={handleSave} disabled={!isValid} />
    </RmuBreadcrumbs>
  );
};

export default TraitCreationActions;
