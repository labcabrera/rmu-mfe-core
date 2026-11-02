import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Chip, Stack, Typography } from '@mui/material';
import {
  AccessTypeChip,
  canEditEntity,
  ChipRow,
  deleteProfession,
  DetailPage,
  EntitySourceChip,
  fetchProfession,
  ImageSelectorDialog,
  Panel,
  Profession,
  Section,
  SectionLabel,
  updateProfession,
  UpdateProfessionDto,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import ProfessionViewProfessionalSkills from './ProfessionViewProfessionalSkills';
import ProfessionViewSkillCosts from './ProfessionViewSkillCosts';

export default function ProfessionViewPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { professionId } = useParams<{ professionId?: string }>();
  const state = useEntity<Profession>(professionId, (id) => fetchProfession(id, auth), {
    initial: location.state?.profession,
    onError: notify.error,
  });
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  // Spec 063: rulebook entities only for admins, user entities for their owner.
  const editable = canEditEntity(state.entity, auth);

  const onUpdateImage = (profession: Profession, imageUrl: string) =>
    updateProfession(profession.id, { imageUrl } as UpdateProfessionDto, auth)
      .then(state.setEntity)
      .catch(notify.error);

  const onDelete = (profession: Profession) =>
    deleteProfession(profession.id, auth)
      .then(() => navigate('/core/professions'))
      .catch(notify.error);

  return (
    <DetailPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('professions'), link: '/core/professions' },
        { name: state.entity ? t(state.entity.id) : t('view') },
      ]}
      entity={state}
      technicalInfo={false}
      onEdit={
        editable
          ? (profession) => navigate(`/core/professions/edit/${profession.id}`, { state: { profession } })
          : undefined
      }
      onDelete={editable ? onDelete : undefined}
      hero={(profession) => ({
        title: t(profession.id),
        overline: t(profession.archetype),
        image: profession.imageUrl,
        ...(editable ? { onImageClick: () => setImageDialogOpen(true), imageActionLabel: t('change-image') } : {}),
        chips: [
          <AccessTypeChip key="access" accessType={profession.accessType} />,
          <EntitySourceChip key="source" entity={profession} />,
        ],
      })}
    >
      {(profession) => {
        const hasRealms =
          profession.availableRealmTypes.length > 0 ||
          profession.fixedRealmTypes.length > 0 ||
          typeof profession.baseListLimit === 'number';
        return (
          <Stack spacing={2}>
            {profession.description && (
              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                {t(profession.description)}
              </Typography>
            )}
            {hasRealms && (
              <Panel variant="outlined">
                <Stack spacing={1.5}>
                  {profession.availableRealmTypes.length > 0 && (
                    <Box>
                      <SectionLabel>{t('available-realms')}</SectionLabel>
                      <ChipRow>
                        {profession.availableRealmTypes.map((rt, index) => (
                          <Chip key={index} label={t(rt)} />
                        ))}
                      </ChipRow>
                    </Box>
                  )}
                  {profession.fixedRealmTypes.length > 0 && (
                    <Box>
                      <SectionLabel>{t('fixed-realms')}</SectionLabel>
                      <ChipRow>
                        {profession.fixedRealmTypes.map((rt, index) => (
                          <Chip key={index} label={t(rt)} color="primary" />
                        ))}
                      </ChipRow>
                    </Box>
                  )}
                  {typeof profession.baseListLimit === 'number' && (
                    <Box>
                      <SectionLabel>{t('base-list-limit')}</SectionLabel>
                      <Typography variant="body2">
                        {t('base-list-limit-value', { count: profession.baseListLimit })}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Panel>
            )}
            <Section title={t('skill-costs')}>
              <ProfessionViewSkillCosts profession={profession} />
            </Section>
            <Section title={t('professional-skills')}>
              <ProfessionViewProfessionalSkills profession={profession} />
            </Section>
            <ImageSelectorDialog
              value={profession.imageUrl || undefined}
              open={imageDialogOpen}
              onClose={() => setImageDialogOpen(false)}
              onSelect={(image) => onUpdateImage(profession, image)}
            />
          </Stack>
        );
      }}
    </DetailPage>
  );
}
