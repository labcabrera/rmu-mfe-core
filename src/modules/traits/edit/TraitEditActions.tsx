import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  RmuBreadcrumbs,
  CancelButton,
  SaveButton,
  Trait,
  updateTrait,
  UpdateTraitDto,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';

const TraitEditActions: FC<{
  trait: Trait;
  formData: UpdateTraitDto;
}> = ({ trait, formData }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useAuth();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('traits'), link: '/core/traits' },
    { name: t('edit') },
  ];

  if (!trait) return <p>Loading...</p>;

  const handleSaveButtonClick = async () => {
    updateTrait(trait.id, formData, auth)
      .then((data) => {
        navigate(`/core/traits/view/${trait.id}`, { state: { trait: data } });
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError('An unknown error occurred');
      });
  };

  const handleBackButtonClick = () => {
    navigate(`/core/traits/view/${trait.id}`, { state: { trait } });
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <CancelButton onClick={handleBackButtonClick} />
      <SaveButton onClick={handleSaveButtonClick} />
    </RmuBreadcrumbs>
  );
};

export default TraitEditActions;
