/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
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
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { imageBaseUrl } from '../../services/config';
import { gridSizeMain, gridSizeResume } from '../../services/display';
import { getAvatarImages } from '../../services/image-service';
import RaceViewActions from './RaceViewActions';
import RaceViewAttributes from './RaceViewAttributes';
import RaceViewResistances from './RaceViewResistances';
import RaceViewSkills from './RaceViewSkills';
import RaceViewStats from './RaceViewStats';
import RaceViewTraits from './RaceViewTraits';
import { useAuth } from 'react-oidc-context';

const RaceView: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { raceId } = useParams<{ raceId: string | undefined }>();
  const [realm, setRealm] = useState<Realm>();
  const { showError } = useError();
  const [race, setRace] = useState<Race>();

  const onUpdateImage = (imageUrl: string) => {
    const props = { imageUrl } as UpdateRaceDto;
    updateRace(race!.id, props, auth)
      .then((updatedRace) => setRace(updatedRace))
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
      fetchRace(raceId, auth)
        .then((response) => setRace(response))
        .catch((err) => showError(err.message));
    }
  }, [location, raceId]);

  if (!race || !realm) return <p>Loading race...</p>;

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}>
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
          <Typography variant="body1" color="textSecondary" sx={{ mt: 2, whiteSpace: 'pre-line' }}>
            {race.description}
          </Typography>
        </Grid>
        <Grid size={gridSizeMain}>
          <RaceViewActions race={race} setRace={setRace} />
          <CategorySeparator text={t('realm')} />
          <Grid container spacing={1} columns={10}>
            <Grid size={{ xs: 12, md: 2 }}>
              <RmuTextCard
                value={realm.name}
                subtitle={t('realm')}
                image={realm?.imageUrl ? realm.imageUrl : `${imageBaseUrl}images/generic/realm.png`}
                onClick={() => navigate(`/core/realms/view/${race.realmId}`, { state: { realm: realm } })}
              />
            </Grid>
          </Grid>
          <CategorySeparator text={t('Statistics')} />
          <RaceViewStats race={race} />
          <CategorySeparator text={t('Resistances')} />
          <RaceViewResistances race={race} />
          <CategorySeparator text={t('race-features')} />
          <RaceViewAttributes race={race} />

          <RaceViewTraits race={race} setRace={setRace} />
          <RaceViewSkills race={race} setRace={setRace} />

          {race.defaultLanguage && (
            <>
              <CategorySeparator text={t('language')} />
              <Grid size={12} sx={{mt:2}}>
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
          <Grid size={12} sx={{mt: 5}}>
            <TechnicalInfo>
              <pre>{JSON.stringify(race, null, 2)} </pre>
            </TechnicalInfo>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RaceView;
