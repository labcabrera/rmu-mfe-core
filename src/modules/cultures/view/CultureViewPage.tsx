import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Chip, Grid, Typography } from '@mui/material';
import {
  AddButton,
  CategorySeparator,
  Culture,
  deleteCulture,
  DetailPage,
  EditableAvatar,
  fetchCulture,
  updateCulture,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import AddCultureFixedSkillDialog from './skills/AddCultureFixedSkillDialog';
import CultureSkillTable from './skills/CultureSkillTable';

export default function CultureViewPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { cultureId } = useParams<{ cultureId?: string }>();
  const state = useEntity<Culture>(cultureId, (id) => fetchCulture(id, auth), {
    initial: location.state?.culture,
    onError: notify.error,
  });
  const [addSkillOpen, setAddSkillOpen] = useState(false);

  const onUpdateImage = (culture: Culture, imageUrl: string) =>
    updateCulture(culture.id, { imageUrl }, auth).then(state.setEntity).catch(notify.error);

  const onDelete = (culture: Culture) =>
    deleteCulture(culture.id, auth)
      .then(() => navigate('/core/cultures'))
      .catch(notify.error);

  return (
    <DetailPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('cultures'), link: '/core/cultures' },
        { name: t('view') },
      ]}
      entity={state}
      summaryTitle={(entity) => t(entity.name)}
      onEdit={(culture) => navigate(`/core/cultures/edit/${culture.id}`, { state: { culture } })}
      onDelete={onDelete}
      leftPanel={(culture) => (
        <>
          <EditableAvatar
            imageUrl={culture.imageUrl || ''}
            onImageChange={(avatar) => onUpdateImage(culture, avatar)}
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
      )}
    >
      {(culture) => (
        <>
          <Grid size={12}>
            <CategorySeparator text={t('fixed-skills')}>
              <AddButton onClick={() => setAddSkillOpen(true)} />
            </CategorySeparator>
          </Grid>
          <Grid size={12}>
            <CultureSkillTable culture={culture} setCulture={state.setEntity} />
          </Grid>
          <AddCultureFixedSkillDialog
            open={addSkillOpen}
            culture={culture}
            setCulture={state.setEntity}
            onClose={() => setAddSkillOpen(false)}
          />
        </>
      )}
    </DetailPage>
  );
}
