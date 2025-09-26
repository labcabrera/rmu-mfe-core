import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { updateTrait } from '../../api/trait';
import { Trait, UpdateTraitDto } from '../../api/trait.dto';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const TraitEditActions: FC<{
  trait: Trait;
  formData: UpdateTraitDto;
}> = ({ trait, formData }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showError } = useError();

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
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="primary" underline="hover" href="/">
          {t('home')}
        </Link>
        <Link component={RouterLink} color="primary" underline="hover" to={'/core/'}>
          {t('core')}
        </Link>
        <Link component={RouterLink} color="primary" underline="hover" to={'/core/traits'}>
          {t('traits')}
        </Link>
        <Link component={RouterLink} color="primary" underline="hover" to={`/core/traits/view/${trait.id}`}>
          {t(trait.name)}
        </Link>
        <span>{t('edit')}</span>
      </Breadcrumbs>
      <div style={{ flexGrow: 1 }} />
      <CancelButton onClick={handleBackButtonClick} />
      <SaveButton onClick={handleSaveButtonClick} />
    </Stack>
  );
};

export default TraitEditActions;
