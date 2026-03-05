import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, FormControlLabel, Grid, MenuItem, Switch, TextField, Typography } from '@mui/material';
import { CreateTraitDto } from '../../api/trait.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';
import SelectTraitCategory from '../../shared/selects/SelectTraitCategory';
import SelectTraitSpecialization from '../../shared/selects/SelectTraitSpecialization';

const TraitCreationAttributes: FC<{
  formData: CreateTraitDto;
  setFormData: Dispatch<SetStateAction<CreateTraitDto>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        <TextField
          label={t('name')}
          name="name"
          value={formData.name || ''}
          fullWidth
          onChange={onChange}
          error={!formData.name}
        />
      </Grid>
      <Grid size={12}>
        <SelectTraitCategory label={t('category')} name="category" value={formData.category} onChange={onChange} />
      </Grid>
      <Grid size={12}>
        <TextField
          select
          label={t('type')}
          name="isTalent"
          value={String(formData.isTalent)}
          onChange={(e) => setFormData({ ...formData, isTalent: e.target.value === 'true' })}
          fullWidth
        >
          <MenuItem value="true">{t('trait')}</MenuItem>
          <MenuItem value="false">{t('flaw')}</MenuItem>
        </TextField>
      </Grid>

      <Grid size={12}>
        <SelectTraitSpecialization
          label={t('specialization')}
          value={formData.specialization}
          name={'specialization'}
          onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
        />
      </Grid>
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
      <Grid size={{ xs: 12, md: 4 }}>
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
          <Grid size={{ xs: 12, md: 4 }}>
            <NumericInput
              label={t('tier-cost')}
              name="tierCost"
              value={formData.tierCost}
              onChange={(e) => setFormData({ ...formData, tierCost: e })}
              integer
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
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
    </Grid>
  );
};

export default TraitCreationAttributes;
