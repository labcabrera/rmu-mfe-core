import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { RmuBreadcrumbs, CancelButton, SaveButton, Culture, updateCulture } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';

const RaceEditActions: FC<{
  culture: Culture;
  formData: Culture;
}> = ({ culture, formData }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('Core'), link: '/core' },
    { name: t('Cultures'), link: '/core/realms' },
    { name: t('Edit') },
  ];

  if (!culture || !formData) return <p>Loading race...</p>;

  const onSave = async () => {
    updateCulture(culture.id, formData)
      .then((response) => navigate(`/core/cultures/view/${culture.id}`, { state: { race: response } }))
      .catch((err) => showError(err.message));
  };

  const onCancel = () => {
    navigate(`/core/cultures/view/${culture.id}`, { state: { culture: culture } });
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <CancelButton onClick={onCancel} />
      <SaveButton onClick={onSave} />
    </RmuBreadcrumbs>
  );
};

export default RaceEditActions;
