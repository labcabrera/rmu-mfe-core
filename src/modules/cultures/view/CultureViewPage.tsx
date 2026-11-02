import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Chip, Stack, Typography } from '@mui/material';
import {
  AccessTypeChip,
  AddButton,
  addCultureSkillRank,
  Bento,
  canEditEntity,
  ChipRow,
  Culture,
  CultureSkillRank,
  defaultImages,
  deleteCulture,
  deleteCultureSkillRank,
  DetailPage,
  EntitySourceChip,
  fetchCulture,
  ImageSelectorDialog,
  Panel,
  Section,
  span,
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
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  // Spec 063: rulebook entities only for admins, user entities for their owner.
  const editable = canEditEntity(state.entity, auth);

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
        { name: state.entity ? t(state.entity.name) : t('view') },
      ]}
      entity={state}
      technicalInfo={false}
      onEdit={editable ? (culture) => navigate(`/core/cultures/edit/${culture.id}`, { state: { culture } }) : undefined}
      onDelete={editable ? onDelete : undefined}
      hero={(culture) => ({
        title: t(culture.name),
        image: culture.imageUrl || defaultImages.culture,
        ...(editable ? { onImageClick: () => setImageDialogOpen(true), imageActionLabel: t('change-image') } : {}),
        chips: [
          <AccessTypeChip key="access" accessType={culture.accessType} />,
          <EntitySourceChip key="source" entity={culture} />,
          <CultureDevelopmentCost key="cost" cost={culture.developmentCost} />,
        ],
      })}
    >
      {(culture) => (
        <Stack spacing={2}>
          {culture.description && (
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
              {culture.description}
            </Typography>
          )}
          <Section
            title={t('culture-skill-ranks')}
            actions={editable && <AddButton onClick={() => setAddSkillOpen(true)} />}
          >
            <CultureSkillRankTable
              entries={culture.skillRanks}
              onDelete={editable ? (index) => onDeleteSkillRank(culture, index) : undefined}
            />
          </Section>
          <Section title={t('languages')}>
            <CultureLanguages languages={culture.languages} />
          </Section>
          {(culture.suggestedCrafts || culture.suggestedVocations) && (
            <Bento>
              {culture.suggestedCrafts && (
                <Box sx={span(6, 6)}>
                  <Panel variant="outlined" title={t('suggested-crafts')} sx={{ height: '100%' }}>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                      {culture.suggestedCrafts}
                    </Typography>
                  </Panel>
                </Box>
              )}
              {culture.suggestedVocations && (
                <Box sx={span(6, 6)}>
                  <Panel variant="outlined" title={t('suggested-vocations')} sx={{ height: '100%' }}>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                      {culture.suggestedVocations}
                    </Typography>
                  </Panel>
                </Box>
              )}
            </Bento>
          )}
          <AddCultureSkillRankDialog
            open={addSkillOpen}
            onAdd={(entry) => onAddSkillRank(culture, entry)}
            onClose={() => setAddSkillOpen(false)}
          />
          <ImageSelectorDialog
            value={culture.imageUrl || undefined}
            open={imageDialogOpen}
            onClose={() => setImageDialogOpen(false)}
            onSelect={(image) => onUpdateImage(culture, image)}
          />
        </Stack>
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
    <ChipRow>
      {languages.map((language) => (
        <Chip key={language} label={t(language)} size="small" />
      ))}
    </ChipRow>
  );
}
