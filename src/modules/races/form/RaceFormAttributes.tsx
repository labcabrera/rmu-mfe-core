/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Grid, TextField } from '@mui/material';
import {
  CategorySeparator,
  EnumPicker,
  fetchEnumerations,
  NumericInput,
  Race,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { RACE_SIZES } from '../../shared/enums';
import { archetypeLabel, raceArchetypeKey } from '../race-format';

const RaceFormAttributes: FC<{
  formData: Race;
  setFormData: (data: Race) => void;
}> = ({ formData, setFormData }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [archetypes, setArchetypes] = useState<string[]>([]);

  useEffect(() => {
    fetchEnumerations('category==race-archetype', 0, 100, auth)
      .then((response) => setArchetypes(response.content.map((e) => raceArchetypeKey(e.key))))
      .catch((err) => notify.error(err));
  }, []);

  return (
    <Grid container spacing={1} columns={10}>
      <Grid size={12}>
        <CategorySeparator text={t('race')} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
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
      <Grid size={{ xs: 12, md: 4 }}>
        <EnumPicker
          label={t('archetype')}
          values={archetypes}
          value={formData.archetype ? raceArchetypeKey(formData.archetype) : null}
          formatLabel={(value) => archetypeLabel(value, t)}
          onChange={(archetype) =>
            setFormData({ ...formData, archetype: archetype ? raceArchetypeKey(archetype) : '' })
          }
          required
        />
      </Grid>
      <Grid size={12}></Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <NumericInput
          label={t('base-hit-points')}
          name="baseHitsMale"
          value={formData.baseHits}
          onChange={(value) => setFormData({ ...formData, baseHits: value || 0 })}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <NumericInput
          label={t('stride-bonus')}
          name="strideBonusMale"
          value={formData.strideBonus}
          onChange={(value) => setFormData({ ...formData, strideBonus: value || 0 })}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <NumericInput
          label={t('endurance-bonus')}
          name="enduranceBonusMale"
          value={formData.enduranceBonus}
          onChange={(value) => setFormData({ ...formData, enduranceBonus: value || 0 })}
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
          onChange={(value) => setFormData({ ...formData, recoveryMultiplier: value || 0 })}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <NumericInput
          label={t('race-bonus-dev-points')}
          name="baseDevPoints"
          value={formData.baseDevPoints}
          onChange={(value) => setFormData({ ...formData, baseDevPoints: value || 0 })}
          min={0}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <NumericInput
          label={t('base-at')}
          name="baseAtMale"
          value={formData.baseAt}
          onChange={(value) => setFormData({ ...formData, baseAt: value || 0 })}
          min={1}
          max={10}
          integer
        />
      </Grid>
      <Grid size={12}>
        <CategorySeparator text={t('size')} />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <EnumPicker
          label={t('race-size')}
          name="sizeId"
          values={RACE_SIZES}
          labelPrefix="size-"
          variant="select"
          value={formData.sizeId || null}
          onChange={(sizeId) => setFormData({ ...formData, sizeId: sizeId ?? '' })}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <NumericInput
          label={t('average-height-male')}
          name="averageHeightMale"
          value={formData.averageHeight?.male || 0}
          onChange={(value) =>
            setFormData({ ...formData, averageHeight: { ...formData.averageHeight, male: value || 0 } })
          }
          min={0}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <NumericInput
          label={t('average-height-female')}
          name="averageHeightFemale"
          value={formData.averageHeight?.female || 0}
          onChange={(value) =>
            setFormData({ ...formData, averageHeight: { ...formData.averageHeight, female: value || 0 } })
          }
          min={0}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <NumericInput
          label={t('average-weight-male')}
          name="averageWeightMale"
          value={formData.averageWeight?.male || 0}
          onChange={(value) =>
            setFormData({ ...formData, averageWeight: { ...formData.averageWeight, male: value || 0 } })
          }
          min={0}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 2 }}>
        <NumericInput
          label={t('average-weight-female')}
          name="averageWeightFemale"
          value={formData.averageWeight?.female || 0}
          onChange={(value) =>
            setFormData({ ...formData, averageWeight: { ...formData.averageWeight, female: value || 0 } })
          }
          min={0}
        />
      </Grid>
    </Grid>
  );
};

export default RaceFormAttributes;
