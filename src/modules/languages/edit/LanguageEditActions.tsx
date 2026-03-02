import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { Language, UpdateLanguageDto } from '../../api/language.dto';
import { updateLanguage } from '../../api/languages';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const LanguageEditActions: FC<{
  language: Language;
  formData: UpdateLanguageDto;
}> = ({ language, formData }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('realms'), link: '/core/realms' },
    { name: language.realmName, link: `/core/realms/view/${language.realmId}` },
    { name: language.name, link: `/core/languages/view/${language.id}` },
    { name: t('edit') },
  ];

  const onSave = async () => {
    updateLanguage(language.id, formData)
      .then((data) => navigate(`/core/languages/view/${data.id}`, { state: { language: data } }))
      .catch((err) => showError(err.message));
  };

  const onCancel = () => {
    navigate(`/core/languages/view/${language.id}`, { state: { language } });
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <CancelButton onClick={onCancel} />
      <SaveButton onClick={onSave} />
    </RmuBreadcrumbs>
  );
};

export default LanguageEditActions;
