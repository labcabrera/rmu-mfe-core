import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Grid, TextField } from '@mui/material';
import { UpdateTraitDto } from '../../api/trait.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';

const TraitEditAttributes: FC<{
  formData: UpdateTraitDto;
  setFormData: Dispatch<SetStateAction<UpdateTraitDto>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (!formData || !setFormData) return <p>Loading...</p>;

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h6" color="primary">
          {t('trait-info')}
        </Typography>
      </Grid>
      <Grid size={12}>
        <NumericInput label={t('cost')} name="cost" value={formData.cost} onChange={(e) => setFormData({ ...formData, cost: e })} />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('description')}
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
          variant="standard"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default TraitEditAttributes;
