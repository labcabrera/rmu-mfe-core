import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { UpdateRaceDto } from '../../api/race.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';
import SelectRaceArchetype from '../../shared/selects/SelectRaceArchetype';
import SelectRaceSize from '../../shared/selects/SelectRaceSize';

const RaceEditAttributes: FC<{
  formData: UpdateRaceDto;
  setFormData: Dispatch<SetStateAction<UpdateRaceDto>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  if (!formData) return <div>Loading...</div>;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Grid container spacing={1} columns={10}>
      <Grid size={12}>
        <TextField
          label={t('name')}
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid size={12}>
        <SelectRaceArchetype
          label={t('race-archetype')}
          name="archetype"
          value={formData.archetype}
          onChange={(e) => setFormData({ ...formData, archetype: e.target.value })}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <SelectRaceSize label={t('race-size')} name="sizeId" value={formData.sizeId} onChange={handleChange} />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <NumericInput
          label={t('base-hit-points')}
          name="baseHitsMale"
          value={formData.baseHits}
          onChange={(value) => setFormData({ ...formData, baseHits: value })}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <NumericInput
          label={t('stride-bonus')}
          name="strideBonusMale"
          value={formData.strideBonus}
          onChange={(value) => setFormData({ ...formData, strideBonus: value })}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <NumericInput
          label={t('endurance-bonus')}
          name="enduranceBonusMale"
          value={formData.enduranceBonus}
          onChange={(value) => setFormData({ ...formData, enduranceBonus: value })}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <NumericInput
          label={t('recovery-multiplier')}
          name="recoveryMultiplierMale"
          value={formData.recoveryMultiplier}
          integer={false}
          min={0}
          maxFractionDigits={2}
          onChange={(value) => setFormData({ ...formData, recoveryMultiplier: value })}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <NumericInput
          label={t('base-at')}
          name="baseAtMale"
          value={formData.baseAt}
          onChange={(value) => setFormData({ ...formData, baseAt: value })}
          min={1}
          max={10}
          integer
        />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <NumericInput
          label={t('base-dev-points')}
          name="baseDevPointsMale"
          value={formData.baseDevPoints}
          onChange={(value) => setFormData({ ...formData, baseDevPoints: value })}
          min={0}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <NumericInput
          label={t('average-height-male')}
          name="averageHeightMale"
          value={formData.averageHeight.male}
          onChange={(value) => setFormData({ ...formData, averageHeight: { ...formData.averageHeight, male: value } })}
          min={0}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <NumericInput
          label={t('average-height-female')}
          name="averageHeightFemale"
          value={formData.averageHeight.female}
          onChange={(value) =>
            setFormData({ ...formData, averageHeight: { ...formData.averageHeight, female: value } })
          }
          min={0}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <NumericInput
          label={t('average-weight-male')}
          name="averageWeightMale"
          value={formData.averageWeight.male}
          onChange={(value) => setFormData({ ...formData, averageWeight: { ...formData.averageWeight, male: value } })}
          min={0}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <NumericInput
          label={t('average-weight-female')}
          name="averageWeightFemale"
          value={formData.averageWeight.female}
          onChange={(value) =>
            setFormData({ ...formData, averageWeight: { ...formData.averageWeight, female: value } })
          }
          min={0}
        />
      </Grid>
    </Grid>
  );
};

export default RaceEditAttributes;
