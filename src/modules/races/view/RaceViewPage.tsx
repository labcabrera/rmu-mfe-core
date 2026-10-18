/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Chip, Grid, Typography } from '@mui/material';
import {
  CategorySeparator,
  deleteRace,
  DetailPage,
  EditableAvatar,
  fetchRace,
  fetchRealm,
  imageBaseUrl,
  LoadingState,
  Race,
  Realm,
  RmuTextCard,
  updateRace,
  UpdateRaceDto,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { DEFAULT_REALM_IMAGE } from '../../services/image-service';
import RaceViewAttributes from './RaceViewAttributes';
import RaceViewResistances from './RaceViewResistances';
import RaceViewSkills from './RaceViewSkills';
import RaceViewStats from './RaceViewStats';
import RaceViewTraits from './RaceViewTraits';

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

  useEffect(() => {
    if (!race?.realmId) return;
    fetchRealm(race.realmId, auth).then(setRealm).catch(notify.error);
  }, [race?.realmId]);

  const onUpdateImage = (race: Race, imageUrl: string) =>
    updateRace(race.id, { imageUrl } as UpdateRaceDto, auth)
      .then(state.setEntity)
      .catch(notify.error);

  const onDelete = (race: Race) =>
    deleteRace(race.id, auth)
      .then(() => navigate(`/core/realms/view/${race.realmId}`))
      .catch(notify.error);

  return (
    <DetailPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('races'), link: '/core/races' },
      ]}
      entity={state}
      summaryTitle={(entity) => t(entity.name)}
      onEdit={(race) => navigate(`/core/races/edit/${race.id}`, { state: { race } })}
      onDelete={onDelete}
      leftPanel={(race) => (
        <>
          <EditableAvatar imageUrl={race.imageUrl || ''} onImageChange={(avatar) => onUpdateImage(race, avatar)} />
          <Chip
            label={t(race.accessType)}
            color={race.accessType === 'public' ? 'success' : 'error'}
            size="small"
            sx={{ mt: 2 }}
          />
          <Typography variant="h6" color="primary">
            {t(race.name)}
          </Typography>
          {race.archetype && (
            <Typography variant="body1" color="textSecondary">
              {t(race.archetype)}
            </Typography>
          )}
          <Typography variant="caption" color="textSecondary" sx={{ mt: 2, whiteSpace: 'pre-line' }}>
            {race.description}
          </Typography>
        </>
      )}
    >
      {(race) => (
        <>
          <CategorySeparator text={t('realm')} />
          <Grid container spacing={1} columns={10}>
            <Grid size={{ xs: 12, md: 4 }}>
              {realm ? (
                <RmuTextCard
                  value={realm.name}
                  subtitle={t('realm')}
                  image={realm.imageUrl || DEFAULT_REALM_IMAGE}
                  onClick={() => navigate(`/core/realms/view/${race.realmId}`, { state: { realm } })}
                />
              ) : (
                <LoadingState />
              )}
            </Grid>
          </Grid>
          <CategorySeparator text={t('statistics')} />
          <RaceViewStats race={race} />
          <CategorySeparator text={t('resistances')} />
          <RaceViewResistances race={race} />
          <CategorySeparator text={t('race-features')} />
          <RaceViewAttributes race={race} />
          <RaceViewTraits race={race} setRace={state.setEntity} />
          <RaceViewSkills race={race} setRace={state.setEntity} />
          {race.defaultLanguage && (
            <>
              <CategorySeparator text={t('language')} />
              <Grid size={12} sx={{ mt: 2 }}>
                <Grid container spacing={1} columns={10}>
                  <Grid size={{ xs: 12, md: 2 }}>
                    <RmuTextCard
                      value={race.defaultLanguage}
                      subtitle={t('default-language')}
                      image={`${imageBaseUrl}images/generic/language.png`}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </>
      )}
    </DetailPage>
  );
}
