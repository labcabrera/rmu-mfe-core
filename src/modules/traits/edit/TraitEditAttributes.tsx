import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { Typography, Grid, TextField, FormControl, FormControlLabel, Switch } from '@mui/material';
import { t } from 'i18next';
import { UpdateTraitDto } from '../../api/trait.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';
import SelectTraitSpecialization from '../../shared/selects/SelectTraitSpecialization';

const TraitEditAttributes: FC<{
  formData: UpdateTraitDto;
  setFormData: Dispatch<SetStateAction<UpdateTraitDto>>;
}> = ({ formData, setFormData }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onChangeTierBased = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData({
      ...formData,
      isTierBased: checked,
      ...(checked ? { tierCost: null, maxTier: null } : { tierCost: undefined, maxTier: undefined }),
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
        <TextField
          label={t('description')}
          name="description"
          value={formData.description || ''}
          onChange={onChange}
          multiline
          minRows={4}
          maxRows={10}
          fullWidth
        />
      </Grid>
      <Grid size={2}>
        <SelectTraitSpecialization
          label={t('specialization')}
          value={formData.specialization}
          name={'specialization'}
          onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
        />
      </Grid>
      <Grid size={12}></Grid>
      <Grid size={2}>
        <NumericInput
          label={t('adquisition-cost')}
          name="adquisitionCost"
          value={formData.adquisitionCost}
          onChange={(e) => setFormData({ ...formData, adquisitionCost: e })}
          integer
        />
      </Grid>
      {formData.isTierBased && (
        <>
          <Grid size={2}>
            <NumericInput
              label={t('tier-cost')}
              name="tierCost"
              value={formData.tierCost}
              onChange={(e) => setFormData({ ...formData, tierCost: e })}
              integer
            />
          </Grid>
          <Grid size={2}>
            <NumericInput
              label={t('max-tier')}
              name="maxTier"
              value={formData.maxTier}
              onChange={(e) => setFormData({ ...formData, maxTier: e })}
              min={1}
              integer
            />
          </Grid>
        </>
      )}
      <Grid size={12}>
        <FormControl>
          <FormControlLabel
            control={
              <Switch
                value={formData.isTierBased}
                defaultChecked={formData.isTierBased}
                onChange={(e) => onChangeTierBased(e)}
              />
            }
            label={t('is-tier-based')}
            labelPlacement="start"
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default TraitEditAttributes;
