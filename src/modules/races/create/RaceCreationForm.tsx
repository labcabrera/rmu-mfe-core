import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@mui/material';
import { CreateRaceDto } from '../../api/race.dto';
import RaceAvatarByName from '../../shared/avatars/RaceAvatarByName';
import RaceCreationAttributes from './RaceCreationAttributes';
import RaceCreationResistances from './RaceCreationResistances';
import RaceCreationStats from './RaceCreationStats';

const RaceCreationForm: FC<{
  formData: CreateRaceDto;
  setFormData: Dispatch<SetStateAction<CreateRaceDto>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid size={5}>
        <RaceAvatarByName raceName={formData.name} size={120} />
        <Typography variant="h6" color="primary">
          {t('create-race')}
        </Typography>
        <RaceCreationAttributes formData={formData} setFormData={setFormData} />
      </Grid>
      <Grid size={2}>
        <Typography variant="h6" color="primary">
          {t('statistics')}
        </Typography>
        <RaceCreationStats formData={formData} setFormData={setFormData} />
      </Grid>
      <Grid size={2}>
        <Typography variant="h6" color="primary">
          {t('resistances')}
        </Typography>
        <RaceCreationResistances formData={formData} setFormData={setFormData} />
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

export default RaceCreationForm;
