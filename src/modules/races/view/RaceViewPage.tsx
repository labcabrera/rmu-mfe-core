/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Chip, Link, Stack } from '@mui/material';
import {
  deleteRace,
  DetailPage,
  enterSx,
  fetchRace,
  fetchRealm,
  ImageSelectorDialog,
  Race,
  Realm,
  SectionNav,
  StatPill,
  updateRace,
  UpdateRaceDto,
  useEntity,
  useNotify,
  useSectionParam,
  viewTransitionName,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import RaceViewOverview from './RaceViewOverview';
import RaceViewSkills from './RaceViewSkills';
import RaceViewTraits from './RaceViewTraits';

const sectionIds = ['overview', 'traits', 'skills'];
type RaceSectionId = 'overview' | 'traits' | 'skills';

export default function RaceViewPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { raceId } = useParams<{ raceId?: string }>();
  const state = useEntity<Race>(raceId, (id) => fetchRace(id, auth), {
    initial: location.state?.race,
    onError: notify.error,
  });
  const race = state.entity;
  const [realm, setRealm] = useState<Realm>();
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [section, setSection] = useSectionParam(sectionIds);

  useEffect(() => {
    if (!race?.realmId) return;
    fetchRealm(race.realmId, auth).then(setRealm).catch(notify.error);
  }, [race?.realmId]);

  const onUpdateImage = (entity: Race, imageUrl: string) =>
    updateRace(entity.id, { imageUrl } as UpdateRaceDto, auth)
      .then(state.setEntity)
      .catch(notify.error);

  const onDelete = (entity: Race) =>
    deleteRace(entity.id, auth)
      .then(() => navigate(`/core/realms/view/${entity.realmId}`))
      .catch(notify.error);

  const overline = (entity: Race): ReactNode => (
    <Stack direction="row" component="span" sx={{ gap: 1, flexWrap: 'wrap' }}>
      {entity.archetype && <span>{t(entity.archetype)}</span>}
      {entity.archetype && <span>{'·'}</span>}
      <Link
        component={RouterLink}
        to={`/core/realms/view/${entity.realmId}`}
        state={realm ? { realm } : undefined}
        underline="hover"
      >
        {realm?.name ?? t('realm')}
      </Link>
    </Stack>
  );

  const renderSection = (entity: Race): Record<RaceSectionId, ReactNode> => ({
    overview: <RaceViewOverview race={entity} />,
    traits: <RaceViewTraits race={entity} setRace={state.setEntity} />,
    skills: <RaceViewSkills race={entity} setRace={state.setEntity} />,
  });

  return (
    <DetailPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('races'), link: '/core/races' },
        { name: race ? t(race.name) : t('view') },
      ]}
      entity={state}
      technicalInfo={false}
      onEdit={(entity) => navigate(`/core/races/edit/${entity.id}`, { state: { race: entity } })}
      onDelete={onDelete}
      hero={(entity) => ({
        title: t(entity.name),
        overline: overline(entity),
        image: entity.imageUrl,
        imageTransitionName: viewTransitionName('race', entity.id),
        onImageClick: () => setImageDialogOpen(true),
        imageActionLabel: t('change-image'),
        chips: [
          <Chip key="size" size="small" label={`${t('race-size')}: ${t(`size-${entity.sizeId}`)}`} />,
          ...(entity.defaultLanguage
            ? [
                <Chip
                  key="language"
                  size="small"
                  variant="outlined"
                  label={`${t('default-language')}: ${t(entity.defaultLanguage, { defaultValue: entity.defaultLanguage })}`}
                />,
              ]
            : []),
          <Chip
            key="access"
            size="small"
            variant="outlined"
            label={t(entity.accessType)}
            color={entity.accessType === 'public' ? 'success' : 'error'}
          />,
        ],
        pills: [
          <StatPill key="hp" label={t('base-hit-points')} value={entity.baseHits} />,
          <StatPill key="dp" label={t('race-bonus-dev-points')} value={entity.baseDevPoints} />,
          <StatPill key="at" label={t('base-at')} value={entity.baseAt} />,
          <StatPill key="stride" label={t('stride-bonus')} value={entity.strideBonus} signed />,
          <StatPill key="endurance" label={t('endurance-bonus')} value={entity.enduranceBonus} signed />,
          <StatPill key="recovery" label={t('recovery-multiplier')} value={`×${entity.recoveryMultiplier}`} />,
        ],
      })}
    >
      {(entity) => (
        <Stack spacing={2}>
          <SectionNav
            label={t('race-sections')}
            value={section}
            onChange={setSection}
            sections={sectionIds.map((id) => ({ id, label: t(id === 'overview' ? 'summary' : id) }))}
          />
          <Box key={section} sx={enterSx()}>
            {renderSection(entity)[section as RaceSectionId]}
          </Box>
          <ImageSelectorDialog
            value={entity.imageUrl || undefined}
            open={imageDialogOpen}
            onClose={() => setImageDialogOpen(false)}
            onSelect={(image) => onUpdateImage(entity, image)}
          />
        </Stack>
      )}
    </DetailPage>
  );
}
