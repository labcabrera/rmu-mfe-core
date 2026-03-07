import React, { FC, use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchRace } from '../../api/race';
import { updateRace } from '../../api/race';
import { Race } from '../../api/race.dto';
import { fetchRealm } from '../../api/realm';
import { imageBaseUrl } from '../../services/config';
import EdditableAvatar from '../../shared/avatars/EditableAvatar';
import AddButton from '../../shared/buttons/AddButton';
import RmuTextCard from '../../shared/cards/RmuTextCard';
import CategorySeparator from '../../shared/display/CategorySeparator';
import TechnicalInfo from '../../shared/display/TechnicalInfo';
import RaceViewActions from './RaceViewActions';
import RaceViewAttributes from './RaceViewAttributes';
import RaceViewResistances from './RaceViewResistances';
import RaceViewStats from './RaceViewStats';
import RaceViewTraits from './RaceViewTraits';
import AddRaceTraitDialog from './traits/AddRaceTraitDialog';

const RaceView: FC = () => {
  const navigate = useNavigate();
  const { raceId } = useParams<{ raceId: string | undefined }>();
  const [realm, setRealm] = useState<Realm>();
  const { showError } = useError();
  const [race, setRace] = useState<Race>();
  const [traitDialogOpen, setTraitDialogOpen] = useState(false);

  const onUpdateImage = (imageUrl: string) => {
    updateRace(race!.id, { imageUrl: imageUrl! })
      .then((updatedRace) => setRace(updatedRace))
      .catch((err: Error) => showError(err.message));
  };

  useEffect(() => {
    if (raceId) {
      fetchRace(raceId)
        .then((response) => setRace(response))
        .catch((err: Error) => showError(err.message));
    }
  }, [raceId, showError]);

  useEffect(() => {
    if (race) {
      fetchRealm(race.realm.id)
        .then((response) => setRealm(response))
        .catch((err: Error) => showError(err.message));
    }
  }, [race]);

  if (!race) return <p>Loading race...</p>;

  return (
    <>
      <RaceViewActions race={race} setRace={setRace} />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}>
          <EdditableAvatar imageUrl={race.imageUrl || ''} onImageChange={(avatar) => onUpdateImage(avatar)} />
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
        <Grid size={{ xs: 12, md: 8 }} padding={1}>
          <CategorySeparator text={t('realm')} />
          <Grid container spacing={1} columns={10}>
            <Grid size={{ xs: 12, md: 2 }}>
              <RmuTextCard
                value={race.realm.name}
                subtitle={t('realm')}
                image={realm ? realm.imageUrl : `${imageBaseUrl}images/generic/realm.png`}
                onClick={() => navigate(`/core/realms/view/${race.realm.id}`, { state: { realm: realm } })}
              />
            </Grid>
          </Grid>
          <CategorySeparator text={t('statistics')} />
          <RaceViewStats race={race} />
          <CategorySeparator text={t('resistances')} />
          <RaceViewResistances race={race} />
          <CategorySeparator text={t('race-features')} />
          <RaceViewAttributes race={race} />
          <CategorySeparator text={t('traits')}>
            <AddButton onClick={() => setTraitDialogOpen(true)} />
          </CategorySeparator>
          <RaceViewTraits race={race} setRace={setRace} />
          {race.defaultLanguage && (
            <>
              <CategorySeparator text={t('language')} />
              <Grid size={12} mt={2}>
                <Grid container spacing={1} columns={10}>
                  <Grid size={{ xs: 12, md: 2 }}>
                    <RmuTextCard
                      value={race.defaultLanguage?.name || 'Undefined'}
                      subtitle={t('default-language')}
                      image={`${imageBaseUrl}images/generic/language.png`}
                      onClick={() => navigate(`/core/languages/view/${race.defaultLanguage?.id}`)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
          <Grid size={12} mt={5}>
            <TechnicalInfo>
              <pre>{JSON.stringify(race, null, 2)} </pre>
            </TechnicalInfo>
          </Grid>
        </Grid>
      </Grid>
      <AddRaceTraitDialog
        open={traitDialogOpen}
        race={race}
        setRace={setRace}
        onClose={() => setTraitDialogOpen(false)}
      />
    </>
  );
};

export default RaceView;
