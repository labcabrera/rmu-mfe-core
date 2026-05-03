/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Chip, Grid, Typography } from '@mui/material';
import {
  CategorySeparator,
  EditableAvatar,
  RmuTextCard,
  TechnicalInfo,
  Race,
  Realm,
  fetchRace,
  fetchRealm,
  updateRace,
  UpdateRaceDto,
  LayoutBase,
  DeleteButton,
  EditButton,
  RefreshButton,
  DeleteDialog,
  deleteRace,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { imageBaseUrl } from '../../services/config';
import { getAvatarImages } from '../../services/image-service';
import RaceViewAttributes from './RaceViewAttributes';
import RaceViewResistances from './RaceViewResistances';
import RaceViewSkills from './RaceViewSkills';
import RaceViewStats from './RaceViewStats';
import RaceViewTraits from './RaceViewTraits';

const RaceView: FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { raceId } = useParams<{ raceId: string | undefined }>();
  const [realm, setRealm] = useState<Realm>();
  const { showError } = useError();
  const [race, setRace] = useState<Race>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const onUpdateImage = (imageUrl: string) => {
    const props = { imageUrl } as UpdateRaceDto;
    updateRace(race!.id, props, auth)
      .then((updatedRace) => setRace(updatedRace))
      .catch((err) => showError(err.message));
  };

  const bindRace = (raceId: string) => {
    fetchRace(raceId, auth)
      .then((response) => setRace(response))
      .catch((err) => showError(err.message));
  };

  const onDelete = () => {
    deleteRace(race!.id, auth)
      .then(() => navigate(`/core/realms/view/${race!.realmId}`))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    if (race) {
      fetchRealm(race.realmId, auth)
        .then((response) => setRealm(response))
        .catch((err: Error) => showError(err.message));
    }
  }, [race]);

  useEffect(() => {
    if (location && location.state && location.state.race) {
      setRace(location.state.race);
    } else if (raceId) {
      bindRace(raceId);
    }
  }, [location, raceId]);

  if (!race || !realm) return <p>Loading race...</p>;

  return (
    <>
      <LayoutBase
        breadcrumbs={[
          { name: t('home'), link: '/' },
          { name: t('core'), link: '/core' },
          { name: t('races'), link: '/core/races' },
        ]}
        actions={[
          <RefreshButton onClick={() => bindRace(race.id)} />,
          <EditButton onClick={() => navigate(`/core/races/edit/${raceId}`, { state: race })} />,
          <DeleteButton onClick={() => setDeleteDialogOpen(true)} />,
        ]}
        leftPanel={
          <>
            <EditableAvatar
              imageUrl={race.imageUrl || ''}
              onImageChange={(avatar) => onUpdateImage(avatar)}
              images={getAvatarImages()}
            />
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
        }
      >
        <CategorySeparator text={t('realm')} />
        <Grid container spacing={1} columns={10}>
          <Grid size={{ xs: 12, md: 4 }}>
            <RmuTextCard
              value={realm.name}
              subtitle={t('realm')}
              image={realm?.imageUrl ? realm.imageUrl : `${imageBaseUrl}images/generic/realm.png`}
              onClick={() => navigate(`/core/realms/view/${race.realmId}`, { state: { realm: realm } })}
            />
          </Grid>
        </Grid>
        <CategorySeparator text={t('statistics')} />
        <RaceViewStats race={race} />
        <CategorySeparator text={t('resistances')} />
        <RaceViewResistances race={race} />
        <CategorySeparator text={t('race-features')} />
        <RaceViewAttributes race={race} />

        <RaceViewTraits race={race} setRace={setRace} />
        <RaceViewSkills race={race} setRace={setRace} />

        {race.defaultLanguage && (
          <>
            <CategorySeparator text={t('language')} />
            <Grid size={12} sx={{ mt: 2 }}>
              <Grid container spacing={1} columns={10}>
                <Grid size={{ xs: 12, md: 2 }}>
                  <RmuTextCard
                    value={race.defaultLanguage || 'Undefined'}
                    subtitle={t('default-language')}
                    image={`${imageBaseUrl}images/generic/language.png`}
                  />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
        <Grid size={12} sx={{ mt: 5 }}>
          <TechnicalInfo>
            <pre>{JSON.stringify(race, null, 2)} </pre>
          </TechnicalInfo>
        </Grid>
        <DeleteDialog
          message={`Are you sure you want to delete ${race.name} race? This action cannot be undone.`}
          onDelete={onDelete}
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        />
      </LayoutBase>
    </>
  );
};

export default RaceView;
