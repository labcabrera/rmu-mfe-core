import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Stack, Link } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { createTrait } from '../../api/trait';
import { CreateTraitDto } from '../../api/trait.dto';
import BackButton from '../../shared/buttons/BackButton';
import SaveButton from '../../shared/buttons/SaveButton';

const TraitCreationActions: FC<{
  formData: CreateTraitDto;
  isValid?: boolean;
}> = ({ formData, isValid = false }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showError } = useError();

  const handleSave = async () => {
    createTrait(formData)
      .then((trait) => {
        navigate(`/core/traits/view/${trait.id}`);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError('Unknown error occurred');
      });
  };

  const handleBack = () => {
    navigate(`/core/realms`);
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            {t('home')}
          </Link>
          <Link component={RouterLink} to="/core" color="inherit">
            {t('core')}
          </Link>
          <Link component={RouterLink} to="/core/traits" color="inherit">
            {t('traits')}
          </Link>
          <span>{t('creation')}</span>
        </Breadcrumbs>
      </Box>
      <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end', alignItems: 'flex-start' }}>
        <BackButton onClick={handleBack} size={80} />
        <SaveButton onClick={handleSave} size={80} disabled={!isValid} />
      </Stack>
    </Stack>
  );
};

export default TraitCreationActions;
