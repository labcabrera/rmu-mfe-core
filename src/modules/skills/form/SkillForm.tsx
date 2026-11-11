/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Grid, TextField, Button, ButtonGroup, FormControlLabel, Switch } from '@mui/material';
import {
  AccessType,
  EnumPicker,
  fetchEnumerationCategories,
  fetchSkillCategories,
  LoadingState,
  Skill,
  SkillCategory,
  SkillCategoryPicker,
  STATS,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { ACCESS_TYPES } from '../../shared/enums';

const SkillForm: FC<{
  formData: Skill;
  setFormData: (data: Skill) => void;
  create: boolean;
}> = ({ formData, setFormData, create }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [categories, setCategories] = React.useState<SkillCategory[]>();
  const [specializations, setSpecializations] = React.useState<string[]>();

  useEffect(() => {
    fetchSkillCategories('', 0, 1000, auth)
      .then((data) => setCategories(data.content))
      .catch((err) => notify.error(err));
    fetchEnumerationCategories(auth).then(setSpecializations).catch(notify.error);
  }, []);

  if (!formData || !setFormData) return <LoadingState />;

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={12}>
          <EnumPicker
            label={t('access-type')}
            values={ACCESS_TYPES}
            value={formData.accessType}
            onChange={(value) => value && setFormData({ ...formData, accessType: value as AccessType })}
          />
        </Grid>
        {create && (
          <Grid size={12}>
            <TextField
              label={t('id')}
              name="id"
              value={formData.id || ''}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              error={!formData.id}
              fullWidth
            />
          </Grid>
        )}
        <Grid size={12}>
          <SkillCategoryPicker
            label={t('skill-category')}
            name="category"
            value={formData.categoryId || null}
            onChange={(categoryId) => setFormData({ ...formData, categoryId: categoryId ?? '' })}
            categories={categories}
            required
          />
        </Grid>
        <Grid size={12}>
          <StatsSelection formData={formData} setFormData={setFormData} />
        </Grid>
        <Grid size={12}>
          <EnumPicker
            label={t('specialization')}
            name="specialization"
            values={specializations ?? []}
            variant="select"
            value={formData.specialization || null}
            onChange={(specialization) => setFormData({ ...formData, specialization })}
          />
        </Grid>
        {formData.specialization && (
          <Grid size={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.specializationOptional === true}
                  onChange={(e) => setFormData({ ...formData, specializationOptional: e.target.checked })}
                />
              }
              label={t('specialization-optional')}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

const StatsSelection: FC<{ formData: Skill; setFormData: (data: Skill) => void }> = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  const selected: string[] = Array.isArray(formData?.bonus) ? formData.bonus : [];

  const toggle = (stat: string) => {
    const has = selected.includes(stat);
    const next = has ? selected.filter((s) => s !== stat) : [...selected, stat];
    setFormData({ ...formData, bonus: next });
  };

  return (
    <ButtonGroup orientation="horizontal" fullWidth aria-label={t('stats')} sx={{ width: '100%' }}>
      {STATS.map((stat) => (
        <Button
          key={stat}
          variant={selected.includes(stat) ? 'contained' : 'outlined'}
          onClick={() => toggle(stat)}
          sx={{ justifyContent: 'flex-start' }}
        >
          {stat}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default SkillForm;
