import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { RmuBreadcrumbs, CancelButton, SaveButton } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { updateTrait } from '../../api/trait';
import { Trait, UpdateTraitDto } from '../../api/trait.dto';

const TraitEditActions: FC<{
  trait: Trait;
  formData: UpdateTraitDto;
}> = ({ trait, formData }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('traits'), link: '/core/traits' },
    { name: t('edit') },
  ];

  if (!trait) return <p>Loading...</p>;

  const handleSaveButtonClick = async () => {
    updateTrait(trait.id, formData)
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
