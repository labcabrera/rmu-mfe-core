import React, { FC } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { Language, UpdateLanguageDto } from '../../api/language.dto';
import { updateLanguage } from '../../api/languages';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const LanguageEditActions: FC<{
  language: Language;
  formData: UpdateLanguageDto;
}> = ({ language, formData }) => {
  const navigate = useNavigate();
  const { showError } = useError();

  const onSave = async () => {
    updateLanguage(language.id, formData)
      .then((data) => navigate(`/core/languages/view/${data.id}`, { state: { language: data } }))
      .catch((err) => showError(err.message));
  };

  const onCancel = () => {
    navigate(`/core/languages/view/${language.id}`, { state: { language } });
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="primary" underline="hover" href="/">
          {t('home')}
        </Link>
        <Link color="primary" underline="hover" component={RouterLink} to={'/core'}>
          {t('core')}
        </Link>
        <Link color="primary" underline="hover" component={RouterLink} to={'/core/realms'}>
          {t('realms')}
        </Link>
        <Link color="primary" underline="hover" component={RouterLink} to={`/core/realms/view/${language.realmId}`}>
          {language.realmName}
        </Link>
        <Link
          color="primary"
          underline="hover"
          component={RouterLink}
          to={`/core/languages/view/${language.id}`}
          state={{ language }}
        >
          {language.name}
        </Link>
        <span>{t('edit')}</span>
      </Breadcrumbs>
      <Stack direction="row" spacing={1}>
        <CancelButton onClick={onCancel} />
        <SaveButton onClick={onSave} />
      </Stack>
    </Stack>
  );
};

export default LanguageEditActions;
