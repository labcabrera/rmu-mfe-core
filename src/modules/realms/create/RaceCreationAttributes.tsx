import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Race } from '../../api/race';
import { Realm } from '../../api/realm';
import SelectRealm from '../../shared/selects/SelectRealm';

const RaceCreationAttributes: FC<{
  formData: Race;
  setFormData: Dispatch<SetStateAction<Race>>;
  realms: Realm[];
}> = ({ formData, setFormData, realms }) => {
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRealmChange = (realmId: string) => {
    setFormData({ ...formData, realmId: realmId });
  };

  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <SelectRealm value={formData.realmId} onChange={handleRealmChange} realms={realms} />
      </Grid>
      <Grid size={8}></Grid>
      <Grid size={4}>
        <TextField label={t('name')} variant="standard" name="name" value={formData.name} onChange={handleChange} required fullWidth />
      </Grid>
      <Grid size={8}></Grid>
      <Grid size={4}>
        <TextField label={t('description')} variant="standard" name="description" value={formData.description} onChange={handleChange} fullWidth />
      </Grid>
      <Grid size={8}></Grid>
    </Grid>
  );
};

export default RaceCreationAttributes;
