import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchRace } from '../../api/race';
import { Race, UpdateRaceDto } from '../../api/race.dto';
import RaceAvatarByName from '../../shared/avatars/RaceAvatarByName';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import RaceEditActions from './RaceEditActions';
import RaceEditAttributes from './RaceEditAttributes';
import RaceEditResistances from './RaceEditResistances';
import RaceEditResume from './RaceEditResume';
import RaceEditStats from './RaceEditStats';

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
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <RaceAvatarByName raceName={formData.name} size={300} />
          <RaceEditResume formData={formData!} setFormData={setFormData} />
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <RaceEditStats formData={formData} setFormData={setFormData} />
          <RaceEditResistances formData={formData} setFormData={setFormData} />
          <RaceEditAttributes formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
      {/* <pre>Form: {JSON.stringify(formData, null, 2)}</pre> */}
    </>
  );
};

export default RaceEdit;
