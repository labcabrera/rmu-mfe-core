import React, { FC, useEffect, useState } from 'react';
import { TextField, Grid } from '@mui/material';
import { t } from 'i18next';
import { SkillCategory } from '../../api/skill-category.dto';
import ClearButton from '../../shared/buttons/ClearButton';
import SelectSkillCategory from '../../shared/selects/SelectSkillCategory';

const SkillListSearch: FC<{
  categories: SkillCategory[];
  onSearch: (id: string, category: string) => void;
}> = ({ categories, onSearch }) => {
  const [id, setId] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    onSearch(id, category);
  };

  useEffect(() => {
    handleSearch();
  }, [id, category]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 10, md: 3 }}>
        <TextField label={t('name')} value={id} onChange={(e) => setId(e.target.value)} fullWidth />
      </Grid>
      <Grid size={{ xs: 10, md: 3 }}>
        <SelectSkillCategory
          value={category}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => setCategory(e.target.value as string)}
          label={t('category')}
          categories={categories}
        />
      </Grid>
      <Grid size={{ xs: 2, md: 2 }}>
        <ClearButton
          onClick={() => {
            setId('');
            setCategory('');
          }}
        />
      </Grid>
    </Grid>
  );
};

export default SkillListSearch;
