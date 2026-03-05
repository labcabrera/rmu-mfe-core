import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchRace } from '../../api/race';
import { updateRace } from '../../api/race';
import { Race } from '../../api/race.dto';
import EdditableAvatar from '../../shared/avatars/EditableAvatar';
import RaceAvatarByName from '../../shared/avatars/RaceAvatarByName';
import CategorySeparator from '../../shared/display/CategorySeparator';
import RaceViewActions from './RaceViewActions';
import RaceViewAttributes from './RaceViewAttributes';
import RaceViewResistances from './RaceViewResistances';
import RaceViewStats from './RaceViewStats';

const RaceView: FC = () => {
  const { raceId } = useParams<{ raceId: string | undefined }>();
  const { showError } = useError();
  const [race, setRace] = useState<Race | null>(null);

  const onUpdateImage = (imageUrl: string) => {
    updateRace(race!.id, { imageUrl })
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
        <Grid size={{ xs: 12, md: 6 }} padding={1}>
          <CategorySeparator text={t('statistics')} />
          <RaceViewStats race={race} />
          <CategorySeparator text={t('resistances')} />
          <RaceViewResistances race={race} />
          <CategorySeparator text={t('race-features')} />
          <RaceViewAttributes race={race} />
        </Grid>
      </Grid>
    </>
  );
};

export default RaceView;
