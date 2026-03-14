import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { CreateRealmDto, UpdateRealmDto } from '../../api/realm.dto';
import SelectAccessType from '../../shared/selects/SelectAccessType';
import SelectMagicPresence from '../../shared/selects/SelectMagicPresence';

const RealmForm: FC<{
  formData: CreateRealmDto | UpdateRealmDto;
  setFormData: Dispatch<SetStateAction<CreateRealmDto | UpdateRealmDto | undefined>>;
}> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <SelectAccessType
          value={formData.accessType}
          label={t('Access type')}
          onChange={(value) => setFormData({ ...formData, accessType: value })}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('name')}
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={!formData.name}
          fullWidth
        />
      </Grid>
      <Grid size={12}>
        <SelectMagicPresence
          value={formData.magicPresence}
          label={t('Magic presence')}
          onChange={(value) => setFormData({ ...formData, magicPresence: value })}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('short-description')}
          name="shortDescription"
          value={formData.shortDescription}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('description')}
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          fullWidth
          multiline
          rows={10}
        />
      </Grid>
    </Grid>
  );
};

export default RealmForm;
