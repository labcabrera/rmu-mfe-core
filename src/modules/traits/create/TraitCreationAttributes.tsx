import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@mui/material';
import { CreateTraitDto } from '../../api/trait.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';

const TraitCreationAttributes: FC<{
  formData: CreateTraitDto;
  setFormData: Dispatch<SetStateAction<CreateTraitDto>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (!formData || !setFormData) return <p>Loading...</p>;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="h6" color="primary">
          {'trait-info'}
        </Typography>
      </Grid>
      <Grid size={12}>
        <TextField label={t('trait')} name="id" value={formData.id || ''} variant="standard" fullWidth />
      </Grid>
      <Grid size={12}>
        <TextField label={t('is-talent')} name="isTalent" value={formData.isTalent || ''} variant="standard" fullWidth />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('requires-specialization')}
          name="requiresSpecialization"
          value={formData.requiresSpecialization || ''}
          variant="standard"
          fullWidth
        />
      </Grid>
      <Grid size={12}>
        <NumericInput label={t('cost')} name="cost" value={formData.cost} onChange={(e) => setFormData({ ...formData, cost: e })} integer />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('description')}
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          multiline
          maxRows={4}
          variant="standard"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default TraitCreationAttributes;
