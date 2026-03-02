import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { updateTrait } from '../../api/trait';
import { Trait, UpdateTraitDto } from '../../api/trait.dto';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const TraitEditActions: FC<{
  trait: Trait;
  formData: UpdateTraitDto;
}> = ({ trait, formData }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('traits'), link: '/core/traits' },
    { name: t(trait.name), link: `/core/traits/view/${trait.id}` },
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
