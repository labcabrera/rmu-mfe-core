import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { updateTrait } from '../../api/trait';
import { Trait, UpdateTraitDto } from '../../api/trait.dto';
import BackButton from '../../shared/buttons/BackButton';
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
    return;
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/tactical">
          {t('tactical-games')}
        </Link>
        <Link color="inherit" component={RouterLink} to={''}>
          {trait.id}
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{t('edit')}</Typography>
      </Breadcrumbs>

      <div style={{ flexGrow: 1 }} />

      <BackButton onClick={handleBackButtonClick} />
      <SaveButton onClick={handleSaveButtonClick} />
    </Stack>
  );
};

export default TraitEditActions;
