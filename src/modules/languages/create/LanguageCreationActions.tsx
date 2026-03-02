import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { CreateLanguageDto } from '../../api/language.dto';
import { createLanguage } from '../../api/languages';
import { Realm } from '../../api/realm.dto';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const LanguageCreationActions: FC<{
  formData: CreateLanguageDto;
  realm: Realm;
  isValid: boolean;
}> = ({ formData, realm, isValid }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('realms'), link: '/core/realms' },
    { name: realm.name, link: `/core/realms/view/${realm.id}` },
    { name: t('language-creation') },
  ];

  const handleSave = async () => {
    createLanguage(formData)
      .then((language) => navigate(`/core/languages/view/${language.id}`, { state: { language, realm } }))
      .catch((err) => showError(err.message));
  };

  const handleBack = () => {
    navigate(`/core/realms/view/${realm.id}`, { state: { realm } });
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <CancelButton onClick={handleBack} />
      <SaveButton onClick={handleSave} disabled={!isValid} />
    </RmuBreadcrumbs>
  );
};

export default LanguageCreationActions;
