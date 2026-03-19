import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchEnumerations } from '../../api/enumerations';
import { CreateRaceDto, UpdateRaceDto } from '../../api/race.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';
import { RmuSelect, SelectOption } from '../../shared/selects/RmuSelect';
import SelectRaceSize from '../../shared/selects/SelectRaceSize';

const RaceFormAttributes: FC<{
  formData: CreateRaceDto | UpdateRaceDto;
  setFormData: Dispatch<SetStateAction<CreateRaceDto | UpdateRaceDto | undefined>>;
}> = ({ formData, setFormData }) => {
  const { showError } = useError();
  const [archetypes, setArchetypes] = useState<SelectOption[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchEnumerations('category==race-archetype', 0, 100)
      .then((response) => setArchetypes(response.content.map((e) => ({ value: e.key, description: e.key }))))
      .catch((err) => showError(err.message));
  }, []);

  return (
    <Grid container spacing={1} columns={10}>
      <Grid size={12}>
        <TextField
          label={t('name')}
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
          error={!formData.name}
        />
      </Grid>
      <Grid size={12}>
        <RmuSelect
          label={t('Archetype')}
          value={formData.archetype}
          options={archetypes}
          onChange={(e) => setFormData({ ...formData, archetype: e })}
          required
        />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <SelectRaceSize label={t('race-size')} name="sizeId" value={formData.sizeId} onChange={handleChange} />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <NumericInput
          label={t('base-hit-points')}
          name="baseHitsMale"
          value={formData.baseHits}
          onChange={(value) => setFormData({ ...formData, baseHits: value })}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <NumericInput
          label={t('stride-bonus')}
          name="strideBonusMale"
          value={formData.strideBonus}
          onChange={(value) => setFormData({ ...formData, strideBonus: value })}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <NumericInput
          label={t('endurance-bonus')}
          name="enduranceBonusMale"
          value={formData.enduranceBonus}
          onChange={(value) => setFormData({ ...formData, enduranceBonus: value })}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
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
      <Grid size={{ xs: 5, md: 2 }}>
        <NumericInput
          label={t('base-dev-points')}
          name="baseDevPointsMale"
          value={formData.baseDevPoints}
          onChange={(value) => setFormData({ ...formData, baseDevPoints: value })}
          min={0}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
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
      <Grid size={{ xs: 5, md: 2 }}>
        <NumericInput
          label={t('average-height-male')}
          name="averageHeightMale"
          value={formData.averageHeight.male}
          onChange={(value) => setFormData({ ...formData, averageHeight: { ...formData.averageHeight, male: value } })}
          min={0}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
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
      <Grid size={{ xs: 5, md: 2 }}>
        <NumericInput
          label={t('average-weight-male')}
          name="averageWeightMale"
          value={formData.averageWeight.male}
          onChange={(value) => setFormData({ ...formData, averageWeight: { ...formData.averageWeight, male: value } })}
          min={0}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
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

export default RaceFormAttributes;
