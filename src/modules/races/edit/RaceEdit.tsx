import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchRace } from '../../api/race';
import { Race, UpdateRaceDto } from '../../api/race.dto';
import EditableAvatar from '../../shared/avatars/EditableAvatar';
import CategorySeparator from '../../shared/display/CategorySeparator';
import RaceEditActions from './RaceEditActions';
import RaceEditAttributes from './RaceEditAttributes';
import RaceEditLore from './RaceEditLore';
import RaceEditResistances from './RaceEditResistances';
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
      <Grid container spacing={2} padding={1}>
        <Grid size={{ xs: 12, md: 2 }}>
          <EditableAvatar
            imageUrl={formData.imageUrl || ''}
            onImageChange={(image) => setFormData({ ...formData, imageUrl: image })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }} padding={1}>
          <RaceEditAttributes formData={formData} setFormData={setFormData} />
          <CategorySeparator text={t('statistics')} />
          <RaceEditStats formData={formData} setFormData={setFormData} />
          <CategorySeparator text={t('resistances')} />
          <RaceEditResistances formData={formData} setFormData={setFormData} />
          <CategorySeparator text={t('lore')} />
          <RaceEditLore race={race} formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
      <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
    </>
  );
};

export default RaceEdit;
