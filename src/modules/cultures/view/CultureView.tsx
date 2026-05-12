/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Chip, Grid, Typography } from '@mui/material';
import {
  EditableAvatar,
  TechnicalInfo,
  updateCulture,
  Culture,
  fetchCulture,
  CategorySeparator,
  AddButton,
  LayoutBase,
  RefreshButton,
  EditButton,
  DeleteButton,
  DeleteDialog,
  deleteCulture,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { gridSizeMain, gridSizeResume } from '../../services/display';
import { getAvatarImages } from '../../services/image-service';
import AddCultureFixedSkillDialog from './skills/AddCultureFixedSkillDialog';
import CultureSkillTable from './skills/CultureSkillTable';

export default function CultureView() {
  const location = useLocation();
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const { cultureId } = useParams<{ cultureId: string | undefined }>();
  const [culture, setCulture] = useState<Culture>({} as Culture);
  const [addCultureFixedSkillDialogOpen, setAddCultureFixedSkillDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const onUpdateImage = (imageUrl: string) => {
    updateCulture(culture!.id, { imageUrl: imageUrl }, auth)
      .then((response) => setCulture(response))
      .catch((err) => showError(err.message));
  };

  const onDelete = () => {
    deleteCulture(culture.id, auth)
      .then(() => navigate(`/core/cultures`))
      .catch((err) => showError(err.message));
  };

  const bindCulture = (cultureId: string) => {
    fetchCulture(cultureId, auth)
      .then((response) => setCulture(response))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    if (location.state && location.state.culture) {
      setCulture(location.state.culture);
    } else if (cultureId) {
      bindCulture(cultureId);
    }
  }, [location.state, cultureId]);

  if (!culture) return <p>Loading race...</p>;

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('cultures'), link: '/core/cultures' },
        { name: t('view') },
      ]}
      actions={[
        <RefreshButton onClick={() => bindCulture(culture.id)} />,
        <EditButton onClick={() => navigate(`/core/cultures/edit/${culture.id}`, { state: { culture } })} />,
        <DeleteButton onClick={() => setDeleteDialogOpen(true)} />,
      ]}
      leftPanel={
        <>
          <EditableAvatar
            imageUrl={culture.imageUrl || ''}
            onImageChange={(avatar) => onUpdateImage(avatar)}
            images={getAvatarImages()}
          />
          <Chip
            label={t(culture.accessType)}
            color={culture.accessType === 'public' ? 'success' : 'error'}
            size="small"
            sx={{ mt: 2 }}
          />
          <Typography variant="h6" color="primary">
            {t(culture.name)}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 2, whiteSpace: 'pre-line' }}>
            {culture.description}
          </Typography>
        </>
      }
    >
      <Grid size={12}>
        <CategorySeparator text={t('fixed-skills')}>
          <AddButton onClick={() => setAddCultureFixedSkillDialogOpen(true)} />
        </CategorySeparator>
      </Grid>
      <Grid size={12}>
        <CultureSkillTable culture={culture} setCulture={setCulture} />
      </Grid>
      <Grid size={12} sx={{ mt: 5 }}>
        <TechnicalInfo>
          <pre>{JSON.stringify(culture, null, 2)} </pre>
        </TechnicalInfo>
      </Grid>
      <DeleteDialog
        message={`Are you sure you want to delete ${culture.name} culture? This action cannot be undone.`}
        onDelete={onDelete}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      />
      <AddCultureFixedSkillDialog
        open={addCultureFixedSkillDialogOpen}
        culture={culture}
        setCulture={setCulture}
        onClose={() => setAddCultureFixedSkillDialogOpen(false)}
      />
    </LayoutBase>
  );
}
