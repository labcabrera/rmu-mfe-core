import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CancelButton, RmuBreadcrumbs, SaveButton } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { createTrait } from '../../api/trait';
import { CreateTraitDto } from '../../api/trait.dto';

const TraitCreationActions: FC<{
  formData: CreateTraitDto;
  isValid?: boolean;
}> = ({ formData, isValid = false }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('Core'), link: '/core' },
    { name: t('Traits'), link: '/core/traits' },
    { name: t('Creation') },
  ];

  const handleSave = async () => {
    createTrait(formData)
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
