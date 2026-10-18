/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Grid, TextField, Button, ButtonGroup } from '@mui/material';
import {
  fetchSkillCategories,
  LoadingState,
  Skill,
  SkillCategory,
  STATS,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectAccessType from '../../shared/selects/SelectAccessType';
import SelectSkillCategory from '../../shared/selects/SelectSkillCategory';
import SelectSkillSpecialization from '../../shared/selects/SelectSkillSpecialization';

const SkillForm: FC<{
  formData: Skill;
  setFormData: (data: Skill) => void;
  create: boolean;
}> = ({ formData, setFormData, create }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [categories, setCategories] = React.useState<SkillCategory[]>([]);

  useEffect(() => {
    fetchSkillCategories('', 0, 1000, auth)
      .then((data) => setCategories(data.content))
      .catch((err) => notify.error(err));
  }, []);

  if (!formData || !setFormData) return <LoadingState />;

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={12}>
          <SelectAccessType
            value={formData.accessType}
            onChange={(value) => setFormData({ ...formData, accessType: value })}
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
          <SelectSkillCategory
            label={t('skill-category')}
            value={formData.categoryId || ''}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            categories={categories}
            required
          />
        </Grid>
        <Grid size={12}>
          <StatsSelection formData={formData} setFormData={setFormData} />
        </Grid>
        <Grid size={12}>
          <SelectSkillSpecialization
            value={formData.specialization || null}
            label={t('specialization')}
            onSpecializationChange={(e) => setFormData({ ...formData, specialization: e })}
          />
        </Grid>
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
