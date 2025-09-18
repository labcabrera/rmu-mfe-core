import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@mui/material';
import { UpdateRaceDto } from '../../api/race.dto';
import RaceAvatarByName from '../../shared/avatars/RaceAvatarByName';
import RaceEditAttributes from './RaceEditAttributes';
import RaceEditResistances from './RaceEditResistances';
import RaceEditStats from './RaceEditStats';

const RaceEditForm: FC<{
  formData: UpdateRaceDto;
  setFormData: Dispatch<SetStateAction<UpdateRaceDto>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  if (!formData) return <p>Loading...</p>;

  return (
    <Grid container spacing={2}>
      <Grid size={5}>
        <RaceAvatarByName raceName={formData.name} size={120} />
        <Typography variant="h6" color="primary">
          {t('create-race')}
        </Typography>
        <RaceEditAttributes formData={formData} setFormData={setFormData} />
      </Grid>
      <Grid size={2}>
        <Typography variant="h6" color="primary">
          {t('statistics')}
        </Typography>
        <RaceEditStats formData={formData} setFormData={setFormData} />
      </Grid>
      <Grid size={2}>
        <Typography variant="h6" color="primary">
          {t('resistances')}
        </Typography>
        <RaceEditResistances formData={formData} setFormData={setFormData} />
      </Grid>
      <Grid size={4}>
        <TextField
          label={t('description')}
          variant="standard"
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default RaceEditForm;
