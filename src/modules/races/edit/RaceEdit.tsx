import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { EditableAvatar } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { fetchRace } from '../../api/race';
import { Race, UpdateRaceDto } from '../../api/race.dto';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import { getAvatarImages } from '../../services/image-service';
import TechnicalInfo from '../../shared/display/TechnicalInfo';
import RaceForm from '../shared/RaceForm';
import RaceEditActions from './RaceEditActions';

const RaceEdit: FC = () => {
  const location = useLocation();
  const { showError } = useError();
  const { raceId } = useParams<{ raceId: string }>();
  const [race, setRace] = useState<Race | null>(null);
  const [formData, setFormData] = useState<UpdateRaceDto | null>(null);

  useEffect(() => {
    if (race) {
      setFormData(race);
    }
  }, [race]);

  useEffect(() => {
    if (location.state && location.state.realm) {
      setRace(location.state.realm);
    } else if (raceId) {
      fetchRace(raceId)
        .then((response) => setRace(response))
        .catch((err) => showError(err.message));
    }
  }, [location.state, raceId, showError]);

  if (!race || !formData) return <div>Loading race...</div>;

  return (
    <>
      <RaceEditActions race={race} formData={formData} />
      <Grid container spacing={2} padding={1}>
        <Grid size={gridSizeResume}>
          <EditableAvatar
            imageUrl={formData.imageUrl || ''}
            onImageChange={(image) => setFormData({ ...formData, imageUrl: image })}
            images={getAvatarImages()}
          />
        </Grid>
        <Grid size={gridSizeMain} padding={1}>
          <RaceForm realmId={race.realm.id} formData={formData} setFormData={setFormData} />
          <TechnicalInfo>
            <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default RaceEdit;
