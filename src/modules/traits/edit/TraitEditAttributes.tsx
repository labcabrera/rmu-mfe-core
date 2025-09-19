import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Grid, TextField, FormControl, FormControlLabel, Switch } from '@mui/material';
import { UpdateTraitDto } from '../../api/trait.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';
import SelectTraitCategory from '../../shared/selects/SelectTraitCategory';

const TraitEditAttributes: FC<{
  traitId: string;
  formData: UpdateTraitDto;
  setFormData: Dispatch<SetStateAction<UpdateTraitDto>>;
}> = ({ traitId, formData, setFormData }) => {
  const { t } = useTranslation();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          {t(traitId)}
        </Typography>
      </Grid>
      <Grid size={12}>
        <SelectTraitCategory label={t('category')} name="category" value={formData.category} onChange={onChange} />
      </Grid>
      <Grid size={12}>
        <NumericInput label={t('cost')} name="cost" value={formData.cost} onChange={(e) => setFormData({ ...formData, cost: e })} integer />
      </Grid>
      <Grid size={12}>
        <NumericInput
          label={t('max-tier')}
          name="maxTier"
          value={formData.maxTier}
          onChange={(e) => setFormData({ ...formData, maxTier: e })}
          min={1}
          integer
        />
      </Grid>
      <Grid size={12}>
        <FormControl>
          <FormControlLabel
            control={
              <Switch
                value={formData.isTalent}
                defaultChecked={formData.isTalent}
                onChange={(e) => setFormData({ ...formData, isTalent: e.target.checked })}
              />
            }
            label={t('is-talent')}
            labelPlacement="start"
          />
          <FormControlLabel
            control={
              <Switch
                value={formData.requiresSpecialization}
                defaultChecked={formData.requiresSpecialization}
                onChange={(e) => setFormData({ ...formData, requiresSpecialization: e.target.checked })}
              />
            }
            label={t('requires-specialization')}
            labelPlacement="start"
          />
          <FormControlLabel
            control={
              <Switch
                value={formData.isTierBased}
                defaultChecked={formData.isTierBased}
                onChange={(e) => setFormData({ ...formData, isTierBased: e.target.checked })}
              />
            }
            label={t('is-tier-based')}
            labelPlacement="start"
          />
        </FormControl>
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('description')}
          name="description"
          value={formData.description || ''}
          onChange={onChange}
          multiline
          minRows={4}
          maxRows={8}
          variant="standard"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default TraitEditAttributes;
