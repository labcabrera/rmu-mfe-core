import React, { FC } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Stack, Link } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { CreateLanguageDto } from '../../api/language.dto';
import { createLanguage } from '../../api/languages';
import { Realm } from '../../api/realm.dto';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const LanguageCreationActions: FC<{
  formData: CreateLanguageDto;
  realm: Realm;
  isValid: boolean;
}> = ({ formData, realm, isValid }) => {
  const navigate = useNavigate();
  const { showError } = useError();

  const handleSave = async () => {
    createLanguage(formData)
      .then((language) => navigate(`/core/languages/view/${language.id}`, { state: { language, realm } }))
      .catch((err) => showError(err.message));
  };

  const handleBack = () => {
    navigate(`/core/realms/view/${realm.id}`, { state: { realm } });
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="primary" underline="hover" href="/">
            {t('home')}
          </Link>
          <Link component={RouterLink} to="/core" color="primary" underline="hover">
            {t('core')}
          </Link>
          <Link component={RouterLink} to="/core/realms" color="primary" underline="hover">
            {t('realms')}
          </Link>
          <Link
            component={RouterLink}
            color="primary"
            underline="hover"
            to={`/core/realms/view/${realm.id}`}
            state={{ realm }}
          >
            {realm.name}
          </Link>
          <span>{t('language-creation')}</span>
        </Breadcrumbs>
      </Box>
      <Stack direction="row" spacing={1}>
        <CancelButton onClick={handleBack} />
        <SaveButton onClick={handleSave} disabled={!isValid} />
      </Stack>
    </Stack>
  );
};

export default LanguageCreationActions;
