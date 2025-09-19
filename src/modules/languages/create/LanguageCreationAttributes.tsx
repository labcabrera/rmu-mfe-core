import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { CreateLanguageDto } from '../../api/language.dto';
import { Realm } from '../../api/realm.dto';
import SelectRealm from '../../shared/selects/SelectRealm';

const LanguageCreationAttributes: FC<{
  formData: CreateLanguageDto;
  setFormData: Dispatch<SetStateAction<CreateLanguageDto>>;
  realms: Realm[];
}> = ({ formData, setFormData, realms }) => {
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <TextField label={t('name')} variant="standard" name="name" value={formData.name} onChange={handleChange} required fullWidth />
      </Grid>
      <Grid size={12}>
        <SelectRealm value={formData.realmId} onChange={(value) => setFormData({ ...formData, realmId: value })} realms={realms} />
      </Grid>
      <Grid size={12}>
        <TextField label={t('description')} variant="standard" name="description" value={formData.description} onChange={handleChange} fullWidth />
      </Grid>
    </Grid>
  );
};

export default LanguageCreationAttributes;
