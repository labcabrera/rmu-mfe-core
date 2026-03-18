/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Grid, TextField, Button, ButtonGroup } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { STATISTICS } from '../../api/common.dto';
import { fetchSkillCategories } from '../../api/skill-category';
import { SkillCategory } from '../../api/skill-category.dto';
import { CreateSkillDto, UpdateSkillDto } from '../../api/skill.dto';
import CategorySeparator from '../../shared/display/CategorySeparator';
import SelectAccessType from '../../shared/selects/SelectAccessType';
import SelectSkillCategory from '../../shared/selects/SelectSkillCategory';
import SelectSkillSpecialization from '../../shared/selects/SelectSkillSpecialization';

const SkillForm: FC<{
  formData: CreateSkillDto | UpdateSkillDto;
  setFormData: Dispatch<SetStateAction<CreateSkillDto>>;
  create: boolean;
}> = ({ formData, setFormData, create }) => {
  const { showError } = useError();
  const [categories, setCategories] = React.useState<SkillCategory[]>([]);

  useEffect(() => {
    fetchSkillCategories()
      .then((data) => setCategories(data))
      .catch((err) => showError(err.message));
  }, []);

  if (!formData || !setFormData) return <p>Loading...</p>;

  return (
    <>
      <CategorySeparator text={t('skill-information')} />
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
              label={t('skill-id')}
              name="skill-id"
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
            value={formData.categoryId || null}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            categories={categories}
            required
          />
        </Grid>
        <Grid size={12}>
          <StatsSelection stats={STATISTICS} formData={formData} setFormData={setFormData} />
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

const StatsSelection: FC<{ stats: string[]; formData: any; setFormData: Dispatch<SetStateAction<any>> }> = ({
  stats,
  formData,
  setFormData,
}) => {
  const selected: string[] = Array.isArray(formData?.bonus) ? formData.bonus : [];

  const toggle = (stat: string) => {
    const has = selected.includes(stat);
    const next = has ? selected.filter((s) => s !== stat) : [...selected, stat];
    setFormData({ ...formData, bonus: next });
  };

  return (
    <ButtonGroup orientation="horizontal" fullWidth aria-label="stats-button-group" sx={{ width: '100%' }}>
      {stats.map((stat) => (
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
