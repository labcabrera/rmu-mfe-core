import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import {
  addCultureSkillRank,
  AddButton,
  CategorySeparator,
  Culture,
  CultureSkillRank,
  defaultImages,
  deleteCulture,
  deleteCultureSkillRank,
  DetailPage,
  EditableAvatar,
  fetchCulture,
  updateCulture,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import AddCultureSkillRankDialog from '../shared/AddCultureSkillRankDialog';
import CultureDevelopmentCost from '../shared/CultureDevelopmentCost';
import CultureSkillRankTable from '../shared/CultureSkillRankTable';

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

  const onAddSkillRank = (culture: Culture, entry: CultureSkillRank) =>
    addCultureSkillRank(culture.id, entry, auth).then(state.setEntity);

  const onDeleteSkillRank = (culture: Culture, index: number) =>
    deleteCultureSkillRank(culture.id, index, auth).then(state.setEntity).catch(notify.error);

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
            altImageUrl={defaultImages.culture}
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
          <Box sx={{ mt: 2 }}>
            <CultureDevelopmentCost cost={culture.developmentCost} />
          </Box>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 2, whiteSpace: 'pre-line' }}>
            {culture.description}
          </Typography>
        </>
      )}
    >
      {(culture) => (
        <>
          <Grid size={12}>
            <CategorySeparator text={t('culture-skill-ranks')}>
              <AddButton onClick={() => setAddSkillOpen(true)} />
            </CategorySeparator>
          </Grid>
          <Grid size={12}>
            <CultureSkillRankTable
              entries={culture.skillRanks}
              onDelete={(index) => onDeleteSkillRank(culture, index)}
            />
          </Grid>
          <Grid size={12}>
            <CategorySeparator text={t('languages')} />
            <CultureLanguages languages={culture.languages} />
          </Grid>
          {culture.suggestedCrafts && (
            <Grid size={{ xs: 12, md: 6 }}>
              <CategorySeparator text={t('suggested-crafts')} />
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                {culture.suggestedCrafts}
              </Typography>
            </Grid>
          )}
          {culture.suggestedVocations && (
            <Grid size={{ xs: 12, md: 6 }}>
              <CategorySeparator text={t('suggested-vocations')} />
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                {culture.suggestedVocations}
              </Typography>
            </Grid>
          )}
          <AddCultureSkillRankDialog
            open={addSkillOpen}
            onAdd={(entry) => onAddSkillRank(culture, entry)}
            onClose={() => setAddSkillOpen(false)}
          />
        </>
      )}
    </DetailPage>
  );
}

function CultureLanguages({ languages }: { languages: string[] | undefined }) {
  const { t } = useTranslation();
  if (!languages || languages.length === 0) {
    return <Typography variant="body2">{t('culture-languages-all')}</Typography>;
  }
  return (
    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
      {languages.map((language) => (
        <Chip key={language} label={t(language)} size="small" />
      ))}
    </Stack>
  );
}
